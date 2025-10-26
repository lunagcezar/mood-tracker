import { useCallback } from 'react';
import { useMoodForm } from './use-mood-form';
import { useMoodEntryLoader } from './use-mood-entry-loader';
import { useMoodValidation } from './use-mood-validation';
import { useMoodSubmission } from './use-mood-submission';
import { extractDateFromId } from '@/lib/date';
import { MoodData } from '@/types/mood';

type UseMoodEditorParams = {
  mode?: 'create' | 'edit';
  entryId?: string;
};

export function useMoodEditor({ mode = 'create', entryId }: UseMoodEditorParams = {}) {
  const isEditMode = mode === 'edit';

  const {
    dayRating,
    setDayRating,
    dayDetails,
    setDayDetails,
    selectedDateString,
    setSelectedDateString,
  } = useMoodForm();

  const { entry, isLoading: isLoadingEntry } = useMoodEntryLoader({
    entryId,
    enabled: isEditMode,
    onEntryLoaded: useCallback(
      (loadedEntry: MoodData) => {
        setDayRating(loadedEntry.dayRating);
        setDayDetails(loadedEntry.dayDetails || '');
        const dateString = extractDateFromId(loadedEntry.id);
        if (dateString) {
          setSelectedDateString(dateString);
        }
      },
      [setDayRating, setDayDetails, setSelectedDateString]
    ),
  });

  const { validateDate, showValidationAlert } = useMoodValidation();

  const { createEntry, updateEntry, isSubmitting } = useMoodSubmission();

  const handleSubmit = useCallback(() => {
    if (isEditMode && entryId) {
      updateEntry(entryId, dayRating, dayDetails);
    } else {
      const validation = validateDate(selectedDateString);
      if (!validation.isValid && validation.error) {
        showValidationAlert(validation.error);
        return;
      }
      createEntry(dayRating, dayDetails, selectedDateString);
    }
  }, [
    isEditMode,
    entryId,
    dayRating,
    dayDetails,
    selectedDateString,
    validateDate,
    showValidationAlert,
    createEntry,
    updateEntry,
  ]);

  return {
    dayRating,
    setDayRating,
    dayDetails,
    setDayDetails,
    selectedDateString,
    setSelectedDateString,
    handleSubmit,
    isEditMode,
    isLoading: isEditMode && isLoadingEntry,
    isSubmitting,
    existingEntry: entry,
  };
}
