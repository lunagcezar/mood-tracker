import { TouchableOpacity, Text } from 'react-native';
import { cn } from '@/lib/utils';
import { Icon } from './icon';
import { LucideIcon } from 'lucide-react-native';

interface FABProps {
  onPress: () => void;
  icon?: LucideIcon;
  label?: string;
  className?: string;
}

function FAB({ onPress, icon, label, className }: FABProps) {
  return (
    <TouchableOpacity
      className={cn(
        'absolute bottom-8 right-6 items-center justify-center rounded-full bg-neutral-800 p-4 text-white shadow-lg dark:bg-neutral-100 dark:text-neutral-900',
        className
      )}
      onPress={onPress}
      accessibilityRole="button">
      {icon ? <Icon as={icon} /> : null}
      {label ? <Text className="text-base font-bold">{label}</Text> : null}
    </TouchableOpacity>
  );
}

export default FAB;
