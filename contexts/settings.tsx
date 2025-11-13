import { getItem, setItem } from '@/lib/async-storage';
import type { ColorScheme, Language, Settings } from '@/types/settings';
import { useColorScheme as useNativewindColorScheme } from 'nativewind';
import * as React from 'react';
import { Appearance, NativeModules, Platform } from 'react-native';

const SETTINGS_KEY = 'settings';

function getSystemLanguage(): 'en' | 'pt-BR' {
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

type SettingsContextType = {
  settings: Settings;
  updateColorScheme: (colorScheme: ColorScheme) => Promise<void>;
  updateLanguage: (language: Language) => Promise<void>;
  effectiveColorScheme: 'light' | 'dark';
  effectiveLanguage: 'en' | 'pt-BR';
};

const SettingsContext = React.createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const { setColorScheme } = useNativewindColorScheme();
  const [settings, setSettings] = React.useState<Settings>({
    colorScheme: 'system',
    language: 'system',
  });
  const [systemColorScheme, setSystemColorScheme] = React.useState<'light' | 'dark'>(() => {
    const initial = Appearance.getColorScheme() ?? 'light';
    console.log('Initial system color scheme:', initial);
    return initial;
  });
  const isManualChangeRef = React.useRef(false);

  React.useEffect(() => {
    getItem<Settings>(SETTINGS_KEY).then((loadedSettings) => {
      if (loadedSettings) {
        console.log('Loaded settings:', loadedSettings);
        setSettings(loadedSettings);
      }
    });
  }, []);

  React.useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (!isManualChangeRef.current && settings.colorScheme === 'system') {
        console.log('System color scheme changed to:', colorScheme);
        setSystemColorScheme(colorScheme ?? 'light');
      }
    });
    return () => subscription.remove();
  }, [settings.colorScheme]);

  const effectiveColorScheme: 'light' | 'dark' = React.useMemo(() => {
    if (settings.colorScheme === 'system') {
      console.log('Using system color scheme:', systemColorScheme);
      return systemColorScheme;
    }
    console.log('Using manual color scheme:', settings.colorScheme);
    return settings.colorScheme;
  }, [settings.colorScheme, systemColorScheme]);

  const effectiveLanguage: 'en' | 'pt-BR' = React.useMemo(() => {
    if (settings.language === 'system') {
      const systemLang = getSystemLanguage();
      console.log('Using system language:', systemLang);
      return systemLang;
    }
    console.log('Using manual language:', settings.language);
    return settings.language;
  }, [settings.language]);

  React.useEffect(() => {
    console.log('Applying color scheme:', effectiveColorScheme);
    isManualChangeRef.current = true;
    setColorScheme(effectiveColorScheme);

    const timer = setTimeout(() => {
      isManualChangeRef.current = false;
    }, 100);
    return () => clearTimeout(timer);
  }, [effectiveColorScheme, setColorScheme]);

  const updateColorScheme = React.useCallback(
    async (colorScheme: ColorScheme) => {
      const newSettings = { ...settings, colorScheme };
      setSettings(newSettings);
      await setItem(SETTINGS_KEY, newSettings);
    },
    [settings]
  );

  const updateLanguage = React.useCallback(
    async (language: Language) => {
      const newSettings = { ...settings, language };
      setSettings(newSettings);
      await setItem(SETTINGS_KEY, newSettings);
    },
    [settings]
  );

  const value = React.useMemo(
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
  const context = React.useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
