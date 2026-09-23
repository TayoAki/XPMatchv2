import pg from 'pg';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { migrate } from './migrate';
import { checkTableScopes } from './scope';
import { createTestDatabase, testDatabaseUrl, type TestDatabase } from './testing';

const adminUrl = testDatabaseUrl();

describe('test database', () => {
  it('is configured whenever CI runs', () => {
    if (process.env.CI) expect(adminUrl).toBeTruthy();
  });
});

describe.skipIf(!adminUrl)('table scopes (plan §12: a city on every core table)', () => {
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

  it('every shipped table declares a scope, and city tables carry city_id', async () => {
    expect(await checkTableScopes(client)).toEqual([]);
  });

  it('catches a table without a scope comment', async () => {
    await client.query('CREATE TABLE unscoped (id int)');
    expect(await checkTableScopes(client)).toContainEqual({
      table: 'unscoped',
      problem: "no 'scope:city|user|global' table comment",
    });
    await client.query('DROP TABLE unscoped');
  });

  it('catches a city table without city_id, a foreign key or an index', async () => {
    await client.query(`CREATE TABLE no_city (id int);
      COMMENT ON TABLE no_city IS 'scope:city - test'`);
    await client.query(`CREATE TABLE loose_city (id int, city_id uuid NOT NULL);
      COMMENT ON TABLE loose_city IS 'scope:city - test'`);
    const violations = await checkTableScopes(client);
    expect(violations).toContainEqual({
      table: 'no_city',
      problem: 'city_id must be uuid NOT NULL',
    });
    expect(violations).toContainEqual({
      table: 'loose_city',
      problem: 'city_id has no foreign key to city',
    });
    expect(violations).toContainEqual({
      table: 'loose_city',
      problem: 'no index starts with city_id',
    });
    await client.query('DROP TABLE no_city, loose_city');
  });

  it('accepts a correctly scoped city table', async () => {
    await client.query(`CREATE TABLE good_city (id int, city_id uuid NOT NULL REFERENCES city (id));
      CREATE INDEX good_city_city_id ON good_city (city_id);
      COMMENT ON TABLE good_city IS 'scope:city - test'`);
    expect(await checkTableScopes(client)).toEqual([]);
    await client.query('DROP TABLE good_city');
  });
});
