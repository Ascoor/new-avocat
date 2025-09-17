import React from 'react';
import { Moon, Sun, ChevronDown, User, LogOut, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const { language, toggleLanguage, t, isRTL } = useLanguage();
  const { user, logout } = useAuth();
  const { toggleMobile, toggleCollapsed, isCollapsed } = useSidebar();

  const handleSidebarToggle = React.useCallback(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      toggleMobile();
      return;
    }

    toggleCollapsed();
  }, [toggleMobile, toggleCollapsed]);

  const headerSurface = { '--glass-surface': 'var(--gradient-header)' } as React.CSSProperties;
  const isDark = theme === 'dark';
  const iconButtonClass = cn(
    'rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2',
    isDark
      ? 'text-white/85 hover:text-white bg-white/10 hover:bg-white/20 shadow-[0_0_16px_rgba(255,220,155,0.35)] focus-visible:ring-white/50 ring-offset-transparent'
      : 'text-accent hover:text-primary bg-white/70/60 hover:bg-white focus-visible:ring-primary/40 ring-offset-background'
  );
  const interactiveTextClass = isDark ? 'text-white/90' : 'text-accent/90';

  return (
    <header
      className={cn(
        'sticky top-0 z-50 h-16 glass border-b border-border/60 shadow-elegant transition-colors',
        isDark ? 'text-white' : 'text-foreground',
        className
      )}
      style={headerSurface}
    >
      <div className="flex h-full items-center justify-between px-4 gap-4">
        {/* Left side */}
        <div className={cn(
          'flex items-center gap-3',
          isRTL ? 'flex-row-reverse' : 'flex-row'
        )}>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSidebarToggle}
            className={cn('h-9 w-9', iconButtonClass)}
            aria-label={t('common.menu')}
          >
            <Menu className="h-4 w-4 lg:hidden" />
            {isCollapsed ? (
              isRTL ? (
                <ChevronLeft className="hidden h-4 w-4 lg:block" />
              ) : (
                <ChevronRight className="hidden h-4 w-4 lg:block" />
              )
            ) : (
              isRTL ? (
                <ChevronRight className="hidden h-4 w-4 lg:block" />
              ) : (
                <ChevronLeft className="hidden h-4 w-4 lg:block" />
              )
            )}
          </Button>

          {/* Desktop logo - hidden on mobile */}
          <div className="hidden md:block">
            <BrandLogo variant="full" className="h-8" lang={language} dark={isDark} />
          </div>

          {/* Page title */}
          {title && (
            <h1
              className={cn(
                'hidden sm:block text-lg font-semibold transition-colors',
                isDark ? 'text-white/90' : 'text-text-strong'
              )}
            >
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
            className={cn(iconButtonClass, 'glow-hover')}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            className={cn(iconButtonClass, 'glow-hover')}
            aria-label={t('common.toggleLanguage')}
          >
            {language === 'ar' ? 'EN' : 'ع'}
          </Button>

          {/* User Menu */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    'flex items-center space-x-2 rtl:space-x-reverse rounded-full pl-1 pr-2',
                    iconButtonClass
                  )}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-gradient-primary text-white">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className={cn('hidden md:block font-medium transition-colors', interactiveTextClass)}>
                    {user.name}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className={cn(
                  'w-56 border border-border/70 backdrop-blur-xl',
                  isDark ? 'bg-surface-200/85 text-white' : 'bg-white/90 text-text-strong'
                )}
              >
                <DropdownMenuItem className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4" />
                  {t('auth.profile')}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/60" />
                <DropdownMenuItem onClick={logout} className="flex items-center gap-2 text-destructive">
                  <LogOut className="h-4 w-4" />
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
