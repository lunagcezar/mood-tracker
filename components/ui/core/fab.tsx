import { TouchableOpacity, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cn } from '@/lib/utils';
import { Icon } from './icon';
import { LucideIcon } from 'lucide-react-native';

interface FABProps {
  onPress: () => void;
  icon?: LucideIcon;
  label?: string;
  className?: string;
}

export default function FAB({ onPress, icon, label, className }: FABProps) {
  const insets = useSafeAreaInsets();
  return (
    <TouchableOpacity
      className={cn(
        'absolute flex-row items-center justify-center gap-2 rounded-full bg-neutral-800 p-4 shadow-lg dark:bg-neutral-100',
        className
      )}
      style={{ bottom: 24 + insets.bottom, right: 24 + insets.right }}
      onPress={onPress}
      activeOpacity={0.5}
      accessibilityRole="button">
      {label ? (
        <Text className="text-base font-bold text-white dark:text-neutral-900">{label}</Text>
      ) : null}
      {icon ? <Icon as={icon} className="size-6 text-white dark:text-neutral-900" /> : null}
    </TouchableOpacity>
  );
}
