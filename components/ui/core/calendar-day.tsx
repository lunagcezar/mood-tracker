import { Text } from '@/components/ui/core/text';
import { CalendarDay } from '@/types/date';
import { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';

interface CalendarDayItemProps {
  item: CalendarDay;
  onPress?: (dateString: string) => void;
  isSelected?: boolean;
  hasEntry?: boolean;
  showRating?: boolean;
  rating?: number;
  backgroundColor?: string;
}

export const CalendarDayItem = memo<CalendarDayItemProps>(
  ({ item, onPress, isSelected, hasEntry, showRating, rating, backgroundColor }) => {
    if (item.day === null) {
      return <View className="m-0.5 aspect-square flex-1" />;
    }

    const handlePress = () => {
      if (onPress && item.dateString) {
        onPress(item.dateString);
      }
    };

    const Wrapper = onPress ? TouchableOpacity : View;

    return (
      <Wrapper
        onPress={onPress ? handlePress : undefined}
        className={`m-0.5 aspect-square flex-1 items-center justify-center rounded-lg border ${
          isSelected
            ? 'border-2 border-blue-500 bg-blue-100'
            : hasEntry
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300 bg-transparent'
        }`}
        style={{ backgroundColor: backgroundColor || undefined }}>
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
