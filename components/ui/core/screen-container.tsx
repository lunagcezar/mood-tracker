import { cn } from '../../../lib/utils';
import { PropsWithChildren } from 'react';
import { View } from 'react-native';

type ScreenContainerProps = PropsWithChildren<{
  className?: string;
}>;

export function ScreenContainer({ children, className }: ScreenContainerProps) {
  return (
    <View className={cn('flex h-full w-full flex-1 gap-4 px-4 py-8', className)}>{children}</View>
  );
}
