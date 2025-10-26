import { router } from 'expo-router';
import { useSaveEntry, useUpdateEntry } from './use-tanstack';
import { stringToDate } from '@/lib/date';
import { DateString } from '@/types/date';
import { TimestampedData } from '@/types/data';

type UseSubmissionProps = {
  prefix: string;
  onSuccess?: () => void;
};

export function useSubmission<T extends TimestampedData>({
  prefix,
  onSuccess,
}: UseSubmissionProps) {
  const defaultOnSuccess = () => router.back();
  const handleSuccess = onSuccess || defaultOnSuccess;

  const saveMutation = useSaveEntry<T>(prefix, handleSuccess);
  const updateMutation = useUpdateEntry<T>(prefix, handleSuccess);

  const createEntry = (
    data: Omit<T, 'id' | 'created_at' | 'updated_at'>,
    dateString?: DateString
  ) => {
    saveMutation.mutate({ data, date: dateString ? stringToDate(dateString) : undefined });
  };

  const updateEntry = (id: string, data: Partial<T>) => {
    updateMutation.mutate({ id, data });
  };

  return {
    createEntry,
    updateEntry,
    isSaving: saveMutation.isPending,
    isUpdating: updateMutation.isPending,
    isSubmitting: saveMutation.isPending || updateMutation.isPending,
  };
}
