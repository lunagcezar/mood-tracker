import { Slider } from '@/components/ui/core/slider';
import { Stack } from 'expo-router';
import * as React from 'react';
import { ScreenContainer } from '@/components/ui/core/screen-container';
import { Textarea } from '@/components/ui/core/textarea';
import { useMainCreate } from '@/hooks/use-main-create';
import { Button } from '@/components/ui/core/button';
import { Text } from '@/components/ui/core/text';
import { useColorScheme, View } from 'react-native';
import { getMoodColor, getMoodLabel, MAX_MOOD_RATING, MIN_MOOD_RATING } from '@/constants/mood';
import { CalendarIcon } from 'lucide-react-native';
import { useCalendarIndex } from '@/hooks/use-calendar-index';
import { Calendar } from '@/components/shared/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/core/dialog';
import { Icon } from '@/components/ui/core/icon';

const SCREEN_OPTIONS = {
  title: 'Create a new Entry',
};

export default function MainCreate() {
  const {
    dayRatingValue,
    setDayRatingValue,
    dayDetailsValue,
    setDayDetailsValue,
    selectedDate,
    setSelectedDate,
    saveEntry,
    isSaving,
  } = useMainCreate();

  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const { moodByDate, calendarDays, changeMonth, monthName, currentYear } = useCalendarIndex();

  const colorScheme = useColorScheme();

  const handleDateSelect = (dateString: string | null) => {
    if (dateString) {
      const [year, month, day] = dateString.split('-').map(Number);
      setSelectedDate(new Date(year, month - 1, day));
      setShowDatePicker(false);
    }
  };

  return (
    <ScreenContainer className="gap-8">
      <Stack.Screen options={SCREEN_OPTIONS} />
      <Dialog onOpenChange={setShowDatePicker} open={showDatePicker}>
        <DialogTrigger asChild>
          <Button className="gap-4" variant="outline" size="fluid">
            <Icon as={CalendarIcon} className="size-6" />
            <Text className="text-lg font-semibold">
              {selectedDate.toLocaleDateString('default', {
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
            selectedDate={selectedDate.toISOString().slice(0, 10)}
            onDateSelect={handleDateSelect}
            onMonthChange={changeMonth}
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
      <Button onPress={saveEntry} disabled={isSaving}>
        <Text>{isSaving ? 'Saving...' : 'Save'}</Text>
      </Button>
    </ScreenContainer>
  );
}
