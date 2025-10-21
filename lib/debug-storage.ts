import { getAllKeys, getItem } from '@/lib/async-storage';

export async function debugStorage() {
  try {
    const keys = await getAllKeys();
    console.log('=== AsyncStorage Debug ===');
    console.log('Total keys:', keys.length);
    console.log('All keys:', keys);

    for (const key of keys) {
      const value = await getItem(key);
      console.log(`\n[${key}]:`, JSON.stringify(value, null, 2));
    }
    console.log('=== End Debug ===');
  } catch (error) {
    console.error('Error debugging storage:', error);
  }
}

export async function debugEntriesByPrefix(prefix: string) {
  try {
    const keys = await getAllKeys();
    const filteredKeys = keys.filter((key) => key.startsWith(`${prefix}-`));

    console.log(`=== ${prefix.toUpperCase()} Entries Debug ===`);
    console.log('Total entries:', filteredKeys.length);

    for (const key of filteredKeys) {
      const value = await getItem(key);
      console.log(`\n[${key}]:`, JSON.stringify(value, null, 2));
    }
    console.log('=== End Debug ===');
  } catch (error) {
    console.error(`Error debugging ${prefix} entries:`, error);
  }
}
