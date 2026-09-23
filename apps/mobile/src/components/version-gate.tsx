import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { getAppConfig } from '@/lib/api';
import { checkVersion, type GateResult } from '@/lib/version-gate';
import * as Linking from 'expo-linking';
import { useEffect, useState, type ReactNode } from 'react';
import { View } from 'react-native';

/**
 * The minimum-version check (plan S0.1). If the API says this build is too old,
 * the app shows only the update screen. If the API can't be reached, the app
 * opens anyway: the check blocks known-bad builds, it never locks testers out.
 */
export function VersionGate({ children }: { children: ReactNode }) {
  const [result, setResult] = useState<GateResult>({ status: 'ok' });

  useEffect(() => {
    let cancelled = false;
    getAppConfig().then(
      (config) => {
        if (!cancelled) setResult(checkVersion(config));
      },
      () => undefined,
    );
    return () => {
      cancelled = true;
    };
  }, []);

  if (result.status === 'ok') return children;
  const { current, minimum, updateUrl } = result;
  return (
    <View className="bg-background flex-1 justify-center gap-4 px-6">
      <Text variant="h3">Update XPMatch to keep going</Text>
      <Text className="text-muted-foreground">
        This version ({current}) is no longer supported. Version {minimum} or newer is needed.
      </Text>
      {updateUrl ? (
        <Button onPress={() => void Linking.openURL(updateUrl)}>
          <Text>Get the update</Text>
        </Button>
      ) : (
        <Text className="text-muted-foreground">Open TestFlight or the Play Store to update.</Text>
      )}
    </View>
  );
}
