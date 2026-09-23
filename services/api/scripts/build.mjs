// Bundles the API and the migration CLI into dist/. Workspace packages
// (@xpmatch/*) are bundled from source; third-party packages stay external
// and are installed in the image by `npm ci --omit=dev`.
import { readFile } from 'node:fs/promises';
import { build } from 'esbuild';

const read = async (path) => JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'));
const manifests = await Promise.all([
  read('../package.json'),
  read('../../../db/package.json'),
  read('../../../packages/contracts/package.json'),
]);
const external = [...new Set(manifests.flatMap((m) => Object.keys(m.dependencies ?? {})))].filter(
  (name) => !name.startsWith('@xpmatch/'),
);

await build({
  entryPoints: { server: 'src/server.ts', migrate: '../../db/src/cli.ts' },
  outdir: 'dist',
  outExtension: { '.js': '.mjs' },
  bundle: true,
  platform: 'node',
  target: 'node22',
  format: 'esm',
  external,
  sourcemap: true,
  define: { __API_VERSION__: JSON.stringify(manifests[0].version) },
  logLevel: 'info',
});
