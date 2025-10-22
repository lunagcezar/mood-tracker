import { ScreenContainer } from '@/components/ui/core/screen-container';
import { Text } from '@/components/ui/core/text';
import { useEntriesByPrefix } from '@/hooks/use-tanstack';
import { MoodData } from '@/types/mood';
import { Stack } from 'expo-router';
import * as React from 'react';

const SCREEN_OPTIONS = {
  title: 'Statistics',
};

export default function StatsIndex() {
  const moodData = useEntriesByPrefix<MoodData>('mood');

  return (
    <ScreenContainer>
      <Stack.Screen options={SCREEN_OPTIONS} />
      {moodData.data?.map((item) => (
        <Text>{JSON.stringify(item)}</Text>
      ))}
    </ScreenContainer>
  );
}
