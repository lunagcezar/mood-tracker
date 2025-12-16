import { useEntriesByPrefix } from '@/hooks/use-tanstack';
import { extractDateFromId } from '@/lib/date';
import { calculateAverage } from '@/lib/math';
import { MoodData } from '@/types/mood';
import { useMemo } from 'react';

export function useMoodStatistics() {
  const moodData = useEntriesByPrefix<MoodData>('mood');

  const statistics = useMemo(() => {
    if (!moodData.data || moodData.data.length === 0) {
      return {
        yearAverage: null,
        monthAverage: null,
        weekAverage: null,
      };
    }

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const yearRatings: number[] = [];
    const monthRatings: number[] = [];
    const weekRatings: number[] = [];

    moodData.data.forEach((item) => {
      const dateString = extractDateFromId(item.id);
      if (!dateString) return;

      const [year, month, day] = dateString.split('-').map(Number);
      const itemDate = new Date(year, month - 1, day);

      if (year === currentYear) {
        yearRatings.push(item.dayRating);

        if (month - 1 === currentMonth) {
          monthRatings.push(item.dayRating);

          if (itemDate >= startOfWeek) {
            weekRatings.push(item.dayRating);
          }
        }
      }
    });

    return {
      yearAverage: calculateAverage(yearRatings),
      monthAverage: calculateAverage(monthRatings),
      weekAverage: calculateAverage(weekRatings),
    };
  }, [moodData.data]);

  return statistics;
}
