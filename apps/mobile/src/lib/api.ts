import { AppConfigResponse, HealthResponse } from '@xpmatch/contracts';
import type { z } from 'zod';
import { API_URL } from './config';

export class ApiUnavailableError extends Error {
  override name = 'ApiUnavailableError';
}

async function getJson<S extends z.ZodType>(
  path: string,
  schema: S,
  timeoutMs = 8000,
): Promise<z.infer<S>> {
  if (!API_URL) throw new ApiUnavailableError('EXPO_PUBLIC_API_URL is not set');
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`${API_URL}${path}`, { signal: controller.signal });
    if (!response.ok) throw new ApiUnavailableError(`${path} answered ${response.status}`);
    // Responses are validated against the shared contracts, never trusted as is.
    return schema.parse(await response.json());
  } catch (error) {
    if (error instanceof ApiUnavailableError) throw error;
    throw new ApiUnavailableError(error instanceof Error ? error.message : String(error));
  } finally {
    clearTimeout(timer);
  }
}

export const getHealth = () => getJson('/health', HealthResponse);
export const getAppConfig = () => getJson('/v1/app-config', AppConfigResponse);
