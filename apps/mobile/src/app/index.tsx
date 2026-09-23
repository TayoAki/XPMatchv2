import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { getHealth } from '@/lib/api';
import { API_URL } from '@/lib/config';
import { SHOW_DEV_SCREENS } from '@/lib/dev';
import type { HealthResponse } from '@xpmatch/contracts';
import * as Application from 'expo-application';
import { Link } from 'expo-router';
import * as Updates from 'expo-updates';
import { useEffect, useState } from 'react';
import { Platform, ScrollView, View } from 'react-native';

type ApiState =
  | { status: 'checking' }
  | { status: 'ok'; health: HealthResponse }
  | { status: 'error'; message: string };

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between gap-4 py-1">
      <Text className="text-muted-foreground">{label}</Text>
      <Text className="shrink text-right">{value}</Text>
    </View>
  );
}

// The project shell's home (plan S0.1). Sign-in and the taste profile replace
// it in slices 1 and 2.
export default function Home() {
  const [api, setApi] = useState<ApiState>({ status: 'checking' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    getHealth().then(
      (health) => {
        if (!cancelled) setApi({ status: 'ok', health });
      },
      (error: unknown) => {
        if (!cancelled) {
          setApi({
            status: 'error',
            message: error instanceof Error ? error.message : String(error),
          });
        }
      },
    );
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const retry = () => {
    setApi({ status: 'checking' });
    setAttempt((n) => n + 1);
  };

  return (
    <ScrollView className="bg-background flex-1" contentContainerClassName="gap-4 p-4">
      <Text className="text-muted-foreground">
        This is the project shell. Sign-in and your taste profile come next.
      </Text>

      <Card>
        <CardHeader>
          <CardTitle>API</CardTitle>
          <CardDescription>{API_URL || 'No API address in this build'}</CardDescription>
        </CardHeader>
        <CardContent className="gap-1">
          {api.status === 'checking' && <Text className="text-muted-foreground">Checking…</Text>}
          {api.status === 'ok' && (
            <>
              <Text className="text-fit font-medium">✓ Connected</Text>
              <Row label="Version" value={api.health.version} />
              <Row label="Commit" value={api.health.commit ?? 'not set'} />
            </>
          )}
          {api.status === 'error' && (
            <>
              <Text className="text-destructive font-medium">Not reachable</Text>
              <Text className="text-muted-foreground">{api.message}</Text>
              <Button variant="outline" className="mt-2" onPress={retry}>
                <Text>Try again</Text>
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>This build</CardTitle>
        </CardHeader>
        <CardContent className="gap-1">
          <Row label="App version" value={Application.nativeApplicationVersion ?? 'web preview'} />
          <Row label="Build" value={Application.nativeBuildVersion ?? '—'} />
          {Platform.OS === 'web' ? (
            <Row label="Updates" value="not used in web previews" />
          ) : (
            <>
              <Row label="Update channel" value={Updates.channel || 'none (development build)'} />
              <Row label="Runtime" value={Updates.runtimeVersion || '—'} />
              <Row
                label="Running"
                value={Updates.isEmbeddedLaunch ? 'built-in bundle' : 'downloaded update'}
              />
            </>
          )}
        </CardContent>
      </Card>

      <Link href="/appearance" asChild>
        <Button variant="outline">
          <Text>Appearance</Text>
        </Button>
      </Link>
      {SHOW_DEV_SCREENS && (
        <Link href="/kit" asChild>
          <Button variant="outline">
            <Text>Component check</Text>
          </Button>
        </Link>
      )}
    </ScrollView>
  );
}
