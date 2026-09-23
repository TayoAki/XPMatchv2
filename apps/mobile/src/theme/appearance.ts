import { ACCENTS, DEFAULT_ACCENT, type AccentName } from '@xpmatch/design-tokens';

// What the traveler picks in Appearance (UI plan §4.1; REQ-030). Saved on the
// device now; on the account (account_settings) once sign-in lands.
export const APPEARANCE_MODES = ['system', 'light', 'dark'] as const;
export type AppearanceMode = (typeof APPEARANCE_MODES)[number];

export interface Appearance {
  mode: AppearanceMode;
  accent: AccentName;
}

export const DEFAULT_APPEARANCE: Appearance = { mode: 'system', accent: DEFAULT_ACCENT };

/** Reads a stored value defensively: anything unexpected falls back to the default. */
export function parseAppearance(raw: string | null): Appearance {
  if (!raw) return DEFAULT_APPEARANCE;
  try {
    const value = JSON.parse(raw) as Partial<Record<keyof Appearance, unknown>>;
    const mode = APPEARANCE_MODES.find((m) => m === value.mode) ?? DEFAULT_APPEARANCE.mode;
    const accent = ACCENTS.find((a) => a === value.accent) ?? DEFAULT_APPEARANCE.accent;
    return { mode, accent };
  } catch {
    return DEFAULT_APPEARANCE;
  }
}
