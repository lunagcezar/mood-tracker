import { useEffect } from 'react';
import { MoodData } from '@/types/mood';
import { useEntryById } from './use-tanstack';

type UseMoodEntryLoaderParams = {
  entryId?: string;
  enabled: boolean;
  onEntryLoaded?: (entry: MoodData) => void;
};

export function useMoodEntryLoader({ entryId, enabled, onEntryLoaded }: UseMoodEntryLoaderParams) {
  const {
    data: entry,
    refetch,
    isLoading,
  } = useEntryById<MoodData>(entryId || '', {
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
