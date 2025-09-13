// src/components/landing/LandingHeader.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Menu, X } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { LanguageToggle } from '../ui/language-toggle';
import { ThemeToggle } from '../ui/theme-toggle';
import clsx from 'clsx';

const LandingHeader: React.FC = () => {
  const { t, dir } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'services',     label: t<string>('nav.services'),     href: 'services' },
    { id: 'about',        label: t<string>('nav.about'),        href: 'about' },
    { id: 'capabilities', label: t<string>('nav.capabilities'), href: 'capabilities' },
    { id: 'ai',           label: t<string>('nav.ai'),           href: 'ai' },
    { id: 'digital',      label: t<string>('nav.digital'),      href: 'digital' },
    { id: 'cyber',        label: t<string>('nav.cyber'),        href: 'cyber' },
    { id: 'challenges',   label: t<string>('nav.challenges'),   href: 'challenges' },
    { id: 'whyus',        label: t<string>('nav.whyus'),        href: 'whyus' },
    { id: 'achievements', label: t<string>('nav.achievements'), href: 'achievements' },
    { id: 'team',         label: t<string>('nav.team'),         href: 'team' },
    { id: 'contact',      label: t<string>('nav.contact'),      href: 'contact' },
  ];

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        'hero-gradient', // خلفية متدرجة أنيقة متوافقة مع النمط
        isScrolled && 'shadow-elegant backdrop-blur-sm border-b border-border/20'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Brand */}
          <div className={clsx('flex items-center gap-2', dir === 'rtl' && 'flex-row-reverse')}>
            <div className="w-10 h-10 gradient-accent rounded-lg flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-xl">A</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground">
              AVOCAT LAW FIRM
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className={clsx('hidden md:flex items-center', dir === 'rtl' ? 'flex-row-reverse gap-8' : 'gap-8')}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.href)}
                className="nav-link"
              >
                {item.label}
              </button>
            ))}
            <Link
              to="/register"
              className={clsx('btn-hero', dir === 'rtl' ? 'mr-4' : 'ml-4')}
            >
              {t<string>('hero.ctaPrimary')}
            </Link>
          </nav>

          {/* Actions */}
          <div className={clsx('flex items-center gap-3', dir === 'rtl' && 'flex-row-reverse')}>
            <Link
              to="/login"
              className="hidden sm:inline-block px-3 py-2 rounded-lg border border-border hover:bg-accent/10 text-sm transition-all duration-300"
            >
              {t<string>('nav.login')}
            </Link>
            <Link to="/register" className="hidden sm:inline-block btn-hero text-sm">
              {t<string>('nav.register')}
            </Link>
            <ThemeToggle />
            <LanguageToggle />

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-accent/10 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.href)}
                  className={clsx('nav-link py-2', dir === 'rtl' ? 'text-right' : 'text-left')}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t flex gap-3">
                <Link to="/login" className="btn-outline flex-1 text-center">{t<string>('nav.login')}</Link>
                <Link to="/register" className="btn-hero flex-1 text-center">{t<string>('nav.register')}</Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default LandingHeader;
