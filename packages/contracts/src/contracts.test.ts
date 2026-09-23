import { describe, expect, it } from 'vitest';
import {
  AppConfigResponse,
  CommandEnvelope,
  IanaTimeZone,
  MoneyRange,
  UtcTimestamp,
  compareVersions,
  isVersionSupported,
} from './index';

describe('primitives', () => {
  it('accepts UTC timestamps and rejects offsets', () => {
    expect(UtcTimestamp.safeParse('2026-09-23T18:00:00Z').success).toBe(true);
    expect(UtcTimestamp.safeParse('2026-09-23T18:00:00+01:00').success).toBe(false);
  });

  it('accepts IANA zones and rejects abbreviations', () => {
    expect(IanaTimeZone.safeParse('Europe/Lisbon').success).toBe(true);
    expect(IanaTimeZone.safeParse('UTC').success).toBe(true);
    expect(IanaTimeZone.safeParse('Mars/Olympus').success).toBe(false);
    expect(IanaTimeZone.safeParse('CET').success).toBe(false);
  });

  it('keeps money as integer minor units with a currency and basis', () => {
    const range = { minMinor: 2000, maxMinor: 3000, currency: 'EUR', basis: 'per_person_per_meal' };
    expect(MoneyRange.safeParse(range).success).toBe(true);
    expect(MoneyRange.safeParse({ ...range, minMinor: 20.5 }).success).toBe(false);
    expect(MoneyRange.safeParse({ ...range, minMinor: 4000 }).success).toBe(false);
    expect(MoneyRange.safeParse({ ...range, currency: 'eur' }).success).toBe(false);
  });
});

describe('minimum-version check', () => {
  it('compares numerically, not as text', () => {
    expect(compareVersions('0.10.0', '0.9.9')).toBeGreaterThan(0);
    expect(compareVersions('1.0.0', '1.0.0')).toBe(0);
    expect(isVersionSupported('0.1.0', '0.2.0')).toBe(false);
    expect(isVersionSupported('0.2.1', '0.2.0')).toBe(true);
  });

  it('rejects malformed versions', () => {
    expect(() => compareVersions('1.0', '1.0.0')).toThrow();
    expect(
      AppConfigResponse.safeParse({
        minimumVersion: { ios: 'latest', android: '0.1.0' },
        updateUrl: { ios: null, android: null },
      }).success,
    ).toBe(false);
  });
});

describe('write envelope', () => {
  const valid = {
    requestId: '0b0f7a8e-2f4c-4d7e-9a51-6f1c2b3d4e5f',
    command: 'trip.stop.swap',
    schemaVersion: 1,
    idempotencyKey: 'k_3f9a2c1d8e7b6a5f',
    expectedRevision: 4,
    payload: { stopId: 'x' },
  };

  it('accepts a complete envelope', () => {
    expect(CommandEnvelope.safeParse(valid).success).toBe(true);
  });

  it('never accepts a client-supplied actor', () => {
    const parsed = CommandEnvelope.parse({ ...valid, actorUserId: 'someone-else' });
    expect(parsed).not.toHaveProperty('actorUserId');
  });

  it('requires an idempotency key and a revision field', () => {
    const { idempotencyKey: _key, ...noKey } = valid;
    const { expectedRevision: _rev, ...noRevision } = valid;
    expect(CommandEnvelope.safeParse(noKey).success).toBe(false);
    expect(CommandEnvelope.safeParse(noRevision).success).toBe(false);
    expect(CommandEnvelope.safeParse({ ...valid, command: 'Swap' }).success).toBe(false);
  });
});
