import { useCallback } from 'react';
import { useMoodForm } from './use-mood-form';
import { useMoodValidation } from './use-mood-validation';
import { extractDateFromId } from '@/lib/date';
import { MoodData } from '@/types/mood';
import { useEntryLoader } from './use-entry-loader';
import { useSubmission } from './use-submission';

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

  const { entry, isLoading: isLoadingEntry } = useEntryLoader({
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

  const { createEntry, updateEntry, isSubmitting } = useSubmission<MoodData>({ prefix: 'mood' });

  const handleSubmit = useCallback(() => {
    if (isEditMode && entryId) {
      updateEntry(entryId, { dayRating, dayDetails });
    } else {
      const validation = validateDate(selectedDateString);
      if (!validation.isValid && validation.error) {
        showValidationAlert(validation.error);
        return;
      }
      createEntry({ dayRating, dayDetails }, selectedDateString);
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
