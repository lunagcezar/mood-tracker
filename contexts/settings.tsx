import { DEFAULT_SETTINGS, SETTINGS_KEY } from '@/constants/settings';
import { getItem } from '@/lib/async-storage';
import { getSystemLanguage, updateSetting } from '@/lib/settings';
import type { ColorScheme, Language, Settings, SettingsContext } from '@/types/settings';
import { useColorScheme as useNativewindColorScheme } from 'nativewind';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Appearance } from 'react-native';

const SettingsContext = createContext<SettingsContext | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const { setColorScheme } = useNativewindColorScheme();
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [systemColorScheme, setSystemColorScheme] = useState<'light' | 'dark'>(() => {
    const initial = Appearance.getColorScheme() ?? 'light';

    return initial;
  });
  const isManualChangeRef = useRef(false);

  useEffect(() => {
    getItem<Settings>(SETTINGS_KEY).then((loadedSettings) => {
      if (loadedSettings) {
        setSettings(loadedSettings);
      }
    });
  }, []);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (!isManualChangeRef.current && settings.colorScheme === 'system') {
        setSystemColorScheme(colorScheme ?? 'light');
      }
    });
    return () => subscription.remove();
  }, [settings.colorScheme]);

  const effectiveColorScheme: 'light' | 'dark' = useMemo(() => {
    return settings.colorScheme === 'system' ? systemColorScheme : settings.colorScheme;
  }, [settings.colorScheme, systemColorScheme]);

  const effectiveLanguage: 'en' | 'pt-BR' = useMemo(() => {
    return settings.language === 'system' ? getSystemLanguage() : settings.language;
  }, [settings.language]);

  useEffect(() => {
    isManualChangeRef.current = true;
    setColorScheme(effectiveColorScheme);

    const timer = setTimeout(() => {
      isManualChangeRef.current = false;
    }, 100);
    return () => clearTimeout(timer);
  }, [effectiveColorScheme, setColorScheme]);

  const updateColorScheme = useCallback(
    async (colorScheme: ColorScheme) => {
      const newSettings = await updateSetting(settings, 'colorScheme', colorScheme);
      setSettings(newSettings);
    },
    [settings]
  );

  const updateLanguage = useCallback(
    async (language: Language) => {
      const newSettings = await updateSetting(settings, 'language', language);
      setSettings(newSettings);
    },
    [settings]
  );

  const value = useMemo(
    () => ({
      settings,
      updateColorScheme,
      updateLanguage,
      effectiveColorScheme,
      effectiveLanguage,
    }),
    [settings, updateColorScheme, updateLanguage, effectiveColorScheme, effectiveLanguage]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
