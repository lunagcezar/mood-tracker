import { useEntriesByPrefix } from '@/hooks/use-tanstack';
import { extractDateFromId, getCalendarDays, getTodayString } from '@/lib/date';
import { DateString } from '@/types/date';
import { MoodData } from '@/types/mood';
import { useCallback, useMemo, useState } from 'react';

export function useCalendarIndex() {
  const moodData = useEntriesByPrefix<MoodData>('mood');
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDateString, setSelectedDateString] = useState(getTodayString());

  const moodByDate = useMemo(() => {
    if (!moodData.data) return {};

    return moodData.data.reduce<Record<string, MoodData>>((acc, item) => {
      const dateKey = extractDateFromId(item.id);
      if (dateKey) {
        acc[dateKey] = item;
      }
      return acc;
    }, {});
  }, [moodData.data]);

  const calendarDays = useMemo(
    () => getCalendarDays(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  const changeMonth = useCallback((offset: number) => {
    setCurrentMonth((prev) => {
      const newMonth = prev + offset;
      if (newMonth < 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      if (newMonth > 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return newMonth;
    });
  }, []);

  const monthName = new Date(currentYear, currentMonth, 1).toLocaleString('default', {
    month: 'long',
  });

  const selectDate = useCallback((dateString: DateString) => {
    setSelectedDateString(dateString);
  }, []);

  const selectedMood = selectedDateString ? moodByDate[selectedDateString] : null;

  return {
    moodByDate,
    calendarDays,
    changeMonth,
    monthName,
    currentYear,
    currentMonth,
    selectedDateString,
    selectDate,
    selectedMood,
  };
}
