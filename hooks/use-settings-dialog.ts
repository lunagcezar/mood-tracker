import type { ColorScheme, Language } from '@/types/settings';
import * as React from 'react';

type SettingDialog = 'colorScheme' | 'language' | null;

export function useSettingsDialog() {
  const [openDialog, setOpenDialog] = React.useState<SettingDialog>(null);
  const [tempColorScheme, setTempColorScheme] = React.useState<ColorScheme>('system');
  const [tempLanguage, setTempLanguage] = React.useState<Language>('system');

  return {
    openDialog,
    setOpenDialog,
    tempColorScheme,
    setTempColorScheme,
    tempLanguage,
    setTempLanguage,
  };
}
