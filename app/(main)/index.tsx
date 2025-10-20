import { Stack } from 'expo-router';
import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const SCREEN_OPTIONS = {
  title: 'Mood Tracker',
};

export default function RootIndex() {
  return (
    <SafeAreaView className="flex flex-1 items-center justify-center gap-8 p-4">
      <Stack.Screen options={SCREEN_OPTIONS} />
    </SafeAreaView>
  );
}
