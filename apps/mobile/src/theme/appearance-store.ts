import { Storage } from 'expo-sqlite/kv-store';
import { DEFAULT_APPEARANCE, parseAppearance, type Appearance } from './appearance';

const KEY = 'xpmatch.appearance.v1';

// Synchronous on purpose: the saved colors are applied before the first frame,
// so a returning traveler never sees the default colors flash (UI plan §4.5).
export function readAppearance(): Appearance {
  try {
    return parseAppearance(Storage.getItemSync(KEY));
  } catch {
    return DEFAULT_APPEARANCE;
  }
}

export function writeAppearance(appearance: Appearance): void {
  try {
    Storage.setItemSync(KEY, JSON.stringify(appearance));
  } catch {
    // A failed cache write only costs the saved choice on the next cold start.
  }
}
