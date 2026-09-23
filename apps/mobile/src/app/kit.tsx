import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { SHOW_DEV_SCREENS } from '@/lib/dev';
import { Redirect } from 'expo-router';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react-native';
import { useState, type ReactNode } from 'react';
import { ScrollView, View } from 'react-native';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-muted-foreground text-sm font-medium uppercase">{title}</Text>
      {children}
    </View>
  );
}

// Development-only gallery (UI plan §10) for D-037's check: every React Native
// Reusables component in UI plan §6, in the current mode and accent. Check it
// on an iPhone and an Android phone in Light, Dark and each accent.
export default function KitScreen() {
  const [enabled, setEnabled] = useState(true);
  const [pace, setPace] = useState('moderate');
  const [tab, setTab] = useState('plan');

  if (!SHOW_DEV_SCREENS) return <Redirect href="/" />;

  return (
    <ScrollView className="bg-background flex-1" contentContainerClassName="gap-8 p-4 pb-16">
      <Section title="Text">
        <Text variant="h3">Title</Text>
        <Text>Body text in the foreground color.</Text>
        <Text variant="muted">Muted secondary text.</Text>
      </Section>

      <Section title="Evidence colors (fixed in every accent)">
        <Text className="text-fit">✓ Fit: matches your profile</Text>
        <Text className="text-catch">⚠ Catch: only six tables</Text>
        <Text className="text-unknown">? Unknown: opening days not known</Text>
        <Text className="text-destructive">Error: something went wrong</Text>
      </Section>

      <Section title="Buttons (44 pt minimum)">
        <Button>
          <Text>Create itinerary</Text>
        </Button>
        <Button variant="secondary">
          <Text>Secondary</Text>
        </Button>
        <Button variant="outline">
          <Text>Outline</Text>
        </Button>
        <Button variant="ghost">
          <Text>Ghost</Text>
        </Button>
        <Button variant="destructive">
          <Text>Delete account</Text>
        </Button>
        <View className="flex-row gap-3">
          <Button size="icon" variant="outline" accessibilityLabel="Previous option">
            <Icon as={ChevronLeft} />
          </Button>
          <Button size="icon" variant="outline" accessibilityLabel="Next option">
            <Icon as={ChevronRight} />
          </Button>
        </View>
      </Section>

      <Section title="Card and badges">
        <Card>
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>Card description</CardDescription>
          </CardHeader>
          <CardContent>
            <View className="flex-row flex-wrap gap-2">
              <Badge>
                <Text>Default</Text>
              </Badge>
              <Badge variant="secondary">
                <Text>Secondary</Text>
              </Badge>
              <Badge variant="outline">
                <Text>Outline</Text>
              </Badge>
              <Badge variant="destructive">
                <Text>Destructive</Text>
              </Badge>
            </View>
          </CardContent>
          <CardFooter>
            <Text variant="muted">Card footer</Text>
          </CardFooter>
        </Card>
      </Section>

      <Section title="Fields">
        <View className="gap-2">
          <Label nativeID="kit-name">Display name</Label>
          <Input aria-labelledby="kit-name" placeholder="Sam" />
        </View>
        <Textarea placeholder="Type a change, e.g. cheaper dinner on day 2" />
        <View className="flex-row items-center gap-3">
          <Switch checked={enabled} onCheckedChange={setEnabled} nativeID="kit-switch" />
          <Label nativeID="kit-switch" onPress={() => setEnabled((v) => !v)}>
            Evening check-ins
          </Label>
        </View>
        <Select defaultValue={{ value: 'moderate', label: 'Moderate' }}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pace" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Pace</SelectLabel>
              <SelectItem label="Relaxed" value="relaxed" />
              <SelectItem label="Moderate" value="moderate" />
              <SelectItem label="Packed" value="packed" />
            </SelectGroup>
          </SelectContent>
        </Select>
      </Section>

      <Section title="Tabs and toggle group">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="plan">
              <Text>Plan</Text>
            </TabsTrigger>
            <TabsTrigger value="explore">
              <Text>Explore</Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="plan">
            <Text>Plan tab content</Text>
          </TabsContent>
          <TabsContent value="explore">
            <Text>Explore tab content</Text>
          </TabsContent>
        </Tabs>
        <ToggleGroup
          type="single"
          variant="outline"
          value={pace}
          onValueChange={(value) => value && setPace(value)}
        >
          {['relaxed', 'moderate', 'packed'].map((p, i, all) => (
            <ToggleGroupItem
              key={p}
              value={p}
              isFirst={i === 0}
              isLast={i === all.length - 1}
              className="h-11 flex-1"
            >
              <Text className="capitalize">{p}</Text>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </Section>

      <Section title="Overlays">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Text>Open dialog</Text>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog title</DialogTitle>
              <DialogDescription>Dialog description.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button>
                  <Text>Close</Text>
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">
              <Text>Open alert dialog</Text>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove this stop?</AlertDialogTitle>
              <AlertDialogDescription>You can undo this right after.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>
                <Text>Cancel</Text>
              </AlertDialogCancel>
              <AlertDialogAction>
                <Text>Remove</Text>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Text>Open popover</Text>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            <Text>Popover content</Text>
          </PopoverContent>
        </Popover>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" accessibilityLabel="More information">
              <Icon as={Info} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <Text>Tooltip content</Text>
          </TooltipContent>
        </Tooltip>
      </Section>

      <Section title="Avatar, progress, skeleton, separator">
        <View className="flex-row items-center gap-3">
          <Avatar alt="Sample traveler">
            <AvatarFallback>
              <Text>ST</Text>
            </AvatarFallback>
          </Avatar>
          <Text>Initials only; no photos in MVP-1 without permission (D-040)</Text>
        </View>
        <Progress value={40} />
        <Skeleton className="h-16 w-full rounded-xl" />
        <Separator />
      </Section>
    </ScrollView>
  );
}
