import { Stack, useLocalSearchParams } from 'expo-router';
import * as React from 'react';
import { ScreenContainer } from '@/components/ui/core/screen-container';
import MoodEditor from '@/components/ui/shared/mood-editor';

const SCREEN_OPTIONS = {
  title: 'Edit entry',
};

export default function MainEdit() {
  const { entryId } = useLocalSearchParams<{ entryId: string }>();

  return (
    <ScreenContainer className="gap-8">
      <Stack.Screen options={SCREEN_OPTIONS} />
      <MoodEditor mode="edit" entryId={entryId} />
    </ScreenContainer>
  );
}
