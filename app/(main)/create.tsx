import { Stack } from 'expo-router';
import * as React from 'react';
import { ScreenContainer } from '@/components/ui/core/screen-container';
import MoodEditor from '@/components/ui/shared/mood-editor';

const SCREEN_OPTIONS = {
  title: 'Create a new entry',
};

export default function MainCreate() {
  return (
    <ScreenContainer className="gap-8">
      <Stack.Screen options={SCREEN_OPTIONS} />
      <MoodEditor />
    </ScreenContainer>
  );
}
