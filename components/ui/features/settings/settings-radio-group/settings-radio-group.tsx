import { RadioGroup, RadioGroupItem } from '@/components/ui/core/radio-group';
import { Text } from '@/components/ui/core/text';
import { SettingsOption } from '@/types/settings';
import * as React from 'react';
import { View } from 'react-native';

type SettingRadioGroupProps<T extends string> = {
  value: T;
  options: SettingsOption<T>[];
  onValueChange: (value: T) => void;
};

export function SettingsRadioGroup<T extends string>({
  value,
  options,
  onValueChange,
}: SettingRadioGroupProps<T>) {
  return (
    <RadioGroup value={value} onValueChange={(val) => onValueChange(val as T)}>
      {options.map((option) => {
        const labelId = `${option.value}-label`;
        return (
          <View key={option.value} className="flex-row items-center gap-3">
            <RadioGroupItem value={option.value} aria-labelledby={labelId} />
            <Text nativeID={labelId} onPress={() => onValueChange(option.value)}>
              {option.label}
            </Text>
          </View>
        );
      })}
    </RadioGroup>
  );
}
