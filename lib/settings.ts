import type { ColorScheme, Language } from '@/types/settings';

export function getColorSchemeLabel(scheme: ColorScheme): string {
  switch (scheme) {
    case 'light':
      return 'Light';
    case 'dark':
      return 'Dark';
    case 'system':
      return 'Use system settings';
  }
}

export function getLanguageLabel(lang: Language): string {
  switch (lang) {
    case 'en':
      return 'English';
    case 'pt-BR':
      return 'Portuguese (Brazil)';
    case 'system':
      return 'Use system settings';
  }
}
