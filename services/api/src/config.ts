import { AppVersion } from '@xpmatch/contracts';
import { z } from 'zod';

declare const __API_VERSION__: string | undefined;

const Flag = z
  .enum(['true', 'false'])
  .default('false')
  .transform((v) => v === 'true');

const Env = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  // "::" accepts IPv6 (Railway's private network) and IPv4 connections.
  HOST: z.string().default('::'),
  DATABASE_URL: z.string().min(1),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
  MIGRATIONS_DIR: z.string().optional(),
  MIN_APP_VERSION_IOS: AppVersion.default('0.1.0'),
  MIN_APP_VERSION_ANDROID: AppVersion.default('0.1.0'),
  UPDATE_URL_IOS: z.url().optional(),
  UPDATE_URL_ANDROID: z.url().optional(),
  // Temporary: the long-lived WebSocket check for plan D-010. Off by default.
  ENABLE_WS_PROBE: Flag,
  RAILWAY_GIT_COMMIT_SHA: z.string().optional(),
  GIT_COMMIT: z.string().optional(),
});

export interface Config {
  port: number;
  host: string;
  databaseUrl: string;
  logLevel: z.infer<typeof Env>['LOG_LEVEL'];
  migrationsDir: string | undefined;
  version: string;
  commit: string | null;
  minimumVersion: { ios: string; android: string };
  updateUrl: { ios: string | null; android: string | null };
  enableWsProbe: boolean;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const parsed = Env.safeParse(env);
  if (!parsed.success) {
    // Name the variables, never their values: they may hold credentials.
    const names = parsed.error.issues.map((i) => i.path.join('.')).join(', ');
    throw new Error(`Invalid or missing environment variables: ${names}`);
  }
  const e = parsed.data;
  const commit = e.RAILWAY_GIT_COMMIT_SHA ?? e.GIT_COMMIT;
  return {
    port: e.PORT,
    host: e.HOST,
    databaseUrl: e.DATABASE_URL,
    logLevel: e.LOG_LEVEL,
    migrationsDir: e.MIGRATIONS_DIR,
    version: typeof __API_VERSION__ === 'string' ? __API_VERSION__ : 'dev',
    commit: commit ? commit.slice(0, 12) : null,
    minimumVersion: { ios: e.MIN_APP_VERSION_IOS, android: e.MIN_APP_VERSION_ANDROID },
    updateUrl: { ios: e.UPDATE_URL_IOS ?? null, android: e.UPDATE_URL_ANDROID ?? null },
    enableWsProbe: e.ENABLE_WS_PROBE,
  };
}
