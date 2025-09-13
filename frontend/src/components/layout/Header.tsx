import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Globe, User, Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils'; 
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Header = () => {
  const { t } = useTranslation();
  const { language, toggleLanguage, isRTL } = useLanguage();
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
   className="bg-background py-3 px-4 md:px-8 border-b border-border flex items-center justify-between animate-fade-in">
      <div className="flex-1">
        <Search
              className={cn(
                'absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground',
                isRTL ? 'right-3' : 'left-3'
              )}
            />
            <Input
              placeholder={t('common.search')}
              className={cn('glass border-0', isRTL ? 'pr-10' : 'pl-10')}
            />
          </div>
 
  <div className="flex items-center gap-3">
        {/* Right Side Controls */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="glass-button relative hover:shadow-glow transition-colors"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full animate-pulse" />
          </Button>
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="glass-button hover:shadow-glow transition-colors"
          >
            <Globe className="h-4 w-4" />
            <span className="ml-2 font-medium">
              {language === 'ar' ? 'العربية' : 'English'}
            </span>
          </Button>

        {/* زر تحويل وضع الليل/النهار */}
        <ThemeToggle />




          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="glass-button">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-card border-white/20">
              <DropdownMenuItem>
                {t('common.profile')}
              </DropdownMenuItem>
              <DropdownMenuItem>
                {t('common.settings')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                onSelect={() => {
                  logout();
                  navigate('/login');
                }}
              >
                {t('common.logout')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
};
