import { randomUUID } from 'node:crypto';
import Fastify, { type FastifyInstance, type FastifyServerOptions } from 'fastify';
import type pg from 'pg';
import type { Config } from './config';
import { ApiError, errorBody } from './errors';
import { appConfigRoutes } from './routes/app-config';
import { healthRoutes } from './routes/health';
import { wsProbeRoutes } from './routes/ws-probe';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Logs carry the method, route pattern, status and request ID only. Bodies,
// query strings and credentials are never logged: they can hold private user
// content (AGENTS.md).
export function loggerOptions(level: Config['logLevel']): FastifyServerOptions['logger'] {
  return {
    level,
    redact: {
      paths: ['req.headers.authorization', 'req.headers.cookie', 'res.headers["set-cookie"]'],
      censor: '[redacted]',
    },
    serializers: {
      req: (req: { method: string; url: string; id: string; routeOptions?: { url?: string } }) => ({
        id: req.id,
        method: req.method,
        route: req.routeOptions?.url ?? req.url.split('?')[0],
      }),
      res: (res: { statusCode: number }) => ({ statusCode: res.statusCode }),
    },
  };
}

export interface BuildOptions {
  config: Config;
  pool: pg.Pool;
  logger?: FastifyServerOptions['logger'];
}

export async function buildApp({ config, pool, logger }: BuildOptions): Promise<FastifyInstance> {
  const app = Fastify({
    logger: logger ?? loggerOptions(config.logLevel),
    // Accept a caller's request ID only when it is a UUID; otherwise make one.
    genReqId: (req) => {
      const header = req.headers['x-request-id'];
      return typeof header === 'string' && UUID.test(header) ? header : randomUUID();
    },
    bodyLimit: 256 * 1024,
    trustProxy: true,
  });

  app.addHook('onRequest', async (request, reply) => {
    void reply.header('x-request-id', request.id);
    void reply.header('x-content-type-options', 'nosniff');
  });

  app.setNotFoundHandler((request, reply) => {
    void reply.code(404).send(errorBody('not_found', 'Not found', request.id));
  });

  app.setErrorHandler((error, request, reply) => {
    if (error instanceof ApiError) {
      return reply.code(error.statusCode).send(errorBody(error.code, error.message, request.id));
    }
    const statusCode = (error as { statusCode?: number }).statusCode;
    if (statusCode && statusCode >= 400 && statusCode < 500) {
      return reply.code(statusCode).send(errorBody('bad_request', 'Invalid request', request.id));
    }
    request.log.error({ err: error }, 'unhandled error');
    return reply.code(500).send(errorBody('internal', 'Something went wrong', request.id));
  });

  app.addHook('onClose', async () => {
    await pool.end();
  });

  if (config.enableWsProbe) await wsProbeRoutes(app);
  healthRoutes(app, config, pool);
  appConfigRoutes(app, config);
  return app;
}
