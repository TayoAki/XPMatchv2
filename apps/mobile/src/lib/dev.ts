// The component check is for the team, not testers (UI plan §10: a
// development-only gallery). It shows in development and when a build sets
// EXPO_PUBLIC_SHOW_DEV_SCREENS=true.
export const SHOW_DEV_SCREENS = __DEV__ || process.env.EXPO_PUBLIC_SHOW_DEV_SCREENS === 'true';
