import { Text } from '@/components/ui/core/text';
import { CalendarDay, DateString } from '@/types/date';
import { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { getTodayString } from '@/lib/date';

interface CalendarDayItemProps {
  item: CalendarDay;
  onPress?: (dateString: DateString) => void;
  isSelected?: boolean;
  hasEntry?: boolean;
  showRating?: boolean;
  rating?: number;
  backgroundColor?: string;
  disableFutureDates?: boolean;
}

export const CalendarDayItem = memo<CalendarDayItemProps>(
  ({
    item,
    onPress,
    isSelected,
    hasEntry,
    showRating,
    rating,
    backgroundColor,
    disableFutureDates,
  }) => {
    if (item.day === null) {
      return <View className="m-0.5 aspect-square flex-1" />;
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
        className={`m-0.5 aspect-square flex-1 items-center justify-center rounded-lg border ${
          isSelected
            ? 'border-2 border-blue-500 bg-blue-100'
            : hasEntry
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300 bg-transparent'
        }`}
        style={[
          { backgroundColor: backgroundColor || undefined },
          isFutureDate && { opacity: 0.3 },
        ].filter(Boolean)}>
        <Text className={`text-sm font-bold ${hasEntry && !backgroundColor ? 'text-red-600' : ''}`}>
          {item.day}
        </Text>
        {showRating && rating !== undefined && (
          <Text className="text-xs font-bold text-black">{rating}</Text>
        )}
      </Wrapper>
    );
  }
);

CalendarDayItem.displayName = 'CalendarDayItem';
