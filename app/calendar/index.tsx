import { ScreenContainer } from '@/components/ui/core/screen-container';
import { getMoodColor } from '@/constants/mood';
import { Stack } from 'expo-router';
import * as React from 'react';
import { ScrollView } from 'react-native';
import { useCalendarIndex } from '@/hooks/use-calendar-index';
import { Calendar } from '@/components/ui/shared/calendar';
import { MoodDetailsCard } from '@/components/ui/shared/mood-details-card';

const SCREEN_OPTIONS = {
  title: 'Calendar',
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
    <ScreenContainer className="gap-8">
      <Stack.Screen options={SCREEN_OPTIONS} />

      <Calendar
        calendarDays={calendarDays}
        monthName={monthName}
        currentYear={currentYear}
        moodByDate={enhancedMoodByDate}
        selectedDateString={selectedDateString}
        onDateSelect={selectDate}
        onMonthChange={changeMonth}
        showRating
      />
      <ScrollView className="gap-4">
        {selectedMood && selectedDateString && (
          <MoodDetailsCard selectedMood={selectedMood} selectedDateString={selectedDateString} />
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
