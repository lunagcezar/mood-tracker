import { TimestampedData } from './data';

export type MoodData = TimestampedData & {
  dayRating: number;
  dayDetails?: string;
};
