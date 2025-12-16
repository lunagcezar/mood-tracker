import FAB from '@/components/ui/core/fab';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/core/card';
import { ScreenContainer } from '@/components/ui/core/screen-container';
import { Text } from '@/components/ui/core/text';
import { useMoodStatistics } from '@/hooks/use-mood-statistics';
import { useTranslation } from '@/hooks/use-translation';
import { Stack, useRouter } from 'expo-router';
import { PlusIcon } from 'lucide-react-native';
import * as React from 'react';
import { View } from 'react-native';

export default function MainIndex() {
  const router = useRouter();
  const { t } = useTranslation();
  const { yearAverage, monthAverage, weekAverage } = useMoodStatistics();

  const SCREEN_OPTIONS = {
    title: t('screens.moodTracker'),
  };

  const formatAverage = (average: number | null): string => {
    if (average === null) return '-';
    return average.toFixed(2);
  };

  return (
    <ScreenContainer>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <Card>
        <CardHeader>
          <CardTitle>{t('statistics.yearAverage')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Text className="text-2xl font-bold">{formatAverage(yearAverage)}</Text>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('statistics.monthAverage')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Text className="text-2xl font-bold">{formatAverage(monthAverage)}</Text>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('statistics.weekAverage')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Text className="text-2xl font-bold">{formatAverage(weekAverage)}</Text>
        </CardContent>
      </Card>
      <FAB onPress={() => router.push('/create')} icon={PlusIcon} />
    </ScreenContainer>
  );
}
