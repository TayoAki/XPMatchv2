import { z } from 'zod';
import { UtcTimestamp, Uuid } from './primitives';

// Writes carry a server-derived actor, request ID, command name, schema
// version, idempotency key and expected revision (AGENTS.md). The actor is
// never sent by the client: the API derives it from the session.

/** Command names are dotted and lower case, for example "trip.stop.swap". */
export const CommandName = z.string().regex(/^[a-z][a-z_]*(\.[a-z][a-z_]*)+$/);

export const IdempotencyKey = z
  .string()
  .min(16)
  .max(128)
  .regex(/^[A-Za-z0-9_-]+$/);

export const CommandEnvelope = z.object({
  requestId: Uuid,
  command: CommandName,
  schemaVersion: z.number().int().positive(),
  idempotencyKey: IdempotencyKey,
  /** The revision the client last saw; null only when creating a new root. */
  expectedRevision: z.number().int().nonnegative().nullable(),
  payload: z.unknown(),
});
export type CommandEnvelope = z.infer<typeof CommandEnvelope>;

/**
 * The stored result of a write. Repeating an idempotency key with the same
 * payload returns this receipt; a different payload is a conflict.
 */
export const MutationReceipt = z.object({
  receiptId: Uuid,
  command: CommandName,
  requestId: Uuid,
  idempotencyKey: IdempotencyKey,
  resultRef: Uuid.nullable(),
  resultRevision: z.number().int().nonnegative().nullable(),
  createdAt: UtcTimestamp,
});
export type MutationReceipt = z.infer<typeof MutationReceipt>;
