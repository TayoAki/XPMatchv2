import { isVersionSupported, type AppConfigResponse } from '@xpmatch/contracts';
import * as Application from 'expo-application';
import { Platform } from 'react-native';

export type GateResult =
  | { status: 'ok' }
  | { status: 'update_required'; current: string; minimum: string; updateUrl: string | null };

/** The minimum-version check (plan S0.1): builds older than the minimum must update. */
export function checkVersion(config: AppConfigResponse): GateResult {
  const platform = Platform.OS === 'android' ? 'android' : Platform.OS === 'ios' ? 'ios' : null;
  const current = Application.nativeApplicationVersion;
  // Web previews and unknown platforms have no store build to gate.
  if (!platform || !current || !/^\d+\.\d+\.\d+$/.test(current)) return { status: 'ok' };
  const minimum = config.minimumVersion[platform];
  return isVersionSupported(current, minimum)
    ? { status: 'ok' }
    : { status: 'update_required', current, minimum, updateUrl: config.updateUrl[platform] };
}
