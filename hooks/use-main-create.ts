import * as React from 'react';
import { router } from 'expo-router';
import { MoodData } from '@/types/mood';
import { useSaveEntry } from './use-save-entry';

export function useMainCreate(initialRating: number = 1, initialDetails: string = '') {
  const [dayRatingValue, setDayRatingValue] = React.useState(initialRating);
  const [dayDetailsValue, setDayDetailsValue] = React.useState(initialDetails);

  const { save, isSaving } = useSaveEntry<Omit<MoodData, 'id' | 'created_at' | 'updated_at'>>(
    'mood',
    () => router.back()
  );

  const saveEntry = async () => {
    const moodData = {
      dayRating: dayRatingValue,
      dayDetails: dayDetailsValue,
    };

    await save(moodData);
  };

  return {
    dayRatingValue,
    setDayRatingValue,
    dayDetailsValue,
    setDayDetailsValue,
    saveEntry,
    isSaving,
  };
}
