import { Slider } from '@/components/ui/core/slider';
import * as React from 'react';
import { Textarea } from '@/components/ui/core/textarea';
import { Button } from '@/components/ui/core/button';
import { Text } from '@/components/ui/core/text';
import { useColorScheme, View } from 'react-native';
import { getMoodColor, getMoodLabel, MAX_MOOD_RATING, MIN_MOOD_RATING } from '@/constants/mood';
import { CalendarIcon, CheckIcon } from 'lucide-react-native';
import { useCalendarIndex } from '@/hooks/use-calendar-index';
import { Calendar } from '@/components/ui/shared/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/core/dialog';
import { Icon } from '@/components/ui/core/icon';
import { formatDateString } from '@/lib/date';
import { DateString } from '@/types/date';
import FAB from '@/components/ui/core/fab';
import { useMoodEditor } from '@/hooks/use-mood-editor';

type MoodEditorProps = {
  mode?: 'create' | 'edit';
  entryId?: string;
};

export default function MoodEditor({ mode = 'create', entryId }: MoodEditorProps) {
  const {
    dayRating,
    setDayRating,
    dayDetails,
    setDayDetails,
    selectedDateString,
    setSelectedDateString,
    handleSubmit,
  } = useMoodEditor({ mode, entryId });

  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const { moodByDate, calendarDays, changeMonth, monthName, currentYear } = useCalendarIndex();

  const colorScheme = useColorScheme();

  const handleDateSelect = (dateString: DateString | null) => {
    if (dateString) {
      setSelectedDateString(dateString);
      setShowDatePicker(false);
    }
  };

  return (
    <>
      {mode === 'create' && (
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
              selectedDateString={selectedDateString}
              onDateSelect={handleDateSelect}
              onMonthChange={changeMonth}
              disableFutureDates
              disableDatesWithEntry
            />
          </DialogContent>
        </Dialog>
      )}
      <Text variant="h3" className="text-center">
        How are you feeling?
      </Text>
      <View className="gap-4">
        <Text variant="h1" className="text-center">
          {dayRating}
        </Text>
        <Text variant="h4" className="text-center">
          {getMoodLabel(dayRating)}
        </Text>
      </View>

      <Slider
        value={dayRating}
        onValueChange={setDayRating}
        maximumValue={MAX_MOOD_RATING}
        minimumValue={MIN_MOOD_RATING}
        step={1}
        thumbTintColor={getMoodColor(dayRating, colorScheme)}
        minimumTrackTintColor={getMoodColor(dayRating, colorScheme)}
        activeStepColor={getMoodColor(dayRating, colorScheme)}
      />
      <Textarea
        placeholder="Type details about your day"
        value={dayDetails}
        onChangeText={setDayDetails}
      />
      <FAB onPress={handleSubmit} icon={CheckIcon} />
    </>
  );
}
