import { ScreenContainer } from '@/components/ui/core/screen-container';
import { Text } from '@/components/ui/core/text';
import { getMoodColor } from '@/constants/mood';
import { Stack } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';
import { useCalendarIndex } from '@/hooks/use-calendar-index';
import { Calendar } from '@/components/shared/calendar';
import { formatDateString } from '@/lib/date';

const SCREEN_OPTIONS = {
  title: 'Statistics',
};

export default function StatsIndex() {
  const {
    moodByDate,
    calendarDays,
    changeMonth,
    monthName,
    currentYear,
    selectedDateString,
    selectDate,
    selectedMood,
  } = useCalendarIndex();

  const enhancedMoodByDate = React.useMemo(() => {
    const enhanced: Record<string, any> = {};
    Object.entries(moodByDate).forEach(([date, mood]) => {
      enhanced[date] = {
        ...mood,
        renderProps: {
          showRating: true,
          backgroundColor: getMoodColor(mood.dayRating),
        },
      };
    });
    return enhanced;
  }, [moodByDate]);

  return (
    <ScreenContainer>
      <Stack.Screen options={SCREEN_OPTIONS} />

      <Calendar
        calendarDays={calendarDays}
        monthName={monthName}
        currentYear={currentYear}
        moodByDate={enhancedMoodByDate}
        selectedDate={selectedDateString}
        onDateSelect={selectDate}
        onMonthChange={changeMonth}
        showRating
      />

      {selectedMood && selectedDateString && (
        <View className="rounded-lg border border-gray-300 p-4">
          <Text className="mb-2 text-lg font-bold">
            {formatDateString(selectedDateString, {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
          <View className="flex-row items-center gap-2">
            <Text className="text-base">Rating:</Text>
            <Text className="text-xl font-bold">{selectedMood.dayRating}/10</Text>
          </View>
          {selectedMood.dayDetails && (
            <View className="mt-3">
              <Text className="mb-1 text-sm font-semibold text-gray-600">Notes:</Text>
              <Text className="text-base">{selectedMood.dayDetails}</Text>
            </View>
          )}
        </View>
      )}
    </ScreenContainer>
  );
}
