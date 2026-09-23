# Database

PostgreSQL on Railway (plan D-046). Migrations are plain SQL files in `migrations/`, applied in order by `src/migrate.ts`.

## Commands

Set `DATABASE_URL` first.

| Command | What it does |
| --- | --- |
| `npm run db:migrate -- up` | Applies pending migrations, each in its own transaction |
| `npm run db:migrate -- status` | Lists applied and pending migrations and any drift |
| `npm run db:migrate -- new add_area` | Creates the next numbered file |

On Railway, the API service runs `up` as its pre-deploy command, so a deploy never starts on an older schema.

## Rules

- **Numbering:** files are `0001_short_name.sql`, consecutive, one migration owner at a time (AGENTS.md). The runner refuses gaps and duplicates.
- **Never edit an applied migration.** The runner stores a checksum and stops if a file changed; add a new migration instead.
- **Expand, then contract:** add columns and tables first, ship code that works with both shapes, backfill, verify, and only then remove the old shape.
- **Locks:** each run holds an advisory lock, so two deploys can't migrate at once. Statements wait at most 30 seconds for a table lock.
- **No-transaction migrations:** a file starting with `-- migrate:no-transaction` runs outside a transaction. Use it only for a single statement such as `CREATE INDEX CONCURRENTLY`.
- **Table scope (plan §12):** every table states its scope in a comment, `scope:city`, `scope:user` or `scope:global`. A `scope:city` table needs `city_id uuid NOT NULL`, a foreign key to `city` and an index that starts with `city_id`. `src/scope.test.ts` enforces this.
- **Row policies:** every owner table gets a row policy on its owner column, with that column indexed, and is tested with two separate users (AGENTS.md). They arrive with sign-in (slice 1).

## Tests

Database tests create and drop throwaway databases on the server in `TEST_DATABASE_URL`. Point it at a local or CI server only. Without it, they're skipped locally; in CI they must run.
