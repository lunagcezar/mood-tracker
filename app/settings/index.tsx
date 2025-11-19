import { Button } from '@/components/ui/core/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/core/dialog';
import { ScreenContainer } from '@/components/ui/core/screen-container';
import { Text } from '@/components/ui/core/text';
import SettingsPressable from '@/components/ui/features/settings/settings-pressable';
import { SettingsRadioGroup } from '@/components/ui/features/settings/settings-radio-group/settings-radio-group';
import { COLOR_SCHEME_OPTIONS, LANGUAGE_OPTIONS } from '@/constants/settings';
import { useSettings } from '@/contexts/settings';
import { useSettingsDialog } from '@/hooks/use-settings-dialog';
import { getColorSchemeLabelKey, getLanguageLabelKey } from '@/lib/settings';
import { useTranslation } from '@/hooks/use-translation';
import { Stack } from 'expo-router';
import * as React from 'react';

export default function SettingsIndex() {
  const { settings, updateColorScheme, updateLanguage } = useSettings();
  const {
    openDialog,
    setOpenDialog,
    tempColorScheme,
    setTempColorScheme,
    tempLanguage,
    setTempLanguage,
  } = useSettingsDialog();
  const { t } = useTranslation();

  const SCREEN_OPTIONS = {
    title: t('screens.settings'),
  };

  const handleSaveColorScheme = async () => {
    await updateColorScheme(tempColorScheme);
    setOpenDialog(null);
  };

  const handleSaveLanguage = async () => {
    await updateLanguage(tempLanguage);
    setOpenDialog(null);
  };

  return (
    <ScreenContainer>
      <Stack.Screen options={SCREEN_OPTIONS} />

      <>
        <SettingsPressable
          label={t('settings.colorScheme')}
          value={t(getColorSchemeLabelKey(settings.colorScheme))}
          onPress={() => {
            setTempColorScheme(settings.colorScheme);
            setOpenDialog('colorScheme');
          }}
        />

        <SettingsPressable
          label={t('settings.language')}
          value={t(getLanguageLabelKey(settings.language))}
          onPress={() => {
            setTempLanguage(settings.language);
            setOpenDialog('language');
          }}
        />
      </>

      <Dialog
        open={openDialog === 'colorScheme'}
        onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('settings.colorScheme')}</DialogTitle>
            <DialogDescription>{t('settings.chooseColorScheme')}</DialogDescription>
          </DialogHeader>

          <SettingsRadioGroup
            value={tempColorScheme}
            options={COLOR_SCHEME_OPTIONS}
            onValueChange={setTempColorScheme}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onPress={() => setOpenDialog(null)}>
                <Text>{t('actions.cancel')}</Text>
              </Button>
            </DialogClose>
            <Button onPress={handleSaveColorScheme}>
              <Text>{t('actions.save')}</Text>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openDialog === 'language'}
        onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('settings.language')}</DialogTitle>
            <DialogDescription>{t('settings.chooseLanguage')}</DialogDescription>
          </DialogHeader>

          <SettingsRadioGroup
            value={tempLanguage}
            options={LANGUAGE_OPTIONS}
            onValueChange={setTempLanguage}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onPress={() => setOpenDialog(null)}>
                <Text>{t('actions.cancel')}</Text>
              </Button>
            </DialogClose>
            <Button onPress={handleSaveLanguage}>
              <Text>{t('actions.save')}</Text>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ScreenContainer>
  );
}
