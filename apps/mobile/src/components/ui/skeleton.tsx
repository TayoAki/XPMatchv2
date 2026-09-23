import { cn } from '@/lib/utils';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import * as React from 'react';

const duration = 1000;

function Skeleton({
  className,
  ...props
}: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  const sv = useSharedValue(1);
  // UI plan §5: with Reduce Motion on, the skeleton stays still.
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (reduceMotion) return;
    sv.value = withRepeat(withTiming(0.5, { duration }), -1, true);
  }, [sv, reduceMotion]);

  const style = useAnimatedStyle(
    () => ({
      opacity: sv.value,
    }),
    [sv],
  );
  return (
    <Animated.View
      style={style}
      className={cn('bg-secondary dark:bg-muted rounded-md', className)}
      {...props}
    />
  );
}

export { Skeleton };
