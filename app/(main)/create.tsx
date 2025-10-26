import { Stack } from 'expo-router';
import * as React from 'react';
import { ScreenContainer } from '@/components/ui/core/screen-container';
import MoodEditor from '@/components/shared/mood-editor';

const SCREEN_OPTIONS = {
  title: 'Create a new entry',
};

export default function MainCreate() {
  return (
    <ScreenContainer>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <MoodEditor />
    </ScreenContainer>
  );
}
