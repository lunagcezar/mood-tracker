import { ScreenContainer } from '@/components/ui/screen-container';
import { Stack } from 'expo-router';
import * as React from 'react';

const SCREEN_OPTIONS = {
  title: 'Mood Tracker',
};

export default function MainIndex() {
  return (
    <ScreenContainer>
      <Stack.Screen options={SCREEN_OPTIONS} />
    </ScreenContainer>
  );
}
