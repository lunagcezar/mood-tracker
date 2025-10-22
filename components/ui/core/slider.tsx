import React from 'react';
import { View, Text, useColorScheme } from 'react-native';
import CommunitySlider from '@react-native-community/slider';
import { cn } from '../../../lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const sliderVariants = cva(cn('w-full'), {
  variants: {
    variant: {
      default: '',
      primary: 'text-blue-500',
      secondary: 'text-gray-500',
      success: 'text-green-500',
      danger: 'text-red-500',
    },
    size: {
      default: 'h-10',
      sm: '',
      lg: '',
      icon: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export type SliderProps = React.ComponentProps<typeof CommunitySlider> &
  VariantProps<typeof sliderVariants> & {
    label?: string;
    className?: string;
    hasValue?: boolean;
  };

export function Slider({
  label,
  value,
  className,
  hasValue = false,
  variant,
  size,
  ...props
}: SliderProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <View className="gap-4">
      {label && <Text className="text-base text-neutral-800 dark:text-neutral-200">{label}</Text>}
      <CommunitySlider
        value={value}
        className={cn(sliderVariants({ variant, size }), className)}
        thumbTintColor={props.thumbTintColor || (isDark ? '#60a5fa' : '#2563eb')}
        minimumTrackTintColor={props.minimumTrackTintColor || (isDark ? '#60a5fa' : '#2563eb')}
        maximumTrackTintColor={props.maximumTrackTintColor || (isDark ? '#374151' : '#d1d5db')}
        {...props}
      />
      {hasValue && <Text className="text-sm text-neutral-500 dark:text-neutral-400">{value}</Text>}
    </View>
  );
}
