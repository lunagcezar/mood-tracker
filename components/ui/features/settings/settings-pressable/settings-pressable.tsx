import { Text } from '@/components/ui/core/text';
import { ChevronRight } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, View } from 'react-native';

type SettingPressableProps = {
  label: string;
  value: string;
  onPress: () => void;
};

export function SettingsPressable({ label, value, onPress }: SettingPressableProps) {
  return (
    <Pressable
      className="flex-row items-center justify-between rounded-lg border border-border bg-card p-4 active:opacity-70"
      onPress={onPress}>
      <View className="flex-1">
        <Text className="text-base font-medium text-foreground">{label}</Text>
        <Text className="text-sm text-muted-foreground">{value}</Text>
      </View>
      <ChevronRight size={20} className="text-muted-foreground" />
    </Pressable>
  );
}
