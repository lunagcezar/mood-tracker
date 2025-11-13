import { ColorScheme, Language, SettingsOption } from '@/types/settings';

export const COLOR_SCHEME_OPTIONS: SettingsOption<ColorScheme>[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'Use system settings' },
];

export const LANGUAGE_OPTIONS: SettingsOption<Language>[] = [
  { value: 'en', label: 'English' },
  { value: 'pt-BR', label: 'Portuguese (Brazil)' },
  { value: 'system', label: 'Use system settings' },
];
