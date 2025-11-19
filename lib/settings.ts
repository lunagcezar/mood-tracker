import { SETTINGS_KEY } from '@/constants/settings';
import { setItem } from '@/lib/async-storage';
import type { Settings } from '@/types/settings';
import type { ColorScheme, Language } from '@/types/settings';
import { getLocales } from 'expo-localization';

export function getColorSchemeLabelKey(scheme: ColorScheme): string {
  switch (scheme) {
    case 'light':
      return 'settings.light';
    case 'dark':
      return 'settings.dark';
    case 'system':
      return 'settings.useSystemSettings';
  }
}

export function getLanguageLabelKey(lang: Language): string {
  switch (lang) {
    case 'en':
      return 'settings.english';
    case 'pt-BR':
      return 'settings.portugueseBrazil';
    case 'system':
      return 'settings.useSystemSettings';
  }
}

export function getSystemLanguage(): 'en' | 'pt-BR' {
  try {
    const locales = getLocales();

    if (locales && locales.length > 0) {
      const locale = locales[0].languageTag || locales[0].languageCode || 'en';
      const normalizedLocale = locale.toLowerCase().replace('_', '-');

      if (normalizedLocale.startsWith('pt')) {
        return 'pt-BR';
      }

      return 'en';
    }
  } catch (error) {
    console.error('[i18n] Error detecting system language:', error);
  }

  return 'en';
}

export async function updateSetting<T extends keyof Settings>(
  settings: Settings,
  key: T,
  value: Settings[T]
): Promise<Settings> {
  const newSettings = { ...settings, [key]: value };
  await setItem(SETTINGS_KEY, newSettings);
  return newSettings;
}
