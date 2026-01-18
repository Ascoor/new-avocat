import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { AlignJustify, Languages, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { BrandLogo } from '@/components/common/BrandLogo';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { useScrollSpy } from '@/components/landing/useScrollSpy';
import { staggerVariants } from '@/components/landing/landing-motion';

const SECTION_IDS = ['home', 'about', 'services', 'achievements', 'team', 'testimonials', 'contact'];

export const LandingNavbar = () => {
  const { language, toggleLanguage, direction } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS, { offset: 160 });

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = useMemo(
    () =>
      SECTION_IDS.map((id) => ({
        id,
        label: language === 'ar'
          ? {
              home: 'الرئيسية',
              about: 'عن أفوكات',
              services: 'الخدمات',
              achievements: 'الإنجازات',
              team: 'الفريق',
              testimonials: 'الآراء',
              contact: 'التواصل',
            }[id]
          : {
              home: 'Home',
              about: 'About',
              services: 'Services',
              achievements: 'Achievements',
              team: 'Team',
              testimonials: 'Testimonials',
              contact: 'Contact',
            }[id],
      })),
    [language],
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'mx-auto flex w-full max-w-6xl items-center justify-between gap-4 rounded-full border px-4 py-3 transition-all duration-500 sm:px-6',
          isScrolled
            ? 'bg-[hsl(var(--nav-bg-scrolled))] shadow-[var(--shadow-lg)] border-[hsl(var(--nav-border))]'
            : 'bg-[hsl(var(--nav-bg-top))] border-transparent',
        )}
      >
        <BrandLogo lang={language} dark />
        <nav className="hidden items-center gap-6 lg:flex">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                'relative text-sm font-medium transition-colors',
                activeId === item.id
                  ? 'text-[hsl(var(--gold))]'
                  : 'text-[hsl(var(--primary-foreground))] hover:text-[hsl(var(--gold))]',
              )}
            >
              {item.label}
              {activeId === item.id && (
                <span
                  className={cn(
                    'absolute -bottom-2 h-0.5 w-full rounded-full bg-[hsl(var(--gold))]',
                    direction === 'rtl' ? 'origin-right' : 'origin-left',
                  )}
                />
              )}
            </a>
          ))}
          <Link
            to="/showcase"
            className="relative text-sm font-medium text-[hsl(var(--primary-foreground))] transition-colors hover:text-[hsl(var(--gold))]"
          >
            {language === 'ar' ? 'المعرض' : 'Showcase'}
          </Link>
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle tone="hero" />
          <Button
            type="button"
            variant="outline"
            onClick={toggleLanguage}
            className="border-[hsl(var(--nav-border))] bg-[hsl(var(--card)/0.2)] text-[hsl(var(--primary-foreground))]"
          >
            <Languages className="h-4 w-4" />
            {language === 'ar' ? 'English' : 'العربية'}
          </Button>
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setIsOpen((prev) => !prev)}
          className="lg:hidden border-[hsl(var(--nav-border))] bg-[hsl(var(--card)/0.2)] text-[hsl(var(--primary-foreground))]"
        >
          {isOpen ? <X className="h-4 w-4" /> : <AlignJustify className="h-4 w-4" />}
        </Button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: 'easeOut' }}
            className="mx-auto mt-3 w-full max-w-6xl overflow-hidden rounded-3xl border border-[hsl(var(--nav-border))] bg-[hsl(var(--nav-bg-scrolled))] p-4 shadow-[var(--shadow-lg)] lg:hidden"
          >
            <motion.div
              variants={staggerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-3"
            >
              {items.map((item) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'rounded-2xl px-4 py-2 text-sm font-medium transition-colors',
                    activeId === item.id
                      ? 'bg-[hsl(var(--accent-soft))] text-[hsl(var(--accent-foreground))]'
                      : 'text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--card)/0.15)]',
                  )}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div>
                <Link
                  to="/showcase"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-2xl px-4 py-2 text-sm font-medium text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--card)/0.15)]"
                >
                  {language === 'ar' ? 'المعرض' : 'Showcase'}
                </Link>
              </motion.div>
              <motion.div className="flex items-center gap-2">
                <ThemeToggle tone="hero" />
                <Button
                  type="button"
                  variant="outline"
                  onClick={toggleLanguage}
                  className="flex-1 border-[hsl(var(--nav-border))] bg-[hsl(var(--card)/0.2)] text-[hsl(var(--primary-foreground))]"
                >
                  <Languages className="h-4 w-4" />
                  {language === 'ar' ? 'English' : 'العربية'}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
