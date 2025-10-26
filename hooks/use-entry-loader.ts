import { useEffect } from 'react';
import { useEntryById } from './use-tanstack';
import { TimestampedData } from '@/types/data';

type UseEntryLoaderParams<T extends TimestampedData> = {
  entryId?: string;
  enabled: boolean;
  onEntryLoaded?: (entry: T) => void;
};

export function useEntryLoader<T extends TimestampedData>({
  entryId,
  enabled,
  onEntryLoaded,
}: UseEntryLoaderParams<T>) {
  const {
    data: entry,
    refetch,
    isLoading,
  } = useEntryById<T>(entryId || '', {
    enabled: enabled && !!entryId,
  });

  useEffect(() => {
    if (enabled && entryId) {
      refetch();
    }
  }, [enabled, entryId, refetch]);

  useEffect(() => {
    if (entry && onEntryLoaded) {
      onEntryLoaded(entry);
    }
  }, [entry, onEntryLoaded]);

  return {
    entry,
    isLoading,
    refetch,
  };
}
