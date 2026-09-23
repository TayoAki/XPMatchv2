import { DEFAULT_APPEARANCE, parseAppearance, type Appearance } from './appearance';

// Web previews (used for screenshots) keep the choice in localStorage.
const KEY = 'xpmatch.appearance.v1';

export function readAppearance(): Appearance {
  try {
    return parseAppearance(globalThis.localStorage?.getItem(KEY) ?? null);
  } catch {
    return DEFAULT_APPEARANCE;
  }
}

export function writeAppearance(appearance: Appearance): void {
  try {
    globalThis.localStorage?.setItem(KEY, JSON.stringify(appearance));
  } catch {
    // Private windows can refuse storage; the choice then lasts for the session.
  }
}
