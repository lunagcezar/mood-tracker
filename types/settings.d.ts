export type TimestampedData = {
  id: string;
  created_at: string;
  updated_at: string;
};

export type ColorScheme = 'light' | 'dark' | 'system';
export type Language = 'en' | 'pt-BR' | 'system';

export type SettingsOption<T> = {
  value: T;
  label: string;
};

export type Settings = {
  colorScheme: ColorScheme;
  language: Language;
};
