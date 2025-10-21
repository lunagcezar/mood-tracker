import { setItemWithTimestamps } from './async-storage-timestamp';
import { generateId } from './string';

export async function saveEntry<T extends object>(prefix: string, data: T): Promise<string> {
  try {
    const id = generateId(prefix);
    const entryData = {
      ...data,
      id,
    };
    await setItemWithTimestamps(id, entryData);
    return id;
  } catch (error) {
    console.error(`Error saving entry with prefix "${prefix}":`, error);
    throw error;
  }
}
