import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/features/auth/hooks';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, LogOut, Menu } from 'lucide-react';

interface TopbarProps {
  onToggleSidebar?: () => void;
}

export const Topbar = ({ onToggleSidebar }: TopbarProps) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/70 dark:bg-gray-950/70 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onToggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2 ml-auto">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">3</span>
          </Button>
          <ThemeToggle />
          <LanguageSwitcher />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>
                    {user?.name
                      ?.split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={`w-56 ${isRTL ? 'ml-2' : 'mr-2'}`} align="end">
              <div className="flex flex-col space-y-1 p-2">
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-red-600 dark:text-red-400">
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t('common.logout')}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
