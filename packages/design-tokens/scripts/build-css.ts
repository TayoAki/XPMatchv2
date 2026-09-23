// Writes the app's global.css from the tokens. CI fails when the file is stale.
import { writeFile } from 'node:fs/promises';
import { buildGlobalCss } from '../src/css';

const target = new URL('../../../apps/mobile/src/global.css', import.meta.url);
await writeFile(target, buildGlobalCss());
console.log(`Wrote ${target.pathname}`);
