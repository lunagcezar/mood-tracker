import { Slider } from '@/components/ui/core/slider';
import { Stack } from 'expo-router';
import * as React from 'react';
import { ScreenContainer } from '@/components/ui/core/screen-container';
import { Textarea } from '@/components/ui/core/textarea';
import { useMainCreate } from '@/hooks/use-main-create';

const SCREEN_OPTIONS = {
  title: 'Create a new Entry',
};

export default function MainCreate() {
  const { dayRatingValue, setDayRatingValue, dayDetailsValue, setDayDetailsValue } =
    useMainCreate();

  return (
    <ScreenContainer>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <Slider
        label="Value"
        value={dayRatingValue}
        onValueChange={setDayRatingValue}
        maximumValue={10}
        minimumValue={1}
        step={1}
      />
      <Textarea
        placeholder="Type details about your day"
        value={dayDetailsValue}
        onChangeText={setDayDetailsValue}
      />
    </ScreenContainer>
  );
}
