import { router } from 'expo-router';
import { MoodData } from '@/types/mood';
import { useEntriesByPrefix, useSaveEntry } from './use-tanstack';
import { extractDateFromId, getTodayString, stringToDate } from '@/lib/date';
import { Alert } from 'react-native';
import { useCallback, useState } from 'react';

export function useMainCreate(initialRating: number = 1, initialDetails: string = '') {
  const [dayRatingValue, setDayRatingValue] = useState(initialRating);
  const [dayDetailsValue, setDayDetailsValue] = useState(initialDetails);
  const [selectedDateString, setSelectedDateString] = useState(getTodayString());

  const moodData = useEntriesByPrefix<MoodData>('mood');

  const saveMutation = useSaveEntry<MoodData>('mood', () => router.back());

  const checkDateExists = useCallback(
    (dateString: string) => {
      if (!moodData.data) return false;

      return moodData.data.some((item) => {
        const itemDate = extractDateFromId(item.id);
        return itemDate === dateString;
      });
    },
    [moodData.data]
  );

  const saveEntry = async () => {
    // Check if date is in the future
    if (selectedDateString > getTodayString()) {
      Alert.alert('Invalid Date', 'You cannot create an entry for a future date.', [
        { text: 'OK' },
      ]);
      return;
    } else if (checkDateExists(selectedDateString)) {
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

    saveMutation.mutate({ data: moodDataEntry, date: stringToDate(selectedDateString) });
  };

  return {
    dayRatingValue,
    setDayRatingValue,
    dayDetailsValue,
    setDayDetailsValue,
    selectedDateString,
    setSelectedDateString,
    saveEntry,
    isSaving: saveMutation.isPending,
  };
}
