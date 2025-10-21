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
import { Link, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { EllipsisVerticalIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { Text } from '@/components/ui/core/text';
import { Icon } from '@/components/ui/core/icon';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={() => ({
          headerRight: () => <HeaderButtons />,
        })}
      />
      <PortalHost />
    </ThemeProvider>
  );
}

function HeaderButtons() {
  const { toggleColorScheme } = useColorScheme();

  return (
    <DropdownMenu className="web:mr-4">
      <DropdownMenuTrigger>
        <Icon as={EllipsisVerticalIcon} className="size-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-5">
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <Text>Settings</Text>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild onPressIn={toggleColorScheme}>
          <Text>Color scheme</Text>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
