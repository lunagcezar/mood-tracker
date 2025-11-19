export type TimestampedData = {
  id: string;
  created_at: string;
  updated_at: string;
};

export type ColorScheme = 'light' | 'dark' | 'system';
export type Language = 'en' | 'pt-BR' | 'system';

export type SettingsOption<T> = {
  value: T;
  labelKey: string;
};

export type Settings = {
  colorScheme: ColorScheme;
  language: Language;
};

export type SettingsContext = {
  settings: Settings;
  updateColorScheme: (colorScheme: ColorScheme) => Promise<void>;
  updateLanguage: (language: Language) => Promise<void>;
  effectiveColorScheme: 'light' | 'dark';
  effectiveLanguage: 'en' | 'pt-BR';
};
