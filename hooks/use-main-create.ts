import * as React from 'react';
import { router } from 'expo-router';
import { MoodData } from '@/types/mood';
import { useEntriesByPrefix, useSaveEntry } from './use-tanstack';
import { extractDateFromId } from '@/lib/date';
import { Alert } from 'react-native';

export function useMainCreate(initialRating: number = 1, initialDetails: string = '') {
  const [dayRatingValue, setDayRatingValue] = React.useState(initialRating);
  const [dayDetailsValue, setDayDetailsValue] = React.useState(initialDetails);
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const moodData = useEntriesByPrefix<MoodData>('mood');

  const saveMutation = useSaveEntry<MoodData>('mood', () => router.back());

  const checkDateExists = React.useCallback(
    (date: Date) => {
      if (!moodData.data) return false;

      const dateString = date.toISOString().slice(0, 10);
      return moodData.data.some((item) => {
        const itemDate = extractDateFromId(item.id);
        return itemDate === dateString;
      });
    },
    [moodData.data]
  );

  const saveEntry = async () => {
    if (checkDateExists(selectedDate)) {
      Alert.alert(
        'Entry Already Exists',
        'An entry for this date already exists. Please choose a different date or edit the existing entry.',
        [{ text: 'OK' }]
      );
      return;
    }

    const moodDataEntry = {
      dayRating: dayRatingValue,
      dayDetails: dayDetailsValue,
    };

    saveMutation.mutate({ data: moodDataEntry, date: selectedDate });
  };

  return {
    dayRatingValue,
    setDayRatingValue,
    dayDetailsValue,
    setDayDetailsValue,
    selectedDate,
    setSelectedDate,
    saveEntry,
    isSaving: saveMutation.isPending,
  };
}
