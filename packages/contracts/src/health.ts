import { z } from 'zod';
import { UtcTimestamp } from './primitives';

/** GET /health: the process is up. It never touches the database. */
export const HealthResponse = z.object({
  status: z.literal('ok'),
  service: z.literal('api'),
  version: z.string(),
  commit: z.string().nullable(),
  time: UtcTimestamp,
});
export type HealthResponse = z.infer<typeof HealthResponse>;

/** GET /ready: the API can serve requests, including a database round trip. */
export const ReadinessResponse = z.object({
  status: z.enum(['ready', 'not_ready']),
  checks: z.object({
    database: z.enum(['ok', 'error']),
    migrations: z.enum(['ok', 'pending', 'error']),
  }),
});
export type ReadinessResponse = z.infer<typeof ReadinessResponse>;
