import { TimestampedData } from '@/types/settings';
import { getAllKeys, getItem, removeItem } from './async-storage';
import { updateItemWithTimestamp } from './async-storage-timestamp';

export async function getAllEntriesByPrefix<T extends TimestampedData>(
  prefix: string,
  sortOrder: 'asc' | 'desc' = 'desc'
): Promise<T[]> {
  try {
    const allKeys = await getAllKeys();
    const filteredKeys = allKeys.filter((key) => key.startsWith(`${prefix}-`));
    const entries = await Promise.all(filteredKeys.map((key) => getItem<T>(key)));
    const validEntries: T[] = entries.filter((entry) => entry !== null) as T[];

    return validEntries.sort((a, b) => {
      return sortOrder === 'desc' ? b.id.localeCompare(a.id) : a.id.localeCompare(b.id);
    });
  } catch (error) {
    console.error(`Error getting entries with prefix "${prefix}":`, error);
    throw error;
  }
}

export async function getEntryById<T extends TimestampedData>(id: string): Promise<T | null> {
  try {
    return await getItem<T>(id);
  } catch (error) {
    console.error(`Error getting entry with id "${id}":`, error);
    throw error;
  }
}

export async function deleteEntryById(id: string): Promise<void> {
  try {
    await removeItem(id);
  } catch (error) {
    console.error(`Error deleting entry with id "${id}":`, error);
    throw error;
  }
}

export async function updateEntryById<T extends TimestampedData>(
  id: string,
  data: Partial<T>
): Promise<void> {
  try {
    await updateItemWithTimestamp(id, data);
  } catch (error) {
    console.error(`Error updating entry with id "${id}":`, error);
    throw error;
  }
}

export async function deleteAllEntriesByPrefix(prefix: string): Promise<void> {
  try {
    const allKeys = await getAllKeys();
    const filteredKeys = allKeys.filter((key) => key.startsWith(`${prefix}-`));

    await Promise.all(filteredKeys.map((key) => removeItem(key)));
  } catch (error) {
    console.error(`Error deleting entries with prefix "${prefix}":`, error);
    throw error;
  }
}
