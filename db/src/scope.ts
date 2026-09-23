import type pg from 'pg';

// Plan §12: a city on every trip, item, itinerary, invite and metric, so
// cities can open one at a time. Every table states its scope in a comment:
//   COMMENT ON TABLE place IS 'scope:city - ...';
// A "city" table must carry city_id uuid NOT NULL, a foreign key to city and
// an index that starts with city_id. "user" and "global" tables are exempt.

export type TableScope = 'city' | 'user' | 'global';

export interface ScopeViolation {
  table: string;
  problem: string;
}

const SCOPE = /^scope:(city|user|global)\b/;

export async function checkTableScopes(client: pg.ClientBase): Promise<ScopeViolation[]> {
  const tables = await client.query<{ name: string; comment: string | null }>(`
    SELECT c.relname AS name, obj_description(c.oid, 'pg_class') AS comment
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relkind IN ('r', 'p') AND c.relname <> 'schema_migrations'
    ORDER BY c.relname`);

  const violations: ScopeViolation[] = [];
  for (const { name, comment } of tables.rows) {
    const scope = SCOPE.exec(comment ?? '')?.[1] as TableScope | undefined;
    if (!scope) {
      violations.push({ table: name, problem: "no 'scope:city|user|global' table comment" });
      continue;
    }
    if (scope !== 'city') continue;

    const column = await client.query<{ data_type: string; is_nullable: string }>(
      `SELECT data_type, is_nullable FROM information_schema.columns
       WHERE table_schema = 'public' AND table_name = $1 AND column_name = 'city_id'`,
      [name],
    );
    const col = column.rows[0];
    if (!col || col.data_type !== 'uuid' || col.is_nullable !== 'NO') {
      violations.push({ table: name, problem: 'city_id must be uuid NOT NULL' });
      continue;
    }

    const fk = await client.query(
      `SELECT 1 FROM pg_constraint con
       JOIN pg_attribute a ON a.attrelid = con.conrelid AND a.attnum = ANY (con.conkey)
       WHERE con.contype = 'f' AND con.conrelid = $1::regclass
         AND con.confrelid = 'city'::regclass AND a.attname = 'city_id'`,
      [name],
    );
    if (fk.rowCount === 0)
      violations.push({ table: name, problem: 'city_id has no foreign key to city' });

    const index = await client.query(
      `SELECT 1 FROM pg_index i
       JOIN pg_attribute a ON a.attrelid = i.indrelid AND a.attnum = i.indkey[0]
       WHERE i.indrelid = $1::regclass AND a.attname = 'city_id'`,
      [name],
    );
    if (index.rowCount === 0)
      violations.push({ table: name, problem: 'no index starts with city_id' });
  }
  return violations;
}
