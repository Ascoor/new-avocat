import React, { useEffect, useState } from 'react';

import { Moon, Sun, Globe, ChevronDown, User, LogOut, Menu, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useSidebar } from '@/contexts/SidebarContext';
import BrandLogo from '@/components/common/BrandLogo';
import { cn } from '@/lib/utils';

interface HeaderProps {
  title?: string;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, className }) => {
  const { theme, toggleTheme } = useTheme();

  const { language, setLanguage, t, isRTL } = useLanguage();
  const { user, logout } = useAuth();
  const { toggleMobile, toggleCollapsed, isCollapsed, isMobileOpen } = useSidebar();
  const [isScrolled, setIsScrolled] = useState(false);

  const headerSurface = { '--glass-surface': 'var(--gradient-header)' } as React.CSSProperties;

  const iconButtonClass = cn(
    'rounded-full border border-[hsl(var(--header-border)/0.6)] transition-all duration-300 shadow-[0_12px_32px_hsl(var(--header-ring)/0.12)]',
    'bg-header-button text-header-button-foreground hover:bg-header-button-hover hover:text-header-button-hover-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-header-ring focus-visible:ring-offset-2 focus-visible:ring-offset-header-ring-offset'
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 6);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
     <header className={cn(
      'sticky top-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur',
      className
    )}>
      <div className="flex h-full items-center justify-between px-4 gap-4">
        {/* Left side */}
        <div className={cn(
          'flex items-center gap-3',
          isRTL ? 'flex-row-reverse' : 'flex-row'
        )}>
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobile}
            className="md:hidden h-9 w-9"
            aria-label={t('common.menu')}
          >
            <Menu className="h-4 w-4" />
          </Button>

          {/* Desktop logo - hidden on mobile */}
          <div className="hidden md:block">
            <BrandLogo variant="full" className="h-8" />
          </div>

          {/* Page title */}
          {title && (
            <h1 className="hidden sm:block text-lg font-semibold text-foreground">
              {title}
            </h1>
          )}
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full hover:bg-accent/20 glow-hover"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {/* Language Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent/20 glow-hover">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass border-glass-border">
              <DropdownMenuItem
                onClick={() => setLanguage('ar')}
                className={language === 'ar' ? 'bg-accent/20' : ''}
              >
                العربية
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage('en')}
                className={language === 'en' ? 'bg-accent/20' : ''}
              >
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 rtl:space-x-reverse rounded-full hover:bg-accent/20 glow-hover">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-gradient-primary text-white">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block font-medium">{user.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass border-glass-border w-56">
                <DropdownMenuItem className="flex items-center">
                  <User className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                  {t('auth.profile')}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-glass-border" />
                <DropdownMenuItem onClick={logout} className="flex items-center text-destructive">
                  <LogOut className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                  {t('auth.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};
