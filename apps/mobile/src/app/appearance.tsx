import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import { APPEARANCE_MODES, type AppearanceMode } from '@/theme/appearance';
import { useAppearance } from '@/theme/appearance-context';
import { ACCENTS, ACCENT_LABELS, accents } from '@xpmatch/design-tokens';
import { Pressable, ScrollView, View } from 'react-native';
import { useUniwind } from 'uniwind';

const MODE_LABELS: Record<AppearanceMode, string> = {
  system: 'System',
  light: 'Light',
  dark: 'Dark',
};

// Profile → Appearance (UI plan §4.1; REQ-030). Changes apply at once and are
// saved on this phone; saving them to the account arrives with sign-in.
export default function AppearanceScreen() {
  const { appearance, setAppearance } = useAppearance();
  const { theme } = useUniwind();
  const mode = theme === 'dark' ? 'dark' : 'light';

  return (
    <ScrollView className="bg-background flex-1" contentContainerClassName="gap-6 p-4">
      <View className="gap-3">
        <Text variant="large">Mode</Text>
        <ToggleGroup
          type="single"
          variant="outline"
          value={appearance.mode}
          onValueChange={(value) => {
            const next = APPEARANCE_MODES.find((m) => m === value);
            if (next) setAppearance({ ...appearance, mode: next });
          }}
        >
          {APPEARANCE_MODES.map((m, i) => (
            <ToggleGroupItem
              key={m}
              value={m}
              aria-label={MODE_LABELS[m]}
              isFirst={i === 0}
              isLast={i === APPEARANCE_MODES.length - 1}
              className="h-11 flex-1"
            >
              <Text>{MODE_LABELS[m]}</Text>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </View>

      <View className="gap-3">
        <Text variant="large">Color</Text>
        <View className="flex-row flex-wrap gap-3">
          {ACCENTS.map((accent) => {
            const selected = appearance.accent === accent;
            return (
              <Pressable
                key={accent}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                accessibilityLabel={ACCENT_LABELS[accent]}
                onPress={() => setAppearance({ ...appearance, accent })}
                className="min-h-11 min-w-16 items-center gap-1.5"
              >
                <View
                  className={cn(
                    'size-11 rounded-full border-2',
                    selected ? 'border-foreground' : 'border-transparent',
                  )}
                  style={{ backgroundColor: accents[accent][mode].primary }}
                />
                <Text
                  className={cn('text-sm', selected ? 'font-semibold' : 'text-muted-foreground')}
                >
                  {ACCENT_LABELS[accent]}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View className="gap-3">
        <Text variant="large">Preview</Text>
        <Card>
          <CardContent className="gap-2">
            <Text className="text-muted-foreground text-sm font-medium">
              Day 1 · Lunch · 1 of 3
            </Text>
            <Text className="text-lg font-semibold">Sample café</Text>
            <View className="bg-fit-soft self-start rounded-full px-3 py-1">
              <Text className="text-fit text-sm">✓ Matches your profile</Text>
            </View>
            <Text className="text-catch">⚠ The catch: only six tables</Text>
            <Text className="text-unknown">? Not known: step-free entrance</Text>
            <View className="bg-accent self-start rounded-full px-3 py-1">
              <Text className="text-primary text-sm font-medium">Selected chip</Text>
            </View>
          </CardContent>
        </Card>
        <Text className="text-muted-foreground text-sm">
          Saved on this phone. Once sign-in arrives, your colors will follow you to any phone you
          sign in on.
        </Text>
      </View>
    </ScrollView>
  );
}
