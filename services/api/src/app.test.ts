import { Writable } from 'node:stream';
import {
  AppConfigResponse,
  ErrorResponse,
  HealthResponse,
  ReadinessResponse,
} from '@xpmatch/contracts';
import { DEFAULT_MIGRATIONS_DIR, migrate } from '@xpmatch/db';
import { createTestDatabase, testDatabaseUrl, type TestDatabase } from '@xpmatch/db/testing';
import { cp, mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import WebSocket from 'ws';
import { buildApp, loggerOptions } from './app';
import { loadConfig } from './config';
import { createPool } from './db';
import { rawToText } from './routes/ws-probe';

const UNREACHABLE = 'postgres://nobody:nothing@127.0.0.1:1/none';
const adminUrl = testDatabaseUrl();

function config(env: Record<string, string> = {}) {
  return loadConfig({ DATABASE_URL: UNREACHABLE, LOG_LEVEL: 'silent', ...env });
}

describe('config', () => {
  it('names missing or invalid variables without echoing values', () => {
    expect(() => loadConfig({ MIN_APP_VERSION_IOS: 'secret-looking-value' })).toThrow(
      /DATABASE_URL, MIN_APP_VERSION_IOS/,
    );
    try {
      loadConfig({ MIN_APP_VERSION_IOS: 'secret-looking-value' });
    } catch (error) {
      expect((error as Error).message).not.toContain('secret-looking-value');
    }
  });
});

describe('api without a database', () => {
  it('GET /health answers without the database', async () => {
    const app = await buildApp({
      config: config({ GIT_COMMIT: 'abcdef1234567890' }),
      pool: createPool(UNREACHABLE),
    });
    const res = await app.inject({ method: 'GET', url: '/health' });
    expect(res.statusCode).toBe(200);
    const body = HealthResponse.parse(res.json());
    expect(body.commit).toBe('abcdef123456');
    await app.close();
  });

  it('GET /ready reports not_ready when the database is unreachable', async () => {
    const app = await buildApp({ config: config(), pool: createPool(UNREACHABLE) });
    const res = await app.inject({ method: 'GET', url: '/ready' });
    expect(res.statusCode).toBe(503);
    expect(ReadinessResponse.parse(res.json()).checks.database).toBe('error');
    await app.close();
  });

  it('GET /v1/app-config returns the minimum versions', async () => {
    const app = await buildApp({
      config: config({
        MIN_APP_VERSION_IOS: '0.3.0',
        UPDATE_URL_IOS: 'https://testflight.apple.com/join/example',
      }),
      pool: createPool(UNREACHABLE),
    });
    const res = await app.inject({ method: 'GET', url: '/v1/app-config' });
    const body = AppConfigResponse.parse(res.json());
    expect(body.minimumVersion).toEqual({ ios: '0.3.0', android: '0.1.0' });
    expect(body.updateUrl.ios).toBe('https://testflight.apple.com/join/example');
    expect(res.headers['cache-control']).toBe('public, max-age=60');
    await app.close();
  });

  it('answers unknown routes with the error shape and the request ID', async () => {
    const app = await buildApp({ config: config(), pool: createPool(UNREACHABLE) });
    const id = '6f9619ff-8b86-4d01-b42d-00c04fc964ff';
    const res = await app.inject({ method: 'GET', url: '/nope', headers: { 'x-request-id': id } });
    expect(res.statusCode).toBe(404);
    expect(ErrorResponse.parse(res.json()).error.requestId).toBe(id);
    expect(res.headers['x-request-id']).toBe(id);

    const replaced = await app.inject({
      method: 'GET',
      url: '/nope',
      headers: { 'x-request-id': 'not a uuid' },
    });
    expect(replaced.headers['x-request-id']).not.toBe('not a uuid');
    await app.close();
  });

  it('does not register the WebSocket probe unless enabled', async () => {
    const app = await buildApp({ config: config(), pool: createPool(UNREACHABLE) });
    const res = await app.inject({ method: 'GET', url: '/v1/probe/ws' });
    expect(res.statusCode).toBe(404);
    await app.close();
  });

  it('logs the route pattern and status, never query strings or bodies', async () => {
    const lines: string[] = [];
    const stream = new Writable({
      write(chunk: Buffer, _encoding, done) {
        lines.push(chunk.toString());
        done();
      },
    });
    const logger = { ...(loggerOptions('info') as object), stream };
    const app = await buildApp({ config: config(), pool: createPool(UNREACHABLE), logger });
    await app.inject({
      method: 'GET',
      url: '/v1/app-config?email=private.person%40example.com',
      headers: { authorization: 'Bearer secret-token' },
    });
    await app.close();
    const log = lines.join('');
    expect(log).toContain('"route":"/v1/app-config"');
    expect(log).not.toContain('example.com');
    expect(log).not.toContain('secret-token');
  });
});

describe('WebSocket probe (plan D-010)', () => {
  it('echoes with the connection age when enabled', async () => {
    const app = await buildApp({
      config: config({ ENABLE_WS_PROBE: 'true' }),
      pool: createPool(UNREACHABLE),
    });
    await app.listen({ port: 0, host: '127.0.0.1' });
    const address = app.server.address();
    const port = typeof address === 'object' && address ? address.port : 0;
    const reply = await new Promise<string>((resolve, reject) => {
      const socket = new WebSocket(`ws://127.0.0.1:${port}/v1/probe/ws`);
      socket.on('open', () => socket.send('hello'));
      socket.on('message', (data) => {
        resolve(rawToText(data));
        socket.close();
      });
      socket.on('error', reject);
    });
    expect(JSON.parse(reply)).toEqual({ echo: 'hello', openForSeconds: 0 });
    await app.close();
  });
});

describe.skipIf(!adminUrl)('api with PostgreSQL', () => {
  let db: TestDatabase;
  let dir: string;

  beforeAll(async () => {
    db = await createTestDatabase(adminUrl!);
    dir = await mkdtemp(path.join(os.tmpdir(), 'xp-api-migrations-'));
    await cp(DEFAULT_MIGRATIONS_DIR, dir, { recursive: true });
    await migrate({ connectionString: db.url, dir });
  });

  afterAll(async () => {
    await db?.drop();
    if (dir) await rm(dir, { recursive: true });
  });

  it('GET /ready is ready when every shipped migration is applied', async () => {
    const app = await buildApp({
      config: config({ DATABASE_URL: db.url, MIGRATIONS_DIR: dir }),
      pool: createPool(db.url),
    });
    const res = await app.inject({ method: 'GET', url: '/ready' });
    expect(res.statusCode).toBe(200);
    expect(ReadinessResponse.parse(res.json())).toEqual({
      status: 'ready',
      checks: { database: 'ok', migrations: 'ok' },
    });
    await app.close();
  });

  it('GET /ready is not ready while a shipped migration is pending', async () => {
    await writeFile(path.join(dir, '0002_pending.sql'), 'SELECT 1;');
    const app = await buildApp({
      config: config({ DATABASE_URL: db.url, MIGRATIONS_DIR: dir }),
      pool: createPool(db.url),
    });
    const res = await app.inject({ method: 'GET', url: '/ready' });
    expect(res.statusCode).toBe(503);
    expect(ReadinessResponse.parse(res.json()).checks.migrations).toBe('pending');
    await app.close();
  });
});
