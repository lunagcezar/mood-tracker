import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/core/dropdown-menu';
import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Link, Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { CalendarIcon, SettingsIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { Icon } from '@/components/ui/core/icon';
import { QueryClientProvider } from '@tanstack/react-query';
import { QUERY_CLIENT } from '@/constants/tanstack';
import { View } from 'react-native';

export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Stack
          screenOptions={() => ({
            headerRight: () => <HeaderButtons />,
          })}
        />
        <PortalHost />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function HeaderButtons() {
  const { toggleColorScheme } = useColorScheme();

  const pathname = usePathname();

  return (
    <View className="flex-row items-center gap-4 web:mr-4">
      {pathname === '/' && (
        <>
          <Link href="/calendar">
            <Icon as={CalendarIcon} className="size-6 web:size-5" />
          </Link>
          <Link href="/settings">
            <Icon as={SettingsIcon} className="size-6 web:size-5" />
          </Link>
        </>
      )}
      {/*
        <DropdownMenu className="">
          <DropdownMenuTrigger>
            <Icon as={EllipsisVerticalIcon} className="size-6" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-5">
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Text>Settings</Text>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onPress={toggleColorScheme}>
              <Text>Color scheme</Text>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        */}
    </View>
  );
}
