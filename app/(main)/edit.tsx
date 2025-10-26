import { Stack } from 'expo-router';
import * as React from 'react';
import { ScreenContainer } from '@/components/ui/core/screen-container';
import MoodEditor from '@/components/shared/mood-editor';

const SCREEN_OPTIONS = {
  title: 'Edit entry',
};

export default function MainEdit() {
  return (
    <ScreenContainer>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <MoodEditor mode="edit" />
    </ScreenContainer>
  );
}
