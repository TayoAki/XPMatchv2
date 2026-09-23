// Usage:
//   npm run db:migrate -- up        apply pending migrations
//   npm run db:migrate -- status    list applied and pending migrations
//   npm run db:migrate -- new name  create the next numbered migration file
// Reads DATABASE_URL (and MIGRATIONS_DIR in the API image).
import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import pg from 'pg';
import { DEFAULT_MIGRATIONS_DIR, loadMigrations, migrate, migrationStatus } from './migrate';

const dir = process.env.MIGRATIONS_DIR ?? DEFAULT_MIGRATIONS_DIR;

function databaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not set');
  return url;
}

async function up(): Promise<void> {
  const { applied } = await migrate({
    connectionString: databaseUrl(),
    dir,
    log: (message) => console.log(message),
  });
  console.log(`Applied ${applied.length} migration(s)`);
}

async function status(): Promise<void> {
  const client = new pg.Client({ connectionString: databaseUrl() });
  await client.connect();
  try {
    const s = await migrationStatus(client, dir);
    for (const a of s.applied) console.log(`applied  ${a.version} ${a.name}`);
    for (const p of s.pending) console.log(`pending  ${p.version} ${p.name}`);
    for (const d of s.drifted) console.log(`DRIFTED  ${d.version} (${d.reason})`);
    if (s.drifted.length > 0) process.exitCode = 1;
  } finally {
    await client.end();
  }
}

async function create(name: string | undefined): Promise<void> {
  if (!name || !/^[a-z0-9_]+$/.test(name)) {
    throw new Error('Give the migration a snake_case name, for example: new add_area');
  }
  await loadMigrations(dir); // refuses to add to a broken sequence
  const count = (await readdir(dir)).filter((f) => f.endsWith('.sql')).length;
  const file = path.join(dir, `${String(count + 1).padStart(4, '0')}_${name}.sql`);
  await writeFile(
    file,
    `-- ${name}\n-- Expand, compatible code, backfill, verify, then contract (AGENTS.md).\n` +
      "-- State the table's scope: COMMENT ON TABLE t IS 'scope:city|user|global - why';\n\n",
    { flag: 'wx' },
  );
  console.log(`Created ${path.relative(process.cwd(), file)}`);
}

const [command, arg] = process.argv.slice(2);
const commands: Record<string, () => Promise<void>> = {
  up,
  status,
  new: () => create(arg),
};
const run = command ? commands[command] : undefined;
if (!run) {
  console.error('Usage: migrate <up|status|new name>');
  process.exit(2);
}
run().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
