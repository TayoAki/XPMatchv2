import type { HealthResponse, ReadinessResponse } from '@xpmatch/contracts';
import { DEFAULT_MIGRATIONS_DIR, migrationStatus } from '@xpmatch/db';
import type { FastifyInstance } from 'fastify';
import type pg from 'pg';
import type { Config } from '../config';

export function healthRoutes(app: FastifyInstance, config: Config, pool: pg.Pool): void {
  // Liveness: answers without touching the database.
  app.get('/health', (): HealthResponse => ({
    status: 'ok',
    service: 'api',
    version: config.version,
    commit: config.commit,
    time: new Date().toISOString(),
  }));

  // The migrations this build ships: the image sets MIGRATIONS_DIR; from source
  // they're read from the db package.
  const migrationsDir = config.migrationsDir ?? DEFAULT_MIGRATIONS_DIR;

  // Readiness: the database answers and holds every migration this build ships.
  // Railway's deploy healthcheck uses it, so a deploy with pending migrations never takes traffic.
  app.get('/ready', async (_request, reply): Promise<ReadinessResponse> => {
    const checks: ReadinessResponse['checks'] = { database: 'error', migrations: 'error' };
    let client: pg.PoolClient | undefined;
    try {
      client = await pool.connect();
      await client.query('SELECT 1');
      checks.database = 'ok';
      const status = await migrationStatus(client, migrationsDir);
      checks.migrations =
        status.drifted.length > 0 ? 'error' : status.pending.length > 0 ? 'pending' : 'ok';
    } catch (error) {
      app.log.warn({ err: error }, 'readiness check failed');
    } finally {
      client?.release();
    }
    const ready = checks.database === 'ok' && checks.migrations === 'ok';
    void reply.code(ready ? 200 : 503);
    return { status: ready ? 'ready' : 'not_ready', checks };
  });
}
