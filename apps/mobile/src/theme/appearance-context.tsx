import { createContext, use, useCallback, useMemo, useState, type ReactNode } from 'react';
import type { Appearance } from './appearance';
import { writeAppearance } from './appearance-store';
import { applyAppearance } from './apply';

interface AppearanceValue {
  appearance: Appearance;
  setAppearance: (next: Appearance) => void;
}

const AppearanceContext = createContext<AppearanceValue | null>(null);

export function AppearanceProvider({
  initial,
  children,
}: {
  initial: Appearance;
  children: ReactNode;
}) {
  const [appearance, setState] = useState(initial);
  // A change applies instantly, with no restart and no Save button (UI plan §4.1).
  const setAppearance = useCallback((next: Appearance) => {
    applyAppearance(next);
    writeAppearance(next);
    setState(next);
  }, []);
  const value = useMemo(() => ({ appearance, setAppearance }), [appearance, setAppearance]);
  return <AppearanceContext value={value}>{children}</AppearanceContext>;
}

export function useAppearance(): AppearanceValue {
  const value = use(AppearanceContext);
  if (!value) throw new Error('useAppearance must be used inside AppearanceProvider');
  return value;
}
