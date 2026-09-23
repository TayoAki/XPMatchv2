// The single source of XPMatch's colors (UI plan §4.2 and §4.3). Components
// use token names only, never raw colors. Names follow shadcn so React Native
// Reusables components work unchanged; `accent` is shadcn's soft selected fill.
// XPMatch adds fit, catch and unknown, which never change with the accent.

export const MODES = ['light', 'dark'] as const;
export type Mode = (typeof MODES)[number];

export const ACCENTS = ['pine', 'ocean', 'terracotta', 'plum', 'graphite'] as const;
export type AccentName = (typeof ACCENTS)[number];
export const DEFAULT_ACCENT: AccentName = 'pine';

export type Hex = `#${string}`;

export const BASE_TOKENS = [
  'background',
  'foreground',
  'card',
  'card-foreground',
  'popover',
  'popover-foreground',
  'secondary',
  'secondary-foreground',
  'muted',
  'muted-foreground',
  'accent-foreground',
  'border',
  'input',
  'fit',
  'fit-soft',
  'catch',
  'catch-soft',
  'unknown',
  'unknown-soft',
  'destructive',
  'destructive-soft',
  'destructive-foreground',
] as const;
export type BaseToken = (typeof BASE_TOKENS)[number];

export const ACCENT_TOKENS = ['primary', 'primary-foreground', 'accent', 'ring'] as const;
export type AccentToken = (typeof ACCENT_TOKENS)[number];

export type ColorToken = BaseToken | AccentToken;

export const base: Record<Mode, Record<BaseToken, Hex>> = {
  light: {
    background: '#F7F8F5', // PRD ivory
    foreground: '#182B28', // PRD dark text
    card: '#FFFFFF',
    'card-foreground': '#182B28',
    popover: '#FFFFFF',
    'popover-foreground': '#182B28',
    secondary: '#EDF0EB',
    'secondary-foreground': '#182B28',
    muted: '#EDF0EB',
    'muted-foreground': '#4D5E5A',
    'accent-foreground': '#182B28',
    border: '#D8DDD6',
    input: '#7E8B87',
    fit: '#1E6B47',
    'fit-soft': '#E4F2EA',
    catch: '#8A4B00',
    'catch-soft': '#FBEEDC',
    unknown: '#4F5B66',
    'unknown-soft': '#ECEFF2',
    destructive: '#B3261E',
    'destructive-soft': '#FBE9E7',
    'destructive-foreground': '#FFFFFF',
  },
  dark: {
    background: '#0E1816',
    foreground: '#EEF2EF',
    card: '#162320',
    'card-foreground': '#EEF2EF',
    popover: '#162320',
    'popover-foreground': '#EEF2EF',
    secondary: '#1F2F2B',
    'secondary-foreground': '#EEF2EF',
    muted: '#1F2F2B',
    'muted-foreground': '#A7B6B1',
    'accent-foreground': '#EEF2EF',
    border: '#2C3C38',
    input: '#6E7F7A',
    fit: '#7FD3A4',
    'fit-soft': '#16332A',
    catch: '#F2B878',
    'catch-soft': '#3A2A16',
    unknown: '#B7C2CC',
    'unknown-soft': '#26303A',
    destructive: '#F2A39B',
    'destructive-soft': '#3D1D1A',
    'destructive-foreground': '#3D1D1A',
  },
};

export const accents: Record<AccentName, Record<Mode, Record<AccentToken, Hex>>> = {
  pine: {
    light: {
      primary: '#174D42',
      'primary-foreground': '#FFFFFF',
      accent: '#E2EEEA',
      ring: '#1F7A67',
    },
    dark: {
      primary: '#86D1BB',
      'primary-foreground': '#0B2B24',
      accent: '#1C3A33',
      ring: '#86D1BB',
    },
  },
  ocean: {
    light: {
      primary: '#1D4F8A',
      'primary-foreground': '#FFFFFF',
      accent: '#E3ECF7',
      ring: '#2A64A8',
    },
    dark: {
      primary: '#9EC5F2',
      'primary-foreground': '#0D2744',
      accent: '#1B2E45',
      ring: '#9EC5F2',
    },
  },
  terracotta: {
    light: {
      primary: '#9A3F24',
      'primary-foreground': '#FFFFFF',
      accent: '#F6E6E0',
      ring: '#B04B2C',
    },
    dark: {
      primary: '#F0A68C',
      'primary-foreground': '#3D1609',
      accent: '#3A231C',
      ring: '#F0A68C',
    },
  },
  plum: {
    light: {
      primary: '#6A3877',
      'primary-foreground': '#FFFFFF',
      accent: '#F0E6F3',
      ring: '#7E4A8C',
    },
    dark: {
      primary: '#D6B0E2',
      'primary-foreground': '#35163F',
      accent: '#2F2236',
      ring: '#D6B0E2',
    },
  },
  graphite: {
    light: {
      primary: '#2E3437',
      'primary-foreground': '#FFFFFF',
      accent: '#E8EAEB',
      ring: '#4A5358',
    },
    dark: {
      primary: '#D3D8DB',
      'primary-foreground': '#1A1E20',
      accent: '#2A3033',
      ring: '#D3D8DB',
    },
  },
};

/** Every color for one mode and accent. */
export function themeColors(mode: Mode, accent: AccentName): Record<ColorToken, Hex> {
  return { ...base[mode], ...accents[accent][mode] };
}

/** Accent labels shown in Appearance (UI plan §4.1). */
export const ACCENT_LABELS: Record<AccentName, string> = {
  pine: 'Pine',
  ocean: 'Ocean',
  terracotta: 'Terracotta',
  plum: 'Plum',
  graphite: 'Graphite',
};

/** Corner radius in points (UI plan §5): fields and small cards, cards, sheets. */
export const radius = { field: 12, card: 16, sheet: 24 } as const;
