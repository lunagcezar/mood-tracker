import React from 'react';
import { View, Text } from 'react-native';
import CommunitySlider from '@react-native-community/slider';
import { cn } from '../../lib/utils';
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
      default: '',
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
  };

export function Slider({ label, value, className, variant, size, ...props }: SliderProps) {
  return (
    <View className="w-full items-center py-2">
      {label && (
        <Text className="mb-1 text-base text-neutral-800 dark:text-neutral-200">{label}</Text>
      )}
      <CommunitySlider
        value={value}
        className={cn(sliderVariants({ variant, size }), className)}
        {...props}
      />
      <Text className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{value}</Text>
    </View>
  );
}
