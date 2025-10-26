import { Slider } from '@/components/ui/core/slider';
import * as React from 'react';
import { Textarea } from '@/components/ui/core/textarea';
import { Button } from '@/components/ui/core/button';
import { Text } from '@/components/ui/core/text';
import { useColorScheme, View } from 'react-native';
import { getMoodColor, getMoodLabel, MAX_MOOD_RATING, MIN_MOOD_RATING } from '@/constants/mood';
import { CalendarIcon, CheckIcon } from 'lucide-react-native';
import { useCalendarIndex } from '@/hooks/use-calendar-index';
import { Calendar } from '@/components/shared/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/core/dialog';
import { Icon } from '@/components/ui/core/icon';
import { formatDateString } from '@/lib/date';
import { DateString } from '@/types/date';
import FAB from '@/components/ui/core/fab';
import { useMain } from '@/hooks/use-main';

type MoodEditorProps = {
  mode?: 'create' | 'edit';
};

export default function MoodEditor({ mode = 'create' }: MoodEditorProps) {
  const {
    dayRatingValue,
    setDayRatingValue,
    dayDetailsValue,
    setDayDetailsValue,
    selectedDateString,
    setSelectedDateString,
    saveEntry,
    editEntry,
  } = useMain();

  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const { moodByDate, calendarDays, changeMonth, monthName, currentYear } = useCalendarIndex();

  const colorScheme = useColorScheme();

  const DBOperation = () => (mode === 'create' ? saveEntry : editEntry);

  const handleDateSelect = (dateString: DateString | null) => {
    if (dateString) {
      setSelectedDateString(dateString);
      setShowDatePicker(false);
    }
  };

  return (
    <View className="h-full gap-8">
      <Dialog onOpenChange={setShowDatePicker} open={showDatePicker}>
        <DialogTrigger asChild>
          <Button className="gap-4" variant="outline" size="fluid">
            <Icon as={CalendarIcon} className="size-6" />
            <Text className="text-lg font-semibold">
              {formatDateString(selectedDateString, {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </Text>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <Text>Choose a date</Text>
          </DialogHeader>
          <Calendar
            calendarDays={calendarDays}
            monthName={monthName}
            currentYear={currentYear}
            moodByDate={moodByDate}
            selectedDate={selectedDateString}
            onDateSelect={handleDateSelect}
            onMonthChange={changeMonth}
            disableFutureDates={true}
          />
        </DialogContent>
      </Dialog>
      <Text variant="h3" className="text-center">
        How are you feeling today?
      </Text>
      <View className="gap-4">
        <Text variant="h1" className="text-center">
          {dayRatingValue}
        </Text>
        <Text variant="h4" className="text-center">
          {getMoodLabel(dayRatingValue)}
        </Text>
      </View>

      <Slider
        value={dayRatingValue}
        onValueChange={setDayRatingValue}
        maximumValue={MAX_MOOD_RATING}
        minimumValue={MIN_MOOD_RATING}
        step={1}
        thumbTintColor={getMoodColor(dayRatingValue, colorScheme)}
        minimumTrackTintColor={getMoodColor(dayRatingValue, colorScheme)}
        activeStepColor={getMoodColor(dayRatingValue, colorScheme)}
      />
      <Textarea
        placeholder="Type details about your day"
        value={dayDetailsValue}
        onChangeText={setDayDetailsValue}
      />
      <FAB onPress={DBOperation} icon={CheckIcon} />
    </View>
  );
}
