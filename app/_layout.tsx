import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { Link, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MoonStarIcon, PlusIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
      <SafeAreaProvider>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Stack
          screenOptions={() => ({
            headerTransparent: true,
            headerRight: () => <HeaderButtons />,
            contentStyle: { alignItems: 'center' },
          })}
        />
        <PortalHost />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const TOGGLE_COLOR_SCHEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

function HeaderButtons() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="flex flex-row gap-2">
      <Link href="/create" asChild>
        <Button size="icon" variant="ghost" className="rounded-full">
          <Icon as={PlusIcon} className="size-5" />
        </Button>
      </Link>

      <Button onPressIn={toggleColorScheme} size="icon" variant="ghost" className="rounded-full">
        <Icon as={TOGGLE_COLOR_SCHEME_ICONS[colorScheme ?? 'light']} className="size-5" />
      </Button>
    </View>
  );
}
