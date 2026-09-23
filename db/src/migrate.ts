import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

/** The migrations shipped with this package. Bundles pass their own path. */
export const DEFAULT_MIGRATIONS_DIR = fileURLToPath(new URL('../migrations', import.meta.url));

const FILE_PATTERN = /^(\d{4})_([a-z0-9_]+)\.sql$/;
const NO_TRANSACTION = /^--\s*migrate:no-transaction\b/m;
// Any fixed 64-bit number works; it only has to be the same for every runner.
const LOCK_KEY = '7311442001';

export class MigrationError extends Error {
  override name = 'MigrationError';
}

export interface Migration {
  version: string;
  name: string;
  file: string;
  sql: string;
  checksum: string;
  transactional: boolean;
}

export interface AppliedMigration {
  version: string;
  name: string;
  checksum: string;
  appliedAt: Date;
}

export interface MigrationStatus {
  applied: AppliedMigration[];
  pending: Migration[];
  /** Applied migrations whose file changed or disappeared: never safe to run past. */
  drifted: { version: string; reason: 'changed' | 'missing' }[];
}

type Log = (message: string) => void;

function checksumOf(sql: string): string {
  return createHash('sha256').update(sql.replace(/\r\n/g, '\n')).digest('hex');
}

export async function loadMigrations(dir: string): Promise<Migration[]> {
  const files = (await readdir(dir)).filter((f) => f.endsWith('.sql')).sort();
  const migrations: Migration[] = [];
  for (const file of files) {
    const match = FILE_PATTERN.exec(file);
    if (!match) {
      throw new MigrationError(`Migration file names look like 0001_short_name.sql: ${file}`);
    }
    const [, version = '', name = ''] = match;
    const expected = String(migrations.length + 1).padStart(4, '0');
    if (version !== expected) {
      throw new MigrationError(
        `Expected migration ${expected} next but found ${file}. Numbers must be unique and ` +
          'consecutive: one migration owner at a time (AGENTS.md).',
      );
    }
    const sql = await readFile(path.join(dir, file), 'utf8');
    migrations.push({
      version,
      name,
      file,
      sql,
      checksum: checksumOf(sql),
      transactional: !NO_TRANSACTION.test(sql),
    });
  }
  return migrations;
}

async function ensureLedger(client: pg.ClientBase): Promise<void> {
  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version text PRIMARY KEY,
      name text NOT NULL,
      checksum text NOT NULL,
      applied_at timestamptz NOT NULL DEFAULT now(),
      duration_ms integer NOT NULL
    )`);
}

async function readLedger(client: pg.ClientBase): Promise<AppliedMigration[]> {
  const exists = await client.query<{ present: boolean }>(
    `SELECT to_regclass('public.schema_migrations') IS NOT NULL AS present`,
  );
  if (!exists.rows[0]?.present) return [];
  const result = await client.query<{
    version: string;
    name: string;
    checksum: string;
    applied_at: Date;
  }>('SELECT version, name, checksum, applied_at FROM schema_migrations ORDER BY version');
  return result.rows.map((r) => ({
    version: r.version,
    name: r.name,
    checksum: r.checksum,
    appliedAt: r.applied_at,
  }));
}

function compare(migrations: Migration[], applied: AppliedMigration[]): MigrationStatus {
  const onDisk = new Map(migrations.map((m) => [m.version, m]));
  const appliedVersions = new Set(applied.map((a) => a.version));
  const drifted: MigrationStatus['drifted'] = [];
  for (const a of applied) {
    const file = onDisk.get(a.version);
    if (!file) drifted.push({ version: a.version, reason: 'missing' });
    else if (file.checksum !== a.checksum) drifted.push({ version: a.version, reason: 'changed' });
  }
  return {
    applied,
    pending: migrations.filter((m) => !appliedVersions.has(m.version)),
    drifted,
  };
}

/** Reads the state without changing anything. Used by /ready and the CLI. */
export async function migrationStatus(
  client: pg.ClientBase,
  dir: string = DEFAULT_MIGRATIONS_DIR,
): Promise<MigrationStatus> {
  return compare(await loadMigrations(dir), await readLedger(client));
}

async function acquireLock(client: pg.ClientBase, timeoutMs: number, log: Log): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  let announced = false;
  for (;;) {
    const result = await client.query<{ locked: boolean }>(
      'SELECT pg_try_advisory_lock($1::bigint) AS locked',
      [LOCK_KEY],
    );
    if (result.rows[0]?.locked) return;
    if (Date.now() > deadline) {
      throw new MigrationError(`Another migration run held the lock for over ${timeoutMs} ms`);
    }
    if (!announced) {
      log('Waiting for another migration run to finish');
      announced = true;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}

export interface MigrateOptions {
  connectionString: string;
  dir?: string;
  log?: Log;
  lockTimeoutMs?: number;
}

/** Applies pending migrations in order, each in its own transaction. */
export async function migrate(options: MigrateOptions): Promise<{ applied: string[] }> {
  const dir = options.dir ?? DEFAULT_MIGRATIONS_DIR;
  const log = options.log ?? (() => undefined);
  const migrations = await loadMigrations(dir);
  const client = new pg.Client({ connectionString: options.connectionString });
  await client.connect();
  const appliedNow: string[] = [];
  try {
    await acquireLock(client, options.lockTimeoutMs ?? 120_000, log);
    try {
      // A migration that waits too long for a table lock fails instead of
      // stalling the app behind it (expand/contract, AGENTS.md).
      await client.query(`SET lock_timeout = '30s'`);
      await ensureLedger(client);
      const status = compare(migrations, await readLedger(client));
      if (status.drifted.length > 0) {
        const list = status.drifted.map((d) => `${d.version} (${d.reason})`).join(', ');
        throw new MigrationError(
          `Applied migrations no longer match their files: ${list}. ` +
            'Never edit an applied migration; add a new one.',
        );
      }
      for (const m of status.pending) {
        const started = performance.now();
        const record = () =>
          client.query(
            'INSERT INTO schema_migrations (version, name, checksum, duration_ms) VALUES ($1, $2, $3, $4)',
            [m.version, m.name, m.checksum, Math.round(performance.now() - started)],
          );
        if (m.transactional) {
          await client.query('BEGIN');
          try {
            await client.query(m.sql);
            await record();
            await client.query('COMMIT');
          } catch (error) {
            await client.query('ROLLBACK');
            throw new MigrationError(`${m.file} failed: ${(error as Error).message}`);
          }
        } else {
          try {
            await client.query(m.sql);
          } catch (error) {
            throw new MigrationError(`${m.file} failed: ${(error as Error).message}`);
          }
          await record();
        }
        appliedNow.push(m.version);
        log(`Applied ${m.file}`);
      }
      if (appliedNow.length === 0) log('Database is up to date');
    } finally {
      // Ending the session releases the lock anyway; never let a failed
      // unlock hide the error that got us here.
      await client
        .query('SELECT pg_advisory_unlock($1::bigint)', [LOCK_KEY])
        .catch(() => undefined);
    }
  } finally {
    await client.end();
  }
  return { applied: appliedNow };
}
