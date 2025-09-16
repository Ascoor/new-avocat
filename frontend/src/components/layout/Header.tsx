import React from 'react';
import { Moon, Sun, ChevronDown, User, LogOut, Menu } from 'lucide-react';
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
  const { toggleMobile } = useSidebar();

  const headerSurface = { '--glass-surface': 'var(--gradient-header)' } as React.CSSProperties;

  return (
    <header
      className={cn(
        'sticky top-0 z-50 h-16 glass border-b border-border/60 text-white shadow-elegant',
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
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobile}
            className="md:hidden h-9 w-9 text-white hover:bg-white/15 hover:text-white focus-visible:ring-white/60 focus-visible:ring-offset-0"
            aria-label={t('common.menu')}
          >
            <Menu className="h-4 w-4" />
          </Button>

          {/* Desktop logo - hidden on mobile */}
          <div className="hidden md:block">
            <BrandLogo variant="full" className="h-8" lang={language} />
          </div>

          {/* Page title */}
          {title && (
            <h1 className="hidden sm:block text-lg font-semibold text-white/90">
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
            className="rounded-full text-white hover:bg-white/15 hover:text-white focus-visible:ring-white/60 focus-visible:ring-offset-0 glow-hover"
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
            className="rounded-full text-white hover:bg-white/15 hover:text-white focus-visible:ring-white/60 focus-visible:ring-offset-0 glow-hover"
            aria-label="Toggle Language"
          >
            {language === 'ar' ? 'EN' : 'ع'}
          </Button>

          {/* User Menu */}
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 rtl:space-x-reverse rounded-full text-white hover:bg-white/15 hover:text-white focus-visible:ring-white/60 focus-visible:ring-offset-0 glow-hover"
                >
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