import { Menu, Moon, SunMedium, Languages } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface TopbarV2Props {
  onToggleSidebar: () => void;
  onToggleMobile: () => void;
  isMobile: boolean;
}

const TopbarV2 = ({ onToggleSidebar, onToggleMobile, isMobile }: TopbarV2Props) => {
  const { isDark, toggleTheme } = useTheme();
  const { toggleLanguage, isRTL } = useLanguage();

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur md:h-16">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={isMobile ? onToggleMobile : onToggleSidebar}
          aria-label="Toggle navigation"
        >
          <Menu className={isRTL ? 'rotate-180' : ''} />
        </Button>
        <div>
          <p className="text-sm font-semibold text-foreground">Dashboard v2</p>
          <p className="text-xs text-muted-foreground">Search hub & workspace</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleLanguage}
          aria-label="Toggle language direction"
        >
          <Languages className={isRTL ? 'rotate-180' : ''} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDark ? <SunMedium /> : <Moon />}
        </Button>
      </div>
    </header>
  );
};

export default TopbarV2;
