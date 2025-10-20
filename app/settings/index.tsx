import { ScreenContainer } from '@/components/ui/screen-container';
import { Stack } from 'expo-router';
import * as React from 'react';

const SCREEN_OPTIONS = {
  title: 'Settings',
};

export default function SettingsIndex() {
  return (
    <ScreenContainer>
      <Stack.Screen options={SCREEN_OPTIONS} />
    </ScreenContainer>
  );
}
