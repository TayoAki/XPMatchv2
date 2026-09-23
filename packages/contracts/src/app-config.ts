import { z } from 'zod';
import { AppVersion } from './version';

/** GET /v1/app-config: read by the app at start-up, before sign-in. */
export const AppConfigResponse = z.object({
  minimumVersion: z.object({
    ios: AppVersion,
    android: AppVersion,
  }),
  /** Where testers get a newer build when theirs is too old. */
  updateUrl: z.object({
    ios: z.url().nullable(),
    android: z.url().nullable(),
  }),
});
export type AppConfigResponse = z.infer<typeof AppConfigResponse>;
