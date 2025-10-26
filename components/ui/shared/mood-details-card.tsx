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

type MoodDetailsCardProps = {
  selectedMood: MoodData;
  selectedDateString: DateString;
};

export function MoodDetailsCard({ selectedMood, selectedDateString }: MoodDetailsCardProps) {
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
          <CardTitle>Mood details</CardTitle>
          <CardDescription>
            {formatDateString(selectedDateString, {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            })}
          </CardDescription>
        </View>
        <Button variant="outline" className="aspect-square" onPress={handleEdit}>
          <Icon as={PenSquareIcon} className="size-5" />
        </Button>
      </CardHeader>
      <CardContent className="gap-4">
        <View className="flex-row gap-2">
          <Text className="font-bold">Rating:</Text>
          <Text style={{ color: getMoodColor(selectedMood.dayRating) }}>
            {selectedMood.dayRating}/10
          </Text>
        </View>
        {selectedMood.dayDetails && (
          <View className="flex-row gap-2">
            <Text className="font-bold">Details:</Text>
            <Text>{selectedMood.dayDetails}</Text>
          </View>
        )}
      </CardContent>
    </Card>
  );
}
