import FAB from '@/components/ui/core/floating-action-button';
import { ScreenContainer } from '@/components/ui/core/screen-container';
import { Stack, useRouter } from 'expo-router';
import { PlusIcon } from 'lucide-react-native';
import * as React from 'react';

const SCREEN_OPTIONS = {
  title: 'Mood Tracker',
};

export default function MainIndex() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <FAB onPress={() => router.push('/create')} icon={<PlusIcon />} />
    </ScreenContainer>
  );
}
