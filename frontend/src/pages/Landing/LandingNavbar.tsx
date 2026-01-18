import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ThemeToggle, {
  themeToggleToneClassMap,
  themeToggleToneVariantMap,
  type ThemeToggleTone,
} from "@/components/ui/theme-toggle";
import BrandLogo from "@/components/common/BrandLogo";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useScrollSpy } from "@/components/landing/useScrollSpy";
import { smoothScrollToElement } from "@/utils/smoothScroll";
import { cn } from "@/lib/utils";
import {
  Award,
  BookOpenText,
  BriefcaseBusiness,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";

const navSections = [
  { id: "home", icon: Sparkles, en: "Home", ar: "الرئيسية" },
  { id: "trust", icon: ShieldCheck, en: "Trust", ar: "الثقة" },
  { id: "services", icon: BriefcaseBusiness, en: "Services", ar: "الخدمات" },
  { id: "about", icon: BookOpenText, en: "Approach", ar: "المنهجية" },
  { id: "achievements", icon: Award, en: "Achievements", ar: "الإنجازات" },
  { id: "team", icon: Users, en: "Team", ar: "الفريق" },
  { id: "contact", icon: Phone, en: "Contact", ar: "اتصل بنا" },
];

const toggleCopy = {
  en: { label: "Switch to Arabic", aria: "Switch to Arabic" },
  ar: { label: "التبديل إلى الإنجليزية", aria: "التبديل إلى الإنجليزية" },
};

const LandingNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const { language, toggleLanguage, direction } = useLanguage();
  const navigate = useNavigate();

  const sectionIds = useMemo(() => navSections.map((section) => section.id), []);
  const activeId = useScrollSpy(sectionIds, { offset: 96 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = theme === "dark";
  const isArabic = language === "ar";
  const isTop = !isScrolled;
  const { aria: toggleAria } = toggleCopy[language];

  const actionTone: ThemeToggleTone = isTop ? "hero" : isDark ? "dark" : "light";
  const actionVariant = themeToggleToneVariantMap[actionTone];
  const actionToneClasses = themeToggleToneClassMap[actionTone];

  const logoDark = isTop ? true : isDark;
  const underlineAlignment = isArabic ? "right-0 origin-right" : "left-0 origin-left";

  const scrollToAnchor = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      smoothScrollToElement(element, { offset: 92 });
    }
    setIsOpen(false);
  };

  const containerVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1], when: "beforeChildren", staggerChildren: 0.08 },
    },
    exit: { height: 0, opacity: 0, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const navText = isTop
    ? "text-[hsl(var(--navbar-link-hero-muted))] hover:text-[hsl(var(--navbar-link-hero))]"
    : "text-[hsl(var(--navbar-link-solid))] hover:text-[hsl(var(--foreground))]";

  return (
    <nav
      dir={direction}
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        isScrolled
          ? "bg-[hsl(var(--nav-bg-scrolled))] backdrop-blur-xl border-b border-[hsl(var(--nav-border))] shadow-[var(--shadow-md)]"
          : "bg-[hsl(var(--nav-bg-top))] backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <button
          type="button"
          onClick={() => scrollToAnchor("home")}
          className="flex items-center gap-3"
          aria-label="Avocat"
        >
          <div className="block sm:hidden">
            <BrandLogo variant="icon" className="h-9 w-9" lang={language} dark={logoDark} />
          </div>
          <div className="hidden sm:block">
            <BrandLogo variant="text" className="h-10" lang={language} dark={logoDark} />
          </div>
        </button>

        <div className="hidden items-center gap-6 lg:flex">
          {navSections.map(({ id, icon: Icon, en, ar }) => {
            const label = isArabic ? ar : en;
            const isActive = activeId === id;
            return (
              <button
                key={id}
                onClick={() => scrollToAnchor(id)}
                className={cn(
                  "group relative flex items-center gap-2 text-sm font-medium tracking-wide transition-colors",
                  navText,
                )}
              >
                <Icon className="h-4 w-4 text-[hsl(var(--gold))]" />
                <span className="relative">
                  {label}
                  <span
                    className={cn(
                      "absolute -bottom-1 block h-0.5 w-full transform rounded-full transition-transform duration-300",
                      underlineAlignment,
                      isActive ? "scale-x-100 bg-[hsl(var(--gold))]" : "scale-x-0 bg-[hsl(var(--gold))] group-hover:scale-x-100",
                    )}
                  />
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle tone={actionTone} />

          <Button
            variant={actionVariant}
            size="icon"
            onClick={toggleLanguage}
            aria-label={toggleAria}
            className={cn("rounded-full transition-all duration-300", actionToneClasses)}
          >
            {isArabic ? "EN" : "AR"}
          </Button>

          <Button
            type="button"
            onClick={() => navigate("/login")}
            variant={isDark ? "gold" : "chromatic"}
            size="lg"
            className="hidden lg:inline-flex rounded-full px-6 shadow-[var(--shadow-md)] transition-transform hover:-translate-y-0.5"
          >
            {isArabic ? "تسجيل الدخول" : "Client Login"}
          </Button>

          <Button
            variant={actionVariant}
            size="icon"
            className={cn("lg:hidden rounded-full", actionToneClasses)}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="overflow-hidden border-t border-[hsl(var(--nav-border))] bg-[hsl(var(--nav-bg-scrolled))] backdrop-blur"
          >
            <div className="space-y-3 px-4 py-5">
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-between rounded-full border border-[hsl(var(--nav-border))] px-4 py-2 text-xs text-[hsl(var(--muted-foreground))]"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[hsl(var(--gold))]" />
                  {isArabic ? "قوة قانونية رقمية موثوقة" : "Trusted legal-tech resilience"}
                </span>
                <span className="rounded-full bg-[hsl(var(--gold))] px-2 py-0.5 text-[0.65rem] font-semibold text-[hsl(var(--accent-foreground))]">
                  {isArabic ? "جديد" : "New"}
                </span>
              </motion.div>

              {navSections.map(({ id, icon: Icon, en, ar }) => {
                const label = isArabic ? ar : en;
                return (
                  <motion.button
                    key={id}
                    variants={itemVariants}
                    onClick={() => scrollToAnchor(id)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-sm font-medium transition-all",
                      "hover:border-[hsl(var(--nav-border))] hover:bg-[hsl(var(--muted))]",
                      isArabic ? "text-right" : "text-left",
                    )}
                  >
                    <span className="flex items-center gap-3 text-[hsl(var(--foreground))]">
                      <Icon className="h-5 w-5 text-[hsl(var(--gold))]" />
                      {label}
                    </span>
                  </motion.button>
                );
              })}

              <motion.div variants={itemVariants} className="grid gap-3">
                <Button
                  type="button"
                  onClick={() => navigate("/login")}
                  variant={isDark ? "gold" : "chromatic"}
                  className="w-full rounded-2xl py-3 text-sm font-semibold shadow-[var(--shadow-md)]"
                >
                  {isArabic ? "تسجيل الدخول" : "Client Login"}
                </Button>

                <Button
                  type="button"
                  onClick={() => scrollToAnchor("contact")}
                  variant="outline"
                  className="w-full rounded-2xl border-[hsl(var(--nav-border))] text-sm"
                >
                  {isArabic ? "احجز مكالمة استراتيجية" : "Book a Strategy Call"}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
};

export default LandingNavbar;
