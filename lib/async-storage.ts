import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setItem<T>(key: string, value: T): Promise<void> {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`Error storing data for key "${key}":`, error);
    throw error;
  }
}

export async function getItem<T>(key: string): Promise<T | null> {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error retrieving data for key "${key}":`, error);
    throw error;
  }
}

export async function removeItem(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing data for key "${key}":`, error);
    throw error;
  }
}

export async function mergeItem<T>(key: string, value: Partial<T>): Promise<void> {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.mergeItem(key, jsonValue);
  } catch (error) {
    console.error(`Error merging data for key "${key}":`, error);
    throw error;
  }
}

export async function clear(): Promise<void> {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
    throw error;
  }
}

export async function getAllKeys(): Promise<readonly string[]> {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (error) {
    console.error('Error getting all keys:', error);
    throw error;
  }
}

export async function multiGet<T extends Record<string, any>>(keys: string[]): Promise<Partial<T>> {
  try {
    const pairs = await AsyncStorage.multiGet(keys);
    const result: any = {};

    pairs.forEach(([key, value]) => {
      if (value != null) {
        result[key] = JSON.parse(value);
      }
    });

    return result;
  } catch (error) {
    console.error('Error getting multiple items:', error);
    throw error;
  }
}

export async function multiSet<T extends Record<string, any>>(data: T): Promise<void> {
  try {
    const pairs: [string, string][] = Object.entries(data).map(([key, value]) => [
      key,
      JSON.stringify(value),
    ]);
    await AsyncStorage.multiSet(pairs);
  } catch (error) {
    console.error('Error setting multiple items:', error);
    throw error;
  }
}

export async function multiRemove(keys: string[]): Promise<void> {
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    console.error('Error removing multiple items:', error);
    throw error;
  }
}
