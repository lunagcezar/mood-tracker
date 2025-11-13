import { TimestampedData } from './settings';

export type MoodData = TimestampedData & {
  dayRating: number;
  dayDetails?: string;
};
