import { Slider } from '@/components/ui/core/slider';
import { Stack } from 'expo-router';
import * as React from 'react';
import { ScreenContainer } from '@/components/ui/core/screen-container';
import { Textarea } from '@/components/ui/core/textarea';
import { useMainCreate } from '@/hooks/use-main-create';
import { Button } from '@/components/ui/core/button';
import { Text } from '@/components/ui/core/text';

const SCREEN_OPTIONS = {
  title: 'Create a new Entry',
};

export default function MainCreate() {
  const {
    dayRatingValue,
    setDayRatingValue,
    dayDetailsValue,
    setDayDetailsValue,
    saveEntry,
    isSaving,
  } = useMainCreate();

  return (
    <ScreenContainer>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <Slider
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
      <Button onPress={saveEntry} disabled={isSaving}>
        <Text>{isSaving ? 'Saving...' : 'Save'}</Text>
      </Button>
    </ScreenContainer>
  );
}
