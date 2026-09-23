import { randomUUID } from 'node:crypto';
import pg from 'pg';

/**
 * TEST_DATABASE_URL points at a server where tests may create and drop
 * throwaway databases. It must never point at a shared or production server.
 * CI always sets it; locally, database tests are skipped without it.
 */
export function testDatabaseUrl(): string | undefined {
  const url = process.env.TEST_DATABASE_URL;
  if (!url && process.env.CI) {
    throw new Error('TEST_DATABASE_URL must be set in CI, or database tests would be skipped');
  }
  return url;
}

export interface TestDatabase {
  url: string;
  drop: () => Promise<void>;
}

/** Creates an empty, uniquely named database for one test file. */
export async function createTestDatabase(adminUrl: string): Promise<TestDatabase> {
  const name = `xp_test_${randomUUID().replaceAll('-', '').slice(0, 16)}`;
  const admin = new pg.Client({ connectionString: adminUrl });
  await admin.connect();
  try {
    await admin.query(`CREATE DATABASE ${name}`);
  } finally {
    await admin.end();
  }
  const url = new URL(adminUrl);
  url.pathname = `/${name}`;
  return {
    url: url.toString(),
    drop: async () => {
      const client = new pg.Client({ connectionString: adminUrl });
      await client.connect();
      try {
        await client.query(`DROP DATABASE IF EXISTS ${name} WITH (FORCE)`);
      } finally {
        await client.end();
      }
    },
  };
}
