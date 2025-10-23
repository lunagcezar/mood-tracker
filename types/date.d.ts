import { DateString } from '@/lib/date';

export type CalendarDay = {
  day: number | null;
  dateString: DateString | null;
};

/**
 * Branded type for date strings in YYYY-MM-DD format
 */
export type DateString = string & { readonly __brand: 'DateString' };
