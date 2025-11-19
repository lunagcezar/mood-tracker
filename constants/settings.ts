import { ColorScheme, Language, Settings, SettingsOption } from '@/types/settings';

export const COLOR_SCHEME_OPTIONS: SettingsOption<ColorScheme>[] = [
  { value: 'light', labelKey: 'settings.light' },
  { value: 'dark', labelKey: 'settings.dark' },
  { value: 'system', labelKey: 'settings.useSystemSettings' },
];

export const LANGUAGE_OPTIONS: SettingsOption<Language>[] = [
  { value: 'en', labelKey: 'settings.english' },
  { value: 'pt-BR', labelKey: 'settings.portugueseBrazil' },
  { value: 'system', labelKey: 'settings.useSystemSettings' },
];

export const SETTINGS_KEY = 'settings';

export const DEFAULT_SETTINGS = {
  colorScheme: 'system',
  language: 'system',
} as Settings;
