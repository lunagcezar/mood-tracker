import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { cn } from '@/lib/utils';

interface FABProps {
  onPress: () => void;
  icon?: React.ReactNode;
  label?: string;
  className?: string;
}

function FAB({ onPress, icon, label, className }: FABProps) {
  return (
    <TouchableOpacity
      className={cn(
        'absolute bottom-8 right-6 items-center justify-center rounded-full bg-neutral-800 p-4 shadow-lg dark:bg-neutral-100',
        className
      )}
      onPress={onPress}
      accessibilityRole="button">
      {icon ? <View>{icon}</View> : null}
      {label ? (
        <Text className="text-base font-bold text-white dark:text-neutral-900">{label}</Text>
      ) : null}
    </TouchableOpacity>
  );
}

export default FAB;
