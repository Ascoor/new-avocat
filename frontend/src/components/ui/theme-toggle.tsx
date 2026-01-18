import { motion, useReducedMotion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

export const themeToggleToneVariantMap = {
  hero: 'outline',
  light: 'outline',
  dark: 'outline',
} as const;

export const themeToggleToneClassMap = {
  hero: 'bg-[hsl(var(--card)/0.2)] text-[hsl(var(--primary-foreground))] border-[hsl(var(--nav-border))]',
  light: 'bg-[hsl(var(--card))] text-[hsl(var(--foreground))] border-[hsl(var(--border))]',
  dark: 'bg-[hsl(var(--card)/0.12)] text-[hsl(var(--foreground))] border-[hsl(var(--border))]',
} as const;

interface ThemeToggleProps {
  tone?: keyof typeof themeToggleToneClassMap;
  className?: string;
}

export const ThemeToggle = ({ tone = 'light', className }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const Icon = theme === 'dark' ? Moon : Sun;

  return (
    <Button
      type="button"
      variant={themeToggleToneVariantMap[tone]}
      size="icon"
      onClick={toggleTheme}
      className={cn(
        'relative overflow-hidden rounded-full border transition-all duration-300',
        themeToggleToneClassMap[tone],
        className,
      )}
    >
      <motion.span
        initial={false}
        animate={reduceMotion ? {} : { rotate: theme === 'dark' ? 0 : 180, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="grid place-items-center"
      >
        <Icon className="h-4 w-4" />
      </motion.span>
    </Button>
  );
};

export default ThemeToggle;
