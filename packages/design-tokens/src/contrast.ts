import { ACCENTS, MODES, themeColors, type AccentName, type ColorToken, type Mode } from './tokens';

// WCAG 2.x contrast (UI plan §4.4): text needs 4.5:1; outlines, focus rings
// and large shapes such as a filled button need 3:1.

function channel(value: number): number {
  const c = value / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(hex: string): number {
  const match = /^#([0-9a-f]{6})$/i.exec(hex);
  if (!match?.[1]) throw new Error(`Expected #RRGGBB, got ${hex}`);
  const n = parseInt(match[1], 16);
  return (
    0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255)
  );
}

export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x) as [
    number,
    number,
  ];
  return (hi + 0.05) / (lo + 0.05);
}

type Pair = readonly [label: string, fg: ColorToken, bg: ColorToken, min: 4.5 | 3];

// Pairs a screen can show, whatever the accent.
const BASE_PAIRS: Pair[] = [
  ['text on background', 'foreground', 'background', 4.5],
  ['text on card', 'card-foreground', 'card', 4.5],
  ['text on popover', 'popover-foreground', 'popover', 4.5],
  ['text on muted surface', 'foreground', 'muted', 4.5],
  ['text on secondary', 'secondary-foreground', 'secondary', 4.5],
  ['muted text on background', 'muted-foreground', 'background', 4.5],
  ['muted text on card', 'muted-foreground', 'card', 4.5],
  ['muted text on muted surface', 'muted-foreground', 'muted', 4.5],
  ['field outline on card', 'input', 'card', 3],
  ['field outline on background', 'input', 'background', 3],
  ['fit text on fit background', 'fit', 'fit-soft', 4.5],
  ['fit text on card', 'fit', 'card', 4.5],
  ['fit text on background', 'fit', 'background', 4.5],
  ['catch text on catch background', 'catch', 'catch-soft', 4.5],
  ['catch text on card', 'catch', 'card', 4.5],
  ['catch text on background', 'catch', 'background', 4.5],
  ['unknown text on unknown background', 'unknown', 'unknown-soft', 4.5],
  ['unknown text on card', 'unknown', 'card', 4.5],
  ['unknown text on background', 'unknown', 'background', 4.5],
  ['error text on card', 'destructive', 'card', 4.5],
  ['error text on error background', 'destructive', 'destructive-soft', 4.5],
  ['error text on background', 'destructive', 'background', 4.5],
  ['label on destructive button', 'destructive-foreground', 'destructive', 4.5],
  ['muted text on fit background', 'muted-foreground', 'fit-soft', 4.5],
  ['muted text on catch background', 'muted-foreground', 'catch-soft', 4.5],
];

// Pairs that change with the traveler's accent.
const ACCENT_PAIRS: Pair[] = [
  ['label on primary button', 'primary-foreground', 'primary', 4.5],
  ['primary as link on card', 'primary', 'card', 4.5],
  ['primary as link on background', 'primary', 'background', 4.5],
  ['primary text on soft chip', 'primary', 'accent', 4.5],
  ['text on soft chip', 'accent-foreground', 'accent', 4.5],
  ['muted text on soft chip', 'muted-foreground', 'accent', 4.5],
  ['primary button against background', 'primary', 'background', 3],
  ['focus ring against card', 'ring', 'card', 3],
  ['focus ring against background', 'ring', 'background', 3],
];

export interface ContrastResult {
  mode: Mode;
  accent: AccentName | 'all';
  label: string;
  fg: string;
  bg: string;
  ratio: number;
  min: number;
  passes: boolean;
}

/** Every pair, in every mode and accent. */
export function checkContrast(): ContrastResult[] {
  const results: ContrastResult[] = [];
  const add = (
    mode: Mode,
    accent: AccentName | 'all',
    pair: Pair,
    colors: Record<ColorToken, string>,
  ) => {
    const [label, fgToken, bgToken, min] = pair;
    const fg = colors[fgToken];
    const bg = colors[bgToken];
    const ratio = contrastRatio(fg, bg);
    results.push({ mode, accent, label, fg, bg, ratio, min, passes: ratio >= min });
  };
  for (const mode of MODES) {
    const neutral = themeColors(mode, 'pine');
    for (const pair of BASE_PAIRS) add(mode, 'all', pair, neutral);
    for (const accent of ACCENTS) {
      for (const pair of ACCENT_PAIRS) add(mode, accent, pair, themeColors(mode, accent));
    }
  }
  return results;
}
