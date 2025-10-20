import { cn } from '../../../lib/utils';
import { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

type ScreenContainerProps = PropsWithChildren<{
  className?: string;
}>;

export function ScreenContainer({ children, className }: ScreenContainerProps) {
  return (
    <SafeAreaView className={cn('flex h-full w-full flex-1 gap-4 p-4', className)}>
      {children}
    </SafeAreaView>
  );
}
