import { Stack } from 'expo-router';
import * as React from 'react';
import { ScreenContainer } from '@/components/ui/core/screen-container';
import MoodEditor from '@/components/ui/shared/mood-editor';
import { useTranslation } from '@/hooks/use-translation';

export default function MainCreate() {
  const { t } = useTranslation();

  const SCREEN_OPTIONS = {
    title: t('screens.createEntry'),
  };
  return (
    <ScreenContainer className="gap-8">
      <Stack.Screen options={SCREEN_OPTIONS} />
      <MoodEditor />
    </ScreenContainer>
  );
}
