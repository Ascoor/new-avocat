import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ui/theme-toggle';
import BrandLogo from '@/components/common/BrandLogo';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const LandingNavbar: React.FC = () => {
  const { t, isRTL, language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { key: 'home', href: '#hero', label: t('landing.nav.home') },
    { key: 'features', href: '#features', label: t('landing.nav.features') },
    { key: 'services', href: '#services', label: t('landing.nav.services') },
    { key: 'about', href: '#about', label: t('landing.nav.about') },
    { key: 'contact', href: '#contact', label: t('landing.nav.contact') },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const toggleLang = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  // 🟢 وظيفة مساعدة لتحديد لون النصوص
  const getNavTextColor = () => {
    if (isScrolled) return "text-foreground hover:text-primary"; // بعد الـ scroll
    return theme === "dark"
      ? "text-text-inverse hover:text-text-subtle"
      : "text-text-strong hover:text-primary";
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/90 backdrop-blur-lg border-b border-border shadow-lg"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <BrandLogo
              variant="text"
              className="h-12"
              lang={language}
              dark={theme === 'dark'}
            />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className={cn("text-sm font-medium transition-colors", getNavTextColor())}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4 rtl:space-x-reverse">
              <ThemeToggle />

              {/* Language Toggle */}
              <Button
                onClick={toggleLang}
                size="sm"
                variant="outline"
                className={cn(
                  "font-medium",
                  isScrolled
                    ? "border-border text-foreground hover:text-primary"
                    : theme === "dark"
                      ? "border-white text-text-inverse hover:bg-white/10"
                      : "border-border text-text-strong hover:text-primary"
                )}
              >
                {language === 'ar' ? 'EN' : 'عربي'}
              </Button>

              <Button
                asChild
                variant="ghost"
                size="sm"
                className={cn("font-medium", getNavTextColor())}
              >
                <Link to="/login">{t('landing.nav.login')}</Link>
              </Button>

              <Button asChild size="sm" className="font-medium bg-primary text-primary-foreground hover:bg-primary-hover">
                <Link to="/register">{t('landing.nav.signup')}</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2 rtl:space-x-reverse">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className={getNavTextColor()}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default LandingNavbar;
