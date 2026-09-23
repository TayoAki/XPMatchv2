import { z } from 'zod';

/** A release version, major.minor.patch, as in app.json "version". */
export const AppVersion = z.string().regex(/^\d+\.\d+\.\d+$/, 'Expected major.minor.patch');

function parts(version: string): [number, number, number] {
  const parsed = AppVersion.parse(version).split('.').map(Number);
  return [parsed[0] ?? 0, parsed[1] ?? 0, parsed[2] ?? 0];
}

/** Negative when a < b, zero when equal, positive when a > b. */
export function compareVersions(a: string, b: string): number {
  const [a1, a2, a3] = parts(a);
  const [b1, b2, b3] = parts(b);
  return a1 - b1 || a2 - b2 || a3 - b3;
}

/** The minimum-version check (plan S0.1): an older build must update. */
export function isVersionSupported(current: string, minimum: string): boolean {
  return compareVersions(current, minimum) >= 0;
}
