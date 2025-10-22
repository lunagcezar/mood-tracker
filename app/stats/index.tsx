import { ScreenContainer } from '@/components/ui/core/screen-container';
import { Text } from '@/components/ui/core/text';
import { getMoodColor } from '@/constants/mood';
import { WEEKDAYS } from '@/constants/date';
import { CalendarDay } from '@/types/date';
import { Stack } from 'expo-router';
import * as React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { useCalendarIndex } from '@/hooks/use-calendar-index';
import { Icon } from '@/components/ui/core/icon';
import { ChevronLeftCircleIcon, ChevronRightCircleIcon } from 'lucide-react-native';

const SCREEN_OPTIONS = {
  title: 'Statistics',
};

export default function StatsIndex() {
  const { moodByDate, calendarDays, changeMonth, monthName, currentYear } = useCalendarIndex();

  const renderDay = React.useCallback(
    ({ item }: { item: CalendarDay }) => {
      if (item.day === null) {
        return <View className="m-0.5 aspect-square flex-1" />;
      }

      const mood = item.dateString ? moodByDate[item.dateString] : undefined;

      return (
        <View
          className="m-0.5 aspect-square flex-1 items-center justify-center rounded-lg border"
          style={{ backgroundColor: mood && getMoodColor(mood.dayRating) }}>
          <Text className="text-sm font-bold">{item.day}</Text>
          {mood && <Text className="text-xs font-bold text-black">{mood.dayRating}</Text>}
        </View>
      );
    },
    [moodByDate]
  );

  return (
    <ScreenContainer>
      <Stack.Screen options={SCREEN_OPTIONS} />
      <View className="my-4 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => changeMonth(-1)} className="p-2">
          <Icon as={ChevronLeftCircleIcon} className="size-8" />
        </TouchableOpacity>
        <View className="mx-3 flex-row gap-2">
          <Text className="text-xl font-bold">{monthName}</Text>
          <Text className="text-xl font-bold">{currentYear}</Text>
        </View>
        <TouchableOpacity onPress={() => changeMonth(1)} className="p-2">
          <Icon as={ChevronRightCircleIcon} className="size-8" />
        </TouchableOpacity>
      </View>

      <View className="mb-2 flex-row justify-between px-0.5">
        {WEEKDAYS.map((d) => (
          <Text key={d} className="flex-1 text-center text-xs font-bold text-gray-600">
            {d}
          </Text>
        ))}
      </View>

      <FlatList
        data={calendarDays}
        numColumns={7}
        keyExtractor={(_, idx) => `day-${idx}`}
        renderItem={renderDay}
        scrollEnabled={false}
      />
    </ScreenContainer>
  );
}
