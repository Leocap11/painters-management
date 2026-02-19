import { Temporal } from '@js-temporal/polyfill';

/**
 * Convert a Prisma DateTime (@db.Date) to Temporal.PlainDate
 * Used for date-only fields (no time component)
 * @param date - JavaScript Date object from Prisma
 * @returns Temporal.PlainDate (YYYY-MM-DD)
 */
export const dateToPlainDate = (date: Date): Temporal.PlainDate => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1; // JavaScript months are 0-indexed
  const day = date.getUTCDate();
  return Temporal.PlainDate.from({ year, month, day });
};

/**
 * Convert a Prisma DateTime (@db.Timestamptz) to Temporal.ZonedDateTime
 * Used for timestamp fields (with time and timezone)
 * @param date - JavaScript Date object from Prisma
 * @param timeZone - IANA timezone (default: 'Europe/Rome')
 * @returns Temporal.ZonedDateTime
 */
export const dateToZonedDateTime = (
  date: Date,
  timeZone: string = 'Europe/Rome'
): Temporal.ZonedDateTime => {
  const instant = Temporal.Instant.fromEpochMilliseconds(date.getTime());
  return instant.toZonedDateTimeISO(timeZone);
};

/**
 * Convert a Temporal.PlainDate back to JavaScript Date for Prisma
 * @param plainDate - Temporal.PlainDate
 * @returns JavaScript Date object (set to UTC midnight)
 */
export const plainDateToDate = (plainDate: Temporal.PlainDate): Date => {
  return new Date(`${plainDate.toString()}T00:00:00.000Z`);
};

/**
 * Convert a Temporal.ZonedDateTime back to JavaScript Date for Prisma
 * @param zonedDateTime - Temporal.ZonedDateTime
 * @returns JavaScript Date object
 */
export const zonedDateTimeToDate = (
  zonedDateTime: Temporal.ZonedDateTime
): Date => {
  return new Date(zonedDateTime.epochMilliseconds);
};
