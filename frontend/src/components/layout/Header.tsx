import React from 'react';
import { Moon, Sun, ChevronDown, User, LogOut, Menu, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
        'sticky top-0 z-50 h-16 glass overflow-hidden border-b border-white/20 text-white shadow-elegant',
        className
      )}
      style={headerSurface}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-16 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute right-[-48px] top-[-32px] h-48 w-48 rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/30" />
      </div>
      <div className="relative flex h-full items-center justify-between gap-4 px-4 sm:px-6">
        <div className={cn('flex items-center gap-4', isRTL ? 'flex-row-reverse' : 'flex-row')}>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobile}
            className="md:hidden h-9 w-9 rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:ring-white/60 focus-visible:ring-offset-0"
            aria-label={t('common.menu')}
          >
            <Menu className="h-4 w-4" />
          </Button>

          <div className={cn(
            'hidden md:flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-3 py-2 shadow-[0_8px_24px_-20px_rgba(15,23,42,0.55)]',
            isRTL ? 'flex-row-reverse' : 'flex-row'
          )}>
            <BrandLogo variant="icon" className="h-6 w-6" lang={language} />
            <div
              className={cn(
                'hidden lg:flex flex-col gap-1',
                isRTL ? 'items-end text-right' : 'items-start text-left'
              )}
            >
              <Badge className="border-white/30 bg-white/10 text-[11px] font-medium uppercase tracking-[0.2em] text-white/80">
                {t('dashboard.title')}
              </Badge>
              <span className={cn(
                'flex items-center gap-1 text-xs text-white/70',
                isRTL ? 'flex-row-reverse' : 'flex-row'
              )}>
                <Sparkles className="h-3.5 w-3.5" />
                {t('dashboard.tagline')}
              </span>
            </div>
          </div>

          <div
            className={cn(
              'min-w-0 flex flex-col',
              isRTL ? 'items-end text-right' : 'items-start text-left'
            )}
          >
            <h1 className="text-base font-semibold leading-tight text-white sm:text-lg">
              {title ?? t('dashboard.title')}
            </h1>
            <span className="text-xs text-white/70 sm:hidden">
              {t('dashboard.tagline')}
            </span>
          </div>
        </div>

        <div className={cn('flex items-center gap-3', isRTL ? 'flex-row-reverse' : 'flex-row')}>
          <div className="hidden lg:flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white/80 shadow-glass">
            <span className="flex items-center gap-1">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_0_3px_rgba(16,185,129,0.35)]" />
              {t('dashboard.status.label')}
            </span>
            <span className="font-semibold text-white">
              {t('dashboard.status.healthy')}
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9 rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:ring-white/60 focus-visible:ring-offset-0"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            className="h-9 w-9 rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:ring-white/60 focus-visible:ring-offset-0"
            aria-label="Toggle Language"
          >
            {language === 'ar' ? 'EN' : 'ع'}
          </Button>

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    'flex items-center gap-2 rounded-full bg-white/10 px-2.5 py-1.5 text-white transition hover:bg-white/20 focus-visible:ring-white/60 focus-visible:ring-offset-0',
                    isRTL ? 'flex-row-reverse' : 'flex-row'
                  )}
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
              <DropdownMenuContent
                align="end"
                className="glass w-56 border border-white/20 text-foreground"
              >
                <DropdownMenuItem
                  className={cn(
                    'flex items-center gap-2 text-sm text-foreground/80 transition hover:text-foreground',
                    isRTL ? 'flex-row-reverse' : 'flex-row'
                  )}
                >
                  <User className="h-4 w-4" />
                  {t('auth.profile')}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/20" />
                <DropdownMenuItem
                  onClick={logout}
                  className={cn(
                    'flex items-center gap-2 text-destructive transition hover:text-destructive',
                    isRTL ? 'flex-row-reverse' : 'flex-row'
                  )}
                >
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