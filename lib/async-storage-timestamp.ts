import { mergeItem, setItem } from './async-storage';

export async function setItemWithTimestamps<T extends object>(
  key: string,
  value: T
): Promise<void> {
  const now = new Date().toISOString();
  const dataWithTimestamps = {
    ...value,
    created_at: now,
    updated_at: now,
  };
  return setItem(key, dataWithTimestamps);
}

export async function updateItemWithTimestamp<T extends object>(
  key: string,
  value: Partial<T>
): Promise<void> {
  const now = new Date().toISOString();
  const dataWithTimestamp = {
    ...value,
    updated_at: now,
  };
  return mergeItem(key, dataWithTimestamp);
}
