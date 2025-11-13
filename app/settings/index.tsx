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
import { getColorSchemeLabel, getLanguageLabel } from '@/lib/settings';
import { Stack } from 'expo-router';
import * as React from 'react';

const SCREEN_OPTIONS = {
  title: 'Settings',
};

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
          label="Color scheme"
          value={getColorSchemeLabel(settings.colorScheme)}
          onPress={() => {
            setTempColorScheme(settings.colorScheme);
            setOpenDialog('colorScheme');
          }}
        />

        <SettingsPressable
          label="Language"
          value={getLanguageLabel(settings.language)}
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
            <DialogTitle>Color scheme</DialogTitle>
            <DialogDescription>Choose your preferred color scheme</DialogDescription>
          </DialogHeader>

          <SettingsRadioGroup
            value={tempColorScheme}
            options={COLOR_SCHEME_OPTIONS}
            onValueChange={setTempColorScheme}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onPress={() => setOpenDialog(null)}>
                <Text>Cancel</Text>
              </Button>
            </DialogClose>
            <Button onPress={handleSaveColorScheme}>
              <Text>Save</Text>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openDialog === 'language'}
        onOpenChange={(open) => !open && setOpenDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Language</DialogTitle>
            <DialogDescription>Choose your preferred language</DialogDescription>
          </DialogHeader>

          <SettingsRadioGroup
            value={tempLanguage}
            options={LANGUAGE_OPTIONS}
            onValueChange={setTempLanguage}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onPress={() => setOpenDialog(null)}>
                <Text>Cancel</Text>
              </Button>
            </DialogClose>
            <Button onPress={handleSaveLanguage}>
              <Text>Save</Text>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ScreenContainer>
  );
}
