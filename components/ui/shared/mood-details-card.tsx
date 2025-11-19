import * as React from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/core/card';
import { Button } from '@/components/ui/core/button';
import { Icon } from '@/components/ui/core/icon';
import { Text } from '@/components/ui/core/text';
import { PenSquareIcon } from 'lucide-react-native';
import { formatDateString } from '@/lib/date';
import { getMoodColor } from '@/constants/mood';
import { MoodData } from '@/types/mood';
import { DateString } from '@/types/date';
import { useTranslation } from '@/hooks/use-translation';

type MoodDetailsCardProps = {
  selectedMood: MoodData;
  selectedDateString: DateString;
};

export function MoodDetailsCard({ selectedMood, selectedDateString }: MoodDetailsCardProps) {
  const { t, language } = useTranslation();

  const handleEdit = () => {
    router.push({
      pathname: '/edit',
      params: { entryId: selectedMood.id },
    });
  };

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <View className="gap-2">
          <CardTitle>{t('details.moodDetails')}</CardTitle>
          <CardDescription>
            {formatDateString(
              selectedDateString,
              {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              },
              language
            )}
          </CardDescription>
        </View>
        <Button variant="outline" className="aspect-square" onPress={handleEdit}>
          <Icon as={PenSquareIcon} className="size-5" />
        </Button>
      </CardHeader>
      <CardContent className="gap-4">
        <View className="flex-row gap-2">
          <Text className="font-bold">{t('details.rating')}</Text>
          <Text style={{ color: getMoodColor(selectedMood.dayRating) }}>
            {selectedMood.dayRating}/10
          </Text>
        </View>
        {selectedMood.dayDetails && (
          <View className="flex-row gap-2">
            <Text className="font-bold">{t('details.details')}</Text>
            <Text>{selectedMood.dayDetails}</Text>
          </View>
        )}
      </CardContent>
    </Card>
  );
}
