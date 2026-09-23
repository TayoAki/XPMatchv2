import { themeColors, type AccentName, type Mode } from '@xpmatch/design-tokens';
import { DarkTheme, DefaultTheme, type Theme } from 'expo-router';

/** Navigation chrome (headers, backgrounds) in the same tokens as the screens. */
export function navTheme(mode: Mode, accent: AccentName): Theme {
  const colors = themeColors(mode, accent);
  const base = mode === 'dark' ? DarkTheme : DefaultTheme;
  return {
    ...base,
    dark: mode === 'dark',
    colors: {
      ...base.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.background,
      text: colors.foreground,
      border: colors.border,
      notification: colors.destructive,
    },
  };
}
