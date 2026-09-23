import { MODES, accentCssVariables } from '@xpmatch/design-tokens';
import { Uniwind } from 'uniwind';
import type { Appearance } from './appearance';

/**
 * Applies a traveler's colors. The accent is set on both the light and dark
 * themes, so System mode keeps it when the phone switches (UI plan §4.5).
 */
export function applyAppearance({ mode, accent }: Appearance): void {
  for (const m of MODES) Uniwind.updateCSSVariables(m, accentCssVariables(accent, m));
  Uniwind.setTheme(mode);
}
