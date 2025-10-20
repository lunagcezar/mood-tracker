import { View } from 'react-native';
import { cn } from '../../lib/utils';
import { PropsWithChildren } from 'react';

type ScreenContainerProps = PropsWithChildren<{
  className?: string;
}>;

export function ScreenContainer({ children, className }: ScreenContainerProps) {
  return <View className={cn('flex h-full w-full gap-4 p-4', className)}>{children}</View>;
}
