import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Button } from './button';

type Palette = {
  primary: string;
  accent: string;
  surface: string;
  foreground: string;
};

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation('common');

  const isDark = theme === 'dark';
  const [palette, setPalette] = React.useState<Palette>({
    primary: '',
    accent: '',
    surface: '',
    foreground: '',
  });

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const frame = window.requestAnimationFrame(() => {
      const root = document.documentElement;
      const computed = window.getComputedStyle(root);
      const readVar = (token: string) => computed.getPropertyValue(token).trim();

      setPalette({
        primary: readVar('--color-primary'),
        accent: readVar('--color-accent'),
        surface: readVar('--color-surface'),
        foreground: readVar('--color-text-strong'),
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [theme]);

  const buttonStyle = React.useMemo(() => {
    const style: React.CSSProperties & Record<string, string> = {};

    if (palette.surface) {
      style.backgroundColor = `hsl(${palette.surface})`;
    }

    if (palette.foreground) {
      style.color = `hsl(${palette.foreground})`;
    }

    if (palette.primary && palette.accent) {
      style['--toggle-gradient'] = `linear-gradient(135deg, hsl(${palette.primary}), hsl(${palette.accent}))`;
    }

    return style;
  }, [palette]);

  const primarySwatch = palette.primary ? { backgroundColor: `hsl(${palette.primary})` } : undefined;
  const accentSwatch = palette.accent ? { backgroundColor: `hsl(${palette.accent})` } : undefined;

  return (
    <Button
      variant="chromatic"
      onClick={toggleTheme}
      aria-label={isDark ? t('light') : t('dark')}
      className="group h-10 rounded-full px-3"
      style={buttonStyle}
    >
      <span className="relative z-10 flex items-center gap-3">
        <span className="flex items-center gap-1 rounded-full bg-black/5 px-1.5 py-1 text-[0] shadow-inner backdrop-blur-sm dark:bg-white/10">
          <span className="h-2.5 w-2.5 rounded-full" style={primarySwatch} />
          <span className="h-2.5 w-2.5 rounded-full" style={accentSwatch} />
        </span>
        <span className="flex items-center gap-2 text-sm font-semibold tracking-wide">
          <span className="uppercase opacity-90 transition-opacity duration-300 group-hover:opacity-100">
            {isDark ? t('light') : t('dark')}
          </span>
          <span className="grid h-7 w-7 place-items-center rounded-full bg-white/70 text-text-strong shadow-inner backdrop-blur-md dark:bg-black/40 dark:text-text-inverse">
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </span>
        </span>
      </span>
    </Button>
  );
};

export default ThemeToggle;
