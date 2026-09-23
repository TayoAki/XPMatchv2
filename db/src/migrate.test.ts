import { mkdtemp, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import pg from 'pg';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  DEFAULT_MIGRATIONS_DIR,
  MigrationError,
  loadMigrations,
  migrate,
  migrationStatus,
} from './migrate';
import { createTestDatabase, testDatabaseUrl, type TestDatabase } from './testing';

const adminUrl = testDatabaseUrl();

async function copyMigrations(): Promise<string> {
  const dir = await mkdtemp(path.join(os.tmpdir(), 'xp-migrations-'));
  for (const file of await readdir(DEFAULT_MIGRATIONS_DIR)) {
    await writeFile(path.join(dir, file), await readFile(path.join(DEFAULT_MIGRATIONS_DIR, file)));
  }
  return dir;
}

describe('loadMigrations', () => {
  it('loads the shipped migrations in order', async () => {
    const migrations = await loadMigrations(DEFAULT_MIGRATIONS_DIR);
    expect(migrations[0]?.file).toBe('0001_city.sql');
    migrations.forEach((m, i) => expect(Number(m.version)).toBe(i + 1));
  });

  it('refuses gaps, duplicates and bad names', async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), 'xp-bad-'));
    try {
      await writeFile(path.join(dir, '0001_a.sql'), 'SELECT 1;');
      await writeFile(path.join(dir, '0003_c.sql'), 'SELECT 1;');
      await expect(loadMigrations(dir)).rejects.toThrow(MigrationError);
      await rm(path.join(dir, '0003_c.sql'));
      await writeFile(path.join(dir, '0002-Bad.sql'), 'SELECT 1;');
      await expect(loadMigrations(dir)).rejects.toThrow(/0001_short_name/);
    } finally {
      await rm(dir, { recursive: true });
    }
  });
});

describe.skipIf(!adminUrl)('migrate (PostgreSQL)', () => {
  let db: TestDatabase;
  let dir: string;

  beforeAll(async () => {
    db = await createTestDatabase(adminUrl!);
    dir = await copyMigrations();
  });

  afterAll(async () => {
    await db?.drop();
    if (dir) await rm(dir, { recursive: true });
  });

  it('applies every migration once, then is a no-op', async () => {
    const first = await migrate({ connectionString: db.url, dir });
    expect(first.applied.length).toBeGreaterThan(0);
    const second = await migrate({ connectionString: db.url, dir });
    expect(second.applied).toEqual([]);
  });

  it('serializes concurrent runs with the advisory lock', async () => {
    await writeFile(path.join(dir, '0002_probe.sql'), 'CREATE TABLE probe (id int);');
    const runs = await Promise.all([
      migrate({ connectionString: db.url, dir }),
      migrate({ connectionString: db.url, dir }),
    ]);
    expect(runs.flatMap((r) => r.applied)).toEqual(['0002']);
  });

  it('refuses to run past an edited migration', async () => {
    await writeFile(path.join(dir, '0002_probe.sql'), 'CREATE TABLE probe (id bigint);');
    await expect(migrate({ connectionString: db.url, dir })).rejects.toThrow(/no longer match/);
    const client = new pg.Client({ connectionString: db.url });
    await client.connect();
    try {
      const status = await migrationStatus(client, dir);
      expect(status.drifted).toEqual([{ version: '0002', reason: 'changed' }]);
    } finally {
      await client.end();
    }
  });

  it('rolls back a failing migration completely', async () => {
    await writeFile(path.join(dir, '0002_probe.sql'), 'CREATE TABLE probe (id int);');
    await writeFile(
      path.join(dir, '0003_broken.sql'),
      'CREATE TABLE half_done (id int);\nSELECT * FROM table_that_does_not_exist;',
    );
    await expect(migrate({ connectionString: db.url, dir })).rejects.toThrow(
      /0003_broken.sql failed/,
    );
    const client = new pg.Client({ connectionString: db.url });
    await client.connect();
    try {
      const table = await client.query<{ t: string | null }>(
        `SELECT to_regclass('public.half_done') AS t`,
      );
      expect(table.rows[0]?.t).toBeNull();
      const status = await migrationStatus(client, dir);
      expect(status.pending.map((p) => p.version)).toEqual(['0003']);
    } finally {
      await client.end();
    }
  });
});

describe.skipIf(!adminUrl)('city table', () => {
  let db: TestDatabase;
  let client: pg.Client;

  beforeAll(async () => {
    db = await createTestDatabase(adminUrl!);
    await migrate({ connectionString: db.url });
    client = new pg.Client({ connectionString: db.url });
    await client.connect();
  });

  afterAll(async () => {
    await client?.end();
    await db?.drop();
  });

  it('stores a city with its IANA time zone and currency', async () => {
    const result = await client.query<{ status: string }>(
      `INSERT INTO city (name, country_code, time_zone, currency)
       VALUES ('Fixture City', 'PT', 'Europe/Lisbon', 'EUR') RETURNING id, status`,
    );
    expect(result.rows[0]?.status).toBe('waitlist');
  });

  it('rejects unknown time zones, lower-case codes and blank names', async () => {
    const insert = (name: string, country: string, tz: string, currency: string) =>
      client.query(
        'INSERT INTO city (name, country_code, time_zone, currency) VALUES ($1, $2, $3, $4)',
        [name, country, tz, currency],
      );
    await expect(insert('A', 'PT', 'Mars/Olympus', 'EUR')).rejects.toThrow(/check constraint/);
    await expect(insert('B', 'PT', 'CET', 'EUR')).rejects.toThrow(/check constraint/);
    await expect(insert('C', 'pt', 'Europe/Lisbon', 'EUR')).rejects.toThrow(/check constraint/);
    await expect(insert('   ', 'PT', 'Europe/Lisbon', 'EUR')).rejects.toThrow(/check constraint/);
  });

  it('keeps updated_at current', async () => {
    const read = () =>
      client.query<{ updated_at: Date }>(`SELECT updated_at FROM city WHERE name = 'Fixture City'`);
    const before = (await read()).rows[0]?.updated_at.getTime() ?? 0;
    await client.query(`UPDATE city SET status = 'open' WHERE name = 'Fixture City'`);
    const after = (await read()).rows[0]?.updated_at.getTime() ?? 0;
    expect(after).toBeGreaterThan(before);
  });
});
