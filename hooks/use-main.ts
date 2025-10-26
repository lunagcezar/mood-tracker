import { router } from 'expo-router';
import { MoodData } from '@/types/mood';
import { useEntriesByPrefix, useSaveEntry, useUpdateEntry, useEntryById } from './use-tanstack';
import { extractDateFromId, getTodayString, stringToDate } from '@/lib/date';
import { Alert } from 'react-native';
import { useCallback, useState, useEffect } from 'react';
import { DateString } from '@/types/date';

type UseMainParams = {
  mode?: 'create' | 'edit';
  entryId?: string;
};

export function useMain({ mode = 'create', entryId }: UseMainParams = {}) {
  const [dayRatingValue, setDayRatingValue] = useState(1);
  const [dayDetailsValue, setDayDetailsValue] = useState('');
  const [selectedDateString, setSelectedDateString] = useState(getTodayString());

  const moodData = useEntriesByPrefix<MoodData>('mood');

  const { data: existingEntry, refetch } = useEntryById<MoodData>(entryId || '', {
    enabled: mode === 'edit' && !!entryId,
  });

  useEffect(() => {
    if (mode === 'edit' && entryId) {
      refetch();
    }
  }, [mode, entryId, refetch]);

  useEffect(() => {
    if (mode === 'edit' && existingEntry) {
      setDayRatingValue(existingEntry.dayRating);
      setDayDetailsValue(existingEntry.dayDetails || '');
      const dateString = extractDateFromId(existingEntry.id);
      if (dateString) {
        setSelectedDateString(dateString);
      }
    }
  }, [mode, existingEntry]);

  const saveMutation = useSaveEntry<MoodData>('mood', () => router.back());
  const updateMutation = useUpdateEntry<MoodData>('mood', () => router.back());

  const checkIfDateExists = useCallback(
    (dateString: DateString) => {
      if (!moodData.data) return false;

      return moodData.data.some((item) => {
        const itemDate = extractDateFromId(item.id);
        return itemDate === dateString;
      });
    },
    [moodData.data]
  );

  const checkIfDateIsInFuture = (dateString: DateString) => dateString > getTodayString();

  const saveEntry = async () => {
    if (checkIfDateIsInFuture(selectedDateString)) {
      Alert.alert('Invalid Date', 'You cannot create an entry for a future date.', [
        { text: 'OK' },
      ]);
      return;
    } else if (checkIfDateExists(selectedDateString)) {
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

  const editEntry = async (id: string) => {
    const moodDataEntry = {
      dayRating: dayRatingValue,
      dayDetails: dayDetailsValue,
    };

    updateMutation.mutate({ id, data: moodDataEntry });
  };

  const handleSubmit = () => {
    if (mode === 'create') {
      saveEntry();
    } else if (entryId) {
      editEntry(entryId);
    }
  };

  return {
    dayRatingValue,
    setDayRatingValue,
    dayDetailsValue,
    setDayDetailsValue,
    selectedDateString,
    setSelectedDateString,
    saveEntry,
    editEntry,
    handleSubmit,
    existingEntry,
    isLoading: mode === 'edit' && !existingEntry,
    isSaving: saveMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
}
