import { ScreenContainer } from '@/components/ui/core/screen-container';
import { Text } from '@/components/ui/core/text';
import { getMoodColor } from '@/constants/mood';
import { Stack } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';
import { useCalendarIndex } from '@/hooks/use-calendar-index';
import { Calendar } from '@/components/shared/calendar';

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
    selectedDate,
    selectDate,
    selectedMood,
  } = useCalendarIndex();

  // Enhanced render function with mood colors and ratings
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
        selectedDate={selectedDate}
        onDateSelect={selectDate}
        onMonthChange={changeMonth}
        showMoodDetails={true}
      />

      {selectedMood && selectedDate && (
        <View className="rounded-lg border border-gray-300 p-4">
          <Text className="mb-2 text-lg font-bold">
            {(() => {
              // Parse the date string correctly to avoid timezone issues
              const [year, month, day] = selectedDate.split('-').map(Number);
              const date = new Date(year, month - 1, day);
              return date.toLocaleDateString('default', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });
            })()}
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
