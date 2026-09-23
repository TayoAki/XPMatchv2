import { buildApp } from './app';
import { loadConfig } from './config';
import { createPool } from './db';

const config = loadConfig();
const app = await buildApp({ config, pool: createPool(config.databaseUrl) });

let closing = false;
for (const signal of ['SIGTERM', 'SIGINT'] as const) {
  process.on(signal, () => {
    if (closing) return;
    closing = true;
    app.log.info({ signal }, 'shutting down');
    app.close().then(
      () => process.exit(0),
      (error: unknown) => {
        app.log.error({ err: error }, 'shutdown failed');
        process.exit(1);
      },
    );
  });
}

try {
  await app.listen({ port: config.port, host: config.host });
} catch (error) {
  // Some machines (CI runners, containers) have no IPv6; Railway does.
  if (config.host !== '::' || (error as NodeJS.ErrnoException).code !== 'EAFNOSUPPORT') throw error;
  app.log.warn('IPv6 is unavailable here; listening on IPv4 only');
  await app.listen({ port: config.port, host: '0.0.0.0' });
}
