import React from 'react';

import { Moon, Sun,UserCircle ,Settings , Globe, ChevronDown, User, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel 
} from '@/components/ui/dropdown-menu';
import ThemeToggle from '@/components/ui/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useSidebar } from '@/contexts/SidebarContext';
import BrandLogo from '@/components/common/BrandLogo';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
interface HeaderProps {
  title?: string;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, className }) => {
  const { theme, toggleTheme } = useTheme();

  const { language, setLanguage, t, isRTL } = useLanguage();
  const { user, logout } = useAuth();
  const { toggleMobile, isMobileOpen } = useSidebar();

    const toggleLang = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };
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
            aria-label={isMobileOpen ? t('common.close') : t('common.menu')}
          >
            {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
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
          <ThemeToggle />

        {/* Actions */}
                <div className="p-4 border-t border-border space-y-3">
                  <Button onClick={toggleLang} variant="outline" className="w-full">
                    {language === 'ar' ? 'EN' : 'عربي'}
                  </Button>

                  
                </div>

          {/* User Menu */}
          {user && (
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserCircle className="h-5 w-5" />
                </div>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium">
                    {user?.user_metadata?.first_name || 'Demo'} {user?.user_metadata?.last_name || 'User'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {user?.user_metadata?.role || 'Admin'}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-cairo">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">
                    {user?.user_metadata?.first_name || 'Demo'} {user?.user_metadata?.last_name || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user?.email || 'demo@avocat.law'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="font-cairo">
                <User className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
              </DropdownMenuItem>
              <DropdownMenuItem className="font-cairo">
                <Settings className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                {language === 'ar' ? 'الإعدادات' : 'Settings'}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="font-cairo text-destructive focus:text-destructive"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                {language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};
