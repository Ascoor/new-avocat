// src/components/layout/Header.tsx
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Globe, User, Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguage();
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background py-3 px-4 md:px-8 border-b border-border flex items-center justify-between animate-fade-in"
    >
      {/* زر لفتح/إغلاق الشريط الجانبي */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="glass-button hover:shadow-glow transition-colors md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button> 
      </div>

      {/* العناصر على اليمين */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" className="relative glass-button">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full animate-pulse" />
        </Button>

        <Button variant="ghost" size="sm" onClick={toggleLanguage} className="glass-button">
          <Globe className="h-4 w-4" />
          <span className="ml-2 font-medium">{language === 'ar' ? 'العربية' : 'English'}</span>
        </Button>

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="glass-button">
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass-card border-white/20">
            <DropdownMenuItem>{t('common.profile')}</DropdownMenuItem>
            <DropdownMenuItem>{t('common.settings')}</DropdownMenuItem>
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
    </motion.header>
  );
};
