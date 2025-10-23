import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { getAllEntriesByPrefix, getEntryById, updateEntryById, deleteEntryById } from '@/lib/crud';
import { saveEntry } from '@/lib/data';
import { TimestampedData } from '@/types/data';

export function useEntriesByPrefix<T extends TimestampedData>(
  prefix: string,
  options?: Omit<UseQueryOptions<T[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: [prefix, 'entries'],
    queryFn: () => getAllEntriesByPrefix<T>(prefix),
    ...options,
  });
}

export function useEntryById<T extends TimestampedData>(
  id: string,
  options?: Omit<UseQueryOptions<T | null>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: ['entry', id],
    queryFn: () => getEntryById<T>(id),
    enabled: !!id,
    ...options,
  });
}

export function useSaveEntry<T extends TimestampedData>(
  prefix: string,
  onSuccess?: (id: string) => void
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      date,
    }: {
      data: Omit<T, 'id' | 'created_at' | 'updated_at'>;
      date?: Date;
    }) => saveEntry(prefix, data, date),
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: [prefix, 'entries'] });
      onSuccess?.(id);
    },
  });
}

export function useUpdateEntry<T extends TimestampedData>(prefix: string, onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<T> }) => updateEntryById(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [prefix, 'entries'] });
      onSuccess?.();
    },
  });
}

export function useDeleteEntry(prefix: string, onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteEntryById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [prefix, 'entries'] });
      onSuccess?.();
    },
  });
}
