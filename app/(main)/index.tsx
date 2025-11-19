import FAB from '@/components/ui/core/fab';
import { ScreenContainer } from '@/components/ui/core/screen-container';
import { useTranslation } from '@/hooks/use-translation';
import { Stack, useRouter } from 'expo-router';
import { PlusIcon } from 'lucide-react-native';
import * as React from 'react';

export default function MainIndex() {
  const router = useRouter();
  const { t } = useTranslation();

  const SCREEN_OPTIONS = {
    title: t('screens.moodTracker'),
  };

  return (
    <ScreenContainer>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <FAB onPress={() => router.push('/create')} icon={PlusIcon} />
    </ScreenContainer>
  );
}
