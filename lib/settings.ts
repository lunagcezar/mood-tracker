import { SETTINGS_KEY } from '@/constants/settings';
import { setItem } from '@/lib/async-storage';
import type { Settings } from '@/types/settings';
import type { ColorScheme, Language } from '@/types/settings';
import { NativeModules, Platform } from 'react-native';

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
  let locale = 'en';

  if (Platform.OS === 'ios') {
    locale =
      NativeModules.SettingsManager?.settings?.AppleLocale ||
      NativeModules.SettingsManager?.settings?.AppleLanguages?.[0] ||
      'en';
  } else if (Platform.OS === 'android') {
    locale = NativeModules.I18nManager?.localeIdentifier || 'en';
  } else {
    locale = navigator?.language || 'en';
  }

  if (locale.startsWith('pt-BR') || locale.startsWith('pt_BR')) {
    return 'pt-BR';
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
