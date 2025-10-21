import * as React from 'react';
import { saveEntry } from '@/lib/data';

export function useSaveEntry<T extends object>(prefix: string, onSuccess?: (id: string) => void) {
  const [isSaving, setIsSaving] = React.useState(false);

  const save = async (data: T): Promise<string | null> => {
    if (isSaving) return null;

    setIsSaving(true);
    try {
      const id = await saveEntry(prefix, data);
      onSuccess?.(id);
      return id;
    } catch (error) {
      console.error(`Error saving ${prefix} entry:`, error);
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  return {
    save,
    isSaving,
  };
}
