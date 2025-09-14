import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
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
    { id: 'services', label: t<string>('nav.services'), href: 'services' },
    { id: 'about', label: t<string>('nav.about'), href: 'about' },
    { id: 'team', label: t<string>('nav.team'), href: 'team' },
    { id: 'contact', label: t<string>('nav.contact'), href: 'contact' },
  ];

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        'gradient-hero',
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
              {t<string>('brand')}
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav
            className={clsx(
              'hidden md:flex items-center',
              dir === 'rtl' ? 'flex-row-reverse gap-8' : 'gap-8'
            )}
          >
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
            <ThemeToggle />
            <LanguageToggle />

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-accent/10 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden">
          <div
            className={clsx(
              'fixed top-0 h-full w-64 bg-background shadow-elegant p-6 transition-transform duration-300',
              dir === 'rtl' ? 'right-0' : 'left-0'
            )}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-accent/10"
            >
              <X className="h-6 w-6 text-foreground" />
            </button>

            {/* Nav Items */}
            <nav className="mt-12 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.href)}
                  className="nav-link py-2 text-lg text-left"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-6 border-t flex flex-col gap-3">
                <Link to="/login" className="btn-outline-gold text-center">
                  {t<string>('nav.login')}
                </Link>
                <Link to="/register" className="btn-hero text-center">
                  {t<string>('nav.register')}
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default LandingHeader;
