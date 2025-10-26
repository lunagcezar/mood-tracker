import { useState } from 'react';
import { DateString } from '@/types/date';
import { getTodayString } from '@/lib/date';

export function useMoodForm() {
  const [dayRating, setDayRating] = useState(1);
  const [dayDetails, setDayDetails] = useState('');
  const [selectedDateString, setSelectedDateString] = useState<DateString>(getTodayString());

  const resetForm = () => {
    setDayRating(1);
    setDayDetails('');
    setSelectedDateString(getTodayString());
  };

  return {
    dayRating,
    setDayRating,
    dayDetails,
    setDayDetails,
    selectedDateString,
    setSelectedDateString,
    resetForm,
  };
}
