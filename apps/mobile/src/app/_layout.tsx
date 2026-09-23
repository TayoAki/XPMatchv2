import '@/global.css';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { VersionGate } from '@/components/version-gate';
import { readAppearance } from '@/theme/appearance-store';
import { AppearanceProvider, useAppearance } from '@/theme/appearance-context';
import { applyAppearance } from '@/theme/apply';
import { navTheme } from '@/theme/nav-theme';
import { PortalHost } from '@rn-primitives/portal';
import { Stack, ThemeProvider, type ErrorBoundaryProps } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaListener } from 'react-native-safe-area-context';
import { Uniwind, useUniwind } from 'uniwind';

// The saved colors are applied before the first frame, while the splash screen
// still shows, so a returning traveler never sees the defaults flash (UI plan §4.5).
void SplashScreen.preventAutoHideAsync();
const initialAppearance = readAppearance();
applyAppearance(initialAppearance);

export default function RootLayout() {
  return (
    <AppearanceProvider initial={initialAppearance}>
      <SafeAreaListener onChange={({ insets }) => Uniwind.updateInsets(insets)} style={{ flex: 1 }}>
        <ThemedApp />
      </SafeAreaListener>
    </AppearanceProvider>
  );
}

function ThemedApp() {
  const { theme } = useUniwind();
  const { appearance } = useAppearance();
  const mode = theme === 'dark' ? 'dark' : 'light';

  useEffect(() => {
    void SplashScreen.hideAsync();
  }, []);

  return (
    <ThemeProvider value={navTheme(mode, appearance.accent)}>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      <VersionGate>
        <Stack screenOptions={{ headerShadowVisible: false }}>
          <Stack.Screen name="index" options={{ title: 'XPMatch' }} />
          <Stack.Screen name="appearance" options={{ title: 'Appearance' }} />
          <Stack.Screen name="kit" options={{ title: 'Component check' }} />
        </Stack>
      </VersionGate>
      <PortalHost />
    </ThemeProvider>
  );
}

// Shown instead of a blank screen when a screen fails to render. Error details
// appear only in development builds: messages can contain private content.
// A crash-reporting service reports from here once one is chosen (plan S0.1).
export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <View className="bg-background flex-1 justify-center gap-4 px-6">
      <Text variant="h3">Something went wrong</Text>
      <Text className="text-muted-foreground">
        Try again. If it keeps happening, tell us what you were doing.
      </Text>
      {__DEV__ && <Text className="text-destructive text-sm">{error.message}</Text>}
      <Button onPress={() => void retry()}>
        <Text>Try again</Text>
      </Button>
    </View>
  );
}
