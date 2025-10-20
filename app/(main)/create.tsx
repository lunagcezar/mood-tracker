import { Slider } from '@/components/ui/core/slider';
import { Stack } from 'expo-router';
import * as React from 'react';
import CommunitySlider from '@react-native-community/slider';
import { ScreenContainer } from '@/components/ui/core/screen-container';

const SCREEN_OPTIONS = {
  title: 'Create a new Entry',
};

export default function MainCreate() {
  const [sliderValue, setSliderValue] = React.useState(1);
  return (
    <ScreenContainer>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <Slider
        label="Value"
        value={sliderValue}
        onValueChange={setSliderValue}
        maximumValue={10}
        minimumValue={1}
        step={1}
      />
    </ScreenContainer>
  );
}
