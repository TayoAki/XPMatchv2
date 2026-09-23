// Plan D-010: does the host keep a WebSocket open as long as a voice interview?
// Usage: npm run ws-probe --workspace=@xpmatch/api -- wss://<api-domain>/v1/probe/ws 12
// Sends a message every 30 seconds for the given minutes and reports whether
// the connection stayed open. The server needs ENABLE_WS_PROBE=true.
import WebSocket from 'ws';
import { rawToText } from '../src/routes/ws-probe';

const [url, minutesArg = '10'] = process.argv.slice(2);
if (!url) {
  console.error('Usage: ws-probe <wss-url> [minutes]');
  process.exit(2);
}
const minutes = Number(minutesArg);
const started = Date.now();
const elapsed = () => Math.round((Date.now() - started) / 1000);
let echoes = 0;

const socket = new WebSocket(url);
let timer: NodeJS.Timeout | undefined;

socket.on('open', () => {
  console.log(`open after ${elapsed()} s`);
  const send = () => socket.send(`probe ${elapsed()}`);
  send();
  timer = setInterval(send, 30_000);
  setTimeout(() => socket.close(1000, 'probe finished'), minutes * 60_000);
});
socket.on('message', (data) => {
  echoes += 1;
  console.log(`${elapsed()} s: ${rawToText(data)}`);
});
socket.on('close', (code, reason) => {
  clearInterval(timer);
  const held = elapsed();
  const ok = held >= minutes * 60 - 5 && code === 1000;
  console.log(
    `closed after ${held} s (code ${code}${reason.length ? `, ${reason.toString()}` : ''}); ` +
      `${echoes} echoes. ${ok ? 'PASS' : 'FAIL'}: target ${minutes * 60} s`,
  );
  process.exit(ok ? 0 : 1);
});
socket.on('error', (error) => console.error(`error after ${elapsed()} s: ${error.message}`));
