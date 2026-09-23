import type { AppConfigResponse } from '@xpmatch/contracts';
import type { FastifyInstance } from 'fastify';
import type { Config } from '../config';

// Read by the app before sign-in: builds older than the minimum must update
// (plan S0.1, the minimum-version check for over-the-air updates).
export function appConfigRoutes(app: FastifyInstance, config: Config): void {
  app.get('/v1/app-config', (_request, reply): AppConfigResponse => {
    void reply.header('cache-control', 'public, max-age=60');
    return { minimumVersion: config.minimumVersion, updateUrl: config.updateUrl };
  });
}
