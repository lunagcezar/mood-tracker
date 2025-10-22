import { Slider } from '@/components/ui/core/slider';
import { Stack } from 'expo-router';
import * as React from 'react';
import { ScreenContainer } from '@/components/ui/core/screen-container';
import { Textarea } from '@/components/ui/core/textarea';
import { useMainCreate } from '@/hooks/use-main-create';
import { Button } from '@/components/ui/core/button';
import { Text } from '@/components/ui/core/text';
import { useColorScheme, View } from 'react-native';
import { getMoodColor, getMoodLabel, MAX_MOOD_RATING, MIN_MOOD_RATING } from '@/constants/mood';

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

  const colorScheme = useColorScheme();

  return (
    <ScreenContainer className="gap-8">
      <Stack.Screen options={SCREEN_OPTIONS} />
      <Text variant="h3" className="text-center">
        How are you feeling today?
      </Text>
      <View className="gap-4">
        <Text variant="h1" className="text-center">
          {dayRatingValue}
        </Text>
        <Text variant="h4" className="text-center">
          {getMoodLabel(dayRatingValue)}
        </Text>
      </View>

      <Slider
        value={dayRatingValue}
        onValueChange={setDayRatingValue}
        maximumValue={MAX_MOOD_RATING}
        minimumValue={MIN_MOOD_RATING}
        step={1}
        thumbTintColor={getMoodColor(dayRatingValue, colorScheme)}
        minimumTrackTintColor={getMoodColor(dayRatingValue, colorScheme)}
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
