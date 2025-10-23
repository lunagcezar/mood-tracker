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
  showMoodDetails?: boolean;
  disableFutureDates?: boolean;
};

export function Calendar({
  calendarDays,
  monthName,
  currentYear,
  moodByDate,
  selectedDate,
  onDateSelect,
  onMonthChange,
  showMoodDetails = false,
  disableFutureDates = false,
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
          showRating={showMoodDetails && hasEntry}
          rating={mood?.dayRating}
          backgroundColor={showMoodDetails && mood ? mood.renderProps?.backgroundColor : undefined}
          disableFutureDates={disableFutureDates}
        />
      );
    },
    [moodByDate, selectedDate, onDateSelect, showMoodDetails, disableFutureDates]
  );

  return (
    <View>
      {/* Month Navigation */}
      <View className="mb-4 flex-row items-center justify-between">
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
      <View className="mb-2 flex-row justify-between px-0.5">
        {WEEKDAYS.map((d) => (
          <Text key={d} className="flex-1 text-center text-xs font-bold text-gray-600">
            {d}
          </Text>
        ))}
      </View>

      {/* Calendar Grid */}
      <FlatList
        data={calendarDays}
        numColumns={7}
        keyExtractor={(_, idx) => `day-${idx}`}
        renderItem={renderDay}
        scrollEnabled={false}
      />
    </View>
  );
}
