// EXPO_PUBLIC_ variables are inlined into the bundle at build time, so they
// must never hold secrets. Set EXPO_PUBLIC_API_URL per EAS build profile.
export const API_URL = (process.env.EXPO_PUBLIC_API_URL ?? '').replace(/\/+$/, '');
