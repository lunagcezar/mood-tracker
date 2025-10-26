import { useCallback } from 'react';
import { Alert } from 'react-native';
import { MoodData } from '@/types/mood';
import { useEntriesByPrefix } from './use-tanstack';
import { extractDateFromId, getTodayString } from '@/lib/date';
import { DateString } from '@/types/date';

export function useMoodValidation() {
  const moodData = useEntriesByPrefix<MoodData>('mood');

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

  const checkIfDateIsInFuture = useCallback(
    (dateString: DateString) => dateString > getTodayString(),
    []
  );

  const validateDate = useCallback(
    (dateString: DateString): { isValid: boolean; error?: string } => {
      if (checkIfDateIsInFuture(dateString)) {
        return {
          isValid: false,
          error: 'You cannot create an entry for a future date.',
        };
      }

      if (checkIfDateExists(dateString)) {
        return {
          isValid: false,
          error:
            'An entry for this date already exists. Please choose a different date or edit the existing entry.',
        };
      }

      return { isValid: true };
    },
    [checkIfDateExists, checkIfDateIsInFuture]
  );

  const showValidationAlert = (error: string) => {
    const title = error.includes('future') ? 'Invalid Date' : 'Entry Already Exists';
    Alert.alert(title, error, [{ text: 'OK' }]);
  };

  return {
    checkIfDateExists,
    checkIfDateIsInFuture,
    validateDate,
    showValidationAlert,
  };
}
