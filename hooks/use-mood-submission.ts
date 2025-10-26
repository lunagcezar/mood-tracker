import { router } from 'expo-router';
import { MoodData } from '@/types/mood';
import { useSaveEntry, useUpdateEntry } from './use-tanstack';
import { stringToDate } from '@/lib/date';
import { DateString } from '@/types/date';

type UseMoodSubmissionProps = {
  onSuccess?: () => void;
};

export function useMoodSubmission({ onSuccess }: UseMoodSubmissionProps = {}) {
  const defaultOnSuccess = () => router.back();
  const handleSuccess = onSuccess || defaultOnSuccess;

  const saveMutation = useSaveEntry<MoodData>('mood', handleSuccess);
  const updateMutation = useUpdateEntry<MoodData>('mood', handleSuccess);

  const createEntry = (dayRating: number, dayDetails: string, dateString: DateString) => {
    const moodDataEntry = {
      dayRating,
      dayDetails,
    };

    saveMutation.mutate({ data: moodDataEntry, date: stringToDate(dateString) });
  };

  const updateEntry = (id: string, dayRating: number, dayDetails: string) => {
    const moodDataEntry = {
      dayRating,
      dayDetails,
    };

    updateMutation.mutate({ id, data: moodDataEntry });
  };

  return {
    createEntry,
    updateEntry,
    isSaving: saveMutation.isPending,
    isUpdating: updateMutation.isPending,
    isSubmitting: saveMutation.isPending || updateMutation.isPending,
  };
}
