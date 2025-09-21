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

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { key: 'home', href: '#hero', label: t('nav.home') },
    { key: 'features', href: '#features', label: t('nav.features') },
    { key: 'services', href: '#services', label: t('nav.services') },
    { key: 'about', href: '#about', label: t('nav.about') },
    { key: 'contact', href: '#contact', label: t('nav.contact') },
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

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-background/80 backdrop-blur-lg border-b border-border shadow-lg'
            : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <BrandLogo
              variant="text"
              className="h-12"
              lang={language}
              dark={!isScrolled ? true : theme === 'dark'}
            />

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    isScrolled ? 'text-foreground' : 'text-white hover:text-white/80'
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4 rtl:space-x-reverse">
              <ThemeToggle />

              {/* Language Toggle as Button */}
              <Button
                onClick={toggleLang}
                size="sm"
                variant="outline"
                className="font-medium"
              >
                {language === 'ar' ? 'EN' : 'عربي'}
              </Button>

              <Button
                asChild
                variant="ghost"
                size="sm"
                className={cn(
                  'font-medium',
                  isScrolled
                    ? 'text-foreground hover:text-primary'
                    : 'text-white hover:text-white/80 hover:bg-white/10'
                )}
              >
                <Link to="/login">{t('nav.login')}</Link>
              </Button>

              <Button asChild size="sm" className="font-medium">
                <Link to="/register">{t('nav.register')}</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2 rtl:space-x-reverse">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  isScrolled
                    ? 'text-foreground hover:text-primary'
                    : 'text-white hover:text-white/80 hover:bg-white/10'
                )}
                aria-label={isOpen ? t('common.close') : t('common.menu')}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-lg"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: isRTL ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '100%' : '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className={cn(
                'absolute top-0 h-full w-80 max-w-sm bg-card border-border shadow-xl',
                isRTL ? 'right-0 border-l' : 'left-0 border-r'
              )}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <BrandLogo variant="full" className="h-8" lang={language} />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    aria-label={t('common.close')}
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 px-4 py-6">
                  <nav className="space-y-4">
                    {navItems.map((item) => (
                      <button
                        key={item.key}
                        onClick={() => scrollToSection(item.href)}
                        className="block w-full text-left px-4 py-3 text-lg font-medium text-foreground hover:text-primary hover:bg-accent/50 rounded-lg transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Actions */}
                <div className="p-4 border-t border-border space-y-3">
                  <Button onClick={toggleLang} variant="outline" className="w-full">
                    {language === 'ar' ? 'EN' : 'عربي'}
                  </Button>

                  <Button asChild variant="outline" className="w-full">
                    <Link to="/login">{t('nav.login')}</Link>
                  </Button>

                  <Button asChild className="w-full">
                    <Link to="/register">{t('nav.register')}</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LandingNavbar;
