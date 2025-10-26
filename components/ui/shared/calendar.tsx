import * as React from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { Icon } from '@/components/ui/core/icon';
import { Text } from '@/components/ui/core/text';
import { ChevronLeftCircleIcon, ChevronRightCircleIcon } from 'lucide-react-native';
import { WEEKDAYS } from '@/constants/date';
import { CalendarDay, DateString } from '@/types/date';
import { CalendarDayItem } from '@/components/ui/core/calendar-day';

type CalendarProps = {
  calendarDays: CalendarDay[];
  monthName: string;
  currentYear: number;
  moodByDate: Record<string, any>;
  selectedDate?: string | null;
  onDateSelect?: (dateString: DateString) => void;
  onMonthChange: (delta: number) => void;
  showRating?: boolean;
  disableFutureDates?: boolean;
  disableDatesWithEntry?: boolean;
};

export function Calendar({
  calendarDays,
  monthName,
  currentYear,
  moodByDate,
  selectedDate,
  onDateSelect,
  onMonthChange,
  showRating = false,
  disableFutureDates = false,
  disableDatesWithEntry = false,
}: CalendarProps) {
  const renderDay = React.useCallback(
    ({ item }: { item: CalendarDay }) => {
      const mood = item.dateString ? moodByDate[item.dateString] : undefined;
      const hasEntry = !!mood;
      const isSelected = item.dateString === selectedDate;

      return (
        <CalendarDayItem
          item={item}
          onPress={onDateSelect}
          isSelected={isSelected}
          hasEntry={hasEntry}
          showRating={showRating}
          rating={mood?.dayRating}
          moodColor={showRating && mood ? mood.renderProps?.backgroundColor : undefined}
          disableFutureDates={disableFutureDates}
          disableDatesWithEntry={disableDatesWithEntry}
        />
      );
    },
    [moodByDate, selectedDate, onDateSelect, showRating, disableFutureDates]
  );

  let daysToRender = calendarDays;

  if (calendarDays.length >= 7) {
    const lastWeek = calendarDays.slice(-7);
    if (lastWeek.every((day) => day.day === null)) {
      daysToRender = calendarDays.slice(0, -7);
    }
  }

  return (
    <View>
      {/* Month Navigation */}
      <View className="flex-row items-center justify-between">
        <TouchableOpacity onPress={() => onMonthChange(-1)} className="p-2">
          <Icon as={ChevronLeftCircleIcon} className="size-8" />
        </TouchableOpacity>
        <View className="flex-row gap-2">
          <Text className="text-xl font-bold">{monthName}</Text>
          <Text className="text-xl font-bold">{currentYear}</Text>
        </View>
        <TouchableOpacity onPress={() => onMonthChange(1)} className="p-2">
          <Icon as={ChevronRightCircleIcon} className="size-8" />
        </TouchableOpacity>
      </View>

      {/* Weekday Headers */}
      <View className="my-6 flex-row">
        {WEEKDAYS.map((d) => (
          <View key={d} className="w-1/7">
            <Text className="text-center text-sm font-bold text-neutral-500">{d}</Text>
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
      <FlatList
        data={daysToRender}
        numColumns={7}
        keyExtractor={(_, idx) => `day-${idx}`}
        renderItem={renderDay}
        scrollEnabled={false}
      />
    </View>
  );
}
