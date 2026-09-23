import {
  ACCENT_TOKENS,
  BASE_TOKENS,
  DEFAULT_ACCENT,
  MODES,
  accents,
  themeColors,
  type AccentName,
  type Mode,
} from './tokens';

// Uniwind reads theme colors as --color-<token> inside @variant light/dark
// (docs.uniwind.dev/theming/global-css), the same names React Native
// Reusables' Uniwind components use.

const cssVar = (token: string) => `--color-${token}`;

/** The accent's variables for one mode, for Uniwind.updateCSSVariables(mode, vars). */
export function accentCssVariables(accent: AccentName, mode: Mode): Record<string, string> {
  const colors = accents[accent][mode];
  return Object.fromEntries(ACCENT_TOKENS.map((token) => [cssVar(token), colors[token]]));
}

/** The app's global.css. Generated: edit the tokens, then run `npm run tokens:build`. */
export function buildGlobalCss(): string {
  const variant = (mode: Mode) => {
    const colors = themeColors(mode, DEFAULT_ACCENT);
    const lines = [...BASE_TOKENS, ...ACCENT_TOKENS].map(
      (t) => `      ${cssVar(t)}: ${colors[t]};`,
    );
    return `    @variant ${mode} {\n${lines.join('\n')}\n    }`;
  };
  return `/* Generated from packages/design-tokens by \`npm run tokens:build\`. Do not edit by hand.
   The default accent is ${DEFAULT_ACCENT}; the app swaps accents at runtime (UI plan §4.5). */
@import 'tailwindcss';
@import 'uniwind';
@import 'tw-animate-css';

/* UI plan §5: 12 pt fields and small cards, 16 pt cards, 24 pt sheets. */
@theme {
  --radius: 12px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --spacing-hairline: hairlineWidth();
}

@layer theme {
  :root {
${MODES.map(variant).join('\n\n')}
  }
}
`;
}
