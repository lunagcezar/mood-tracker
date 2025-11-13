import { cn } from '../../../lib/utils';
import { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

type ScreenContainerProps = PropsWithChildren<{
  className?: string;
}>;

export function ScreenContainer({ children, className }: ScreenContainerProps) {
  return (
    <SafeAreaProvider>
      <SafeAreaView className={cn('flex h-full w-full flex-1 gap-4 p-4 web:my-4', className)}>
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
