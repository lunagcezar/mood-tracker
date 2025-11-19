import { translations } from '@/constants/i18n';
import { useSettings } from '@/contexts/settings';
import { useMemo } from 'react';

export function useTranslation() {
  const { effectiveLanguage } = useSettings();

  const t = useMemo(() => {
    return (key: string): string => {
      const keys = key.split('.');
      let value: any = translations[effectiveLanguage];

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          console.warn(`Translation key not found: ${key}`);
          return key;
        }
      }

      return typeof value === 'string' ? value : key;
    };
  }, [effectiveLanguage]);

  return { t, language: effectiveLanguage };
}
