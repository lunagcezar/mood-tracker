import { Text } from '@/components/ui/core/text';
import { CalendarDay, DateString } from '@/types/date';
import { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { getTodayString } from '@/lib/date';
import { cn } from '@/lib/utils';

interface CalendarDayItemProps {
  item: CalendarDay;
  onPress?: (dateString: DateString) => void;
  isSelected?: boolean;
  hasEntry?: boolean;
  showRating?: boolean;
  rating?: number;
  moodColor?: string;
  disableFutureDates?: boolean;
}

export const CalendarDayItem = memo<CalendarDayItemProps>(
  ({ item, onPress, isSelected, hasEntry, showRating, rating, moodColor, disableFutureDates }) => {
    if (item.day === null) {
      return <View className="w-1/7 aspect-square" />;
    }

    const isFutureDate =
      disableFutureDates && item.dateString && item.dateString > getTodayString();

    const handlePress = () => {
      if (onPress && item.dateString && !isFutureDate) {
        onPress(item.dateString);
      }
    };

    const Wrapper = onPress && !isFutureDate ? TouchableOpacity : View;

    return (
      <Wrapper
        onPress={onPress && !isFutureDate ? handlePress : undefined}
        className={cn(
          'w-1/7 aspect-square items-center justify-center gap-0.5 bg-transparent',
          isSelected && 'border-2 border-blue-500'
        )}
        style={isFutureDate && { opacity: 0.3 }}>
        <Text className={`text-sm font-bold ${hasEntry && !moodColor ? 'text-red-600' : ''}`}>
          {item.day}
        </Text>
        {showRating ? (
          typeof rating !== 'undefined' ? (
            <Text
              style={{
                color: moodColor,
              }}
              className="text-xs font-bold text-black">
              {rating}/10
            </Text>
          ) : (
            <Text className="text-xs opacity-50">-</Text>
          )
        ) : null}
      </Wrapper>
    );
  }
);

CalendarDayItem.displayName = 'CalendarDayItem';
