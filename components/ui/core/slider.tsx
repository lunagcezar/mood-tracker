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
    activeStepColor?: string;
  };

export function Slider({
  label,
  value,
  className,
  hasValue = false,
  activeStepColor,
  variant,
  size,
  ...props
}: SliderProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const min = typeof props.minimumValue === 'number' ? props.minimumValue : 0;
  const max = typeof props.maximumValue === 'number' ? props.maximumValue : 1;

  const step = typeof props.step === 'number' && props.step > 0 ? props.step : undefined;
  const steps = step ? Math.floor((max - min) / step) + 1 : 0;
  const activeIndex = step ? Math.round(((value ?? min) - min) / step) : 0;

  return (
    <View className="gap-4">
      {label && <Text className="text-base text-neutral-800 dark:text-neutral-200">{label}</Text>}
      <View className="relative">
        <CommunitySlider
          value={value}
          className={cn(sliderVariants({ variant, size }), className)}
          thumbTintColor={props.thumbTintColor || (isDark ? '#ffffff' : '#000000')}
          minimumTrackTintColor={props.minimumTrackTintColor || (isDark ? '#ffffff' : '#000000')}
          maximumTrackTintColor={props.maximumTrackTintColor || (isDark ? '#d4d4d4' : '#a3a3a3')}
          {...props}
        />
        {step && steps > 1 && (
          <View
            className="absolute inset-x-0 top-1/2 z-50 mx-[0.95rem] -translate-y-1/2 flex-row items-center justify-between rounded-full"
            pointerEvents="none">
            {Array.from({ length: steps }).map((_, i) => (
              <View
                key={i}
                className="z-50 h-2 w-2 rounded-full opacity-100"
                style={{
                  backgroundColor:
                    i === activeIndex
                      ? activeStepColor || (isDark ? '#fff' : '#000')
                      : isDark
                        ? '#525252'
                        : '#d4d4d4',
                }}
              />
            ))}
          </View>
        )}
      </View>
      {hasValue && <Text className="text-sm text-neutral-500 dark:text-neutral-400">{value}</Text>}
    </View>
  );
}
