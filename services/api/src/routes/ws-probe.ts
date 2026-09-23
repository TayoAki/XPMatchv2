import websocket from '@fastify/websocket';
import type { FastifyInstance } from 'fastify';
import type { RawData } from 'ws';

const MAX_MINUTES = 15;

export function rawToText(data: RawData): string {
  if (Array.isArray(data)) return Buffer.concat(data).toString('utf8');
  if (Buffer.isBuffer(data)) return data.toString('utf8');
  return Buffer.from(data).toString('utf8');
}

// Plan D-010: confirms the host keeps a WebSocket open as long as a voice
// interview needs. Registered only when ENABLE_WS_PROBE=true, it echoes small
// text messages with the connection's age and closes itself after 15 minutes.
export async function wsProbeRoutes(app: FastifyInstance): Promise<void> {
  await app.register(websocket, { options: { maxPayload: 1024 } });
  app.get('/v1/probe/ws', { websocket: true }, (socket) => {
    const opened = Date.now();
    const ping = setInterval(() => socket.ping(), 25_000);
    const limit = setTimeout(() => socket.close(1000, 'probe time limit'), MAX_MINUTES * 60_000);
    socket.on('message', (data) => {
      const text = rawToText(data).slice(0, 64);
      socket.send(
        JSON.stringify({ echo: text, openForSeconds: Math.round((Date.now() - opened) / 1000) }),
      );
    });
    socket.on('close', () => {
      clearInterval(ping);
      clearTimeout(limit);
    });
  });
}
