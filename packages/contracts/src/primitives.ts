import { z } from 'zod';

// Data conventions (AGENTS.md): UUIDs; UTC timestamps plus IANA time zones;
// local trip dates; money as integer minor units with currency and basis.

export const Uuid = z.uuid();

/** An instant in UTC, written with a trailing Z. */
export const UtcTimestamp = z.iso.datetime({ offset: false });

/** A calendar date in the trip's city, with no time zone (YYYY-MM-DD). */
export const LocalDate = z.iso.date();

function isIanaTimeZone(value: string): boolean {
  try {
    new Intl.DateTimeFormat('en', { timeZone: value });
    return value.includes('/') || value === 'UTC';
  } catch {
    return false;
  }
}

export const IanaTimeZone = z.string().refine(isIanaTimeZone, 'Expected an IANA time zone');

/** ISO 4217 currency code, for example EUR. */
export const CurrencyCode = z.string().regex(/^[A-Z]{3}$/, 'Expected an ISO 4217 code');

/** ISO 3166-1 alpha-2 country code, for example PT. */
export const CountryCode = z.string().regex(/^[A-Z]{2}$/, 'Expected an ISO 3166-1 code');

export const PriceBasis = z.enum(['per_person_per_meal', 'per_person_per_ticket']);

const MinorUnits = z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER);

/** A price range in integer minor units (data shape §5: `money`). */
export const MoneyRange = z
  .object({
    minMinor: MinorUnits,
    maxMinor: MinorUnits,
    currency: CurrencyCode,
    basis: PriceBasis,
  })
  .refine((m) => m.minMinor <= m.maxMinor, 'minMinor must not exceed maxMinor');

export type MoneyRange = z.infer<typeof MoneyRange>;
