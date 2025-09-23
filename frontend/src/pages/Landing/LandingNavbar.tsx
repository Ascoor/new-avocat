import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/theme-toggle";
import BrandLogo from "@/components/common/BrandLogo";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import {
  Award,
  BookOpenText,
  Languages,
  Menu,
  Phone,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";

type NavItem = {
  href: string;
  icon: typeof Scale;
  en: string;
  ar: string;
};

const navItems: NavItem[] = [
  { href: "#home", icon: Scale, en: "Home", ar: "الرئيسية" },
  { href: "#about", icon: BookOpenText, en: "About", ar: "من نحن" },
  { href: "#services", icon: ShieldCheck, en: "Services", ar: "الخدمات" },
  { href: "#capabilities", icon: Sparkles, en: "Capabilities", ar: "الإمكانيات" },
  { href: "#achievements", icon: Award, en: "Achievements", ar: "الإنجازات" },
  { href: "#team", icon: Users, en: "Team", ar: "الفريق" },
  { href: "#insights", icon: BookOpenText, en: "Insights", ar: "المدونة" },
  { href: "#contact", icon: Phone, en: "Contact", ar: "اتصل بنا" },
];

const highlightCopy = {
  en: "Legal Digital Transformation",
  ar: "التحول الرقمي القانوني",
};

const toggleCopy = {
  en: { label: "Switch to Arabic", aria: "Switch to Arabic" },
  ar: { label: "التبديل إلى الإنجليزية", aria: "التبديل إلى الإنجليزية" },
};

const LandingNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(
    navItems[0]?.href ?? "#home",
  );
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const scrollPosition = window.scrollY + 180;
      let newActive = navItems[0]?.href ?? "#home";

      for (const { href } of navItems) {
        const section = document.querySelector<HTMLElement>(href);
        if (!section) continue;

        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        if (scrollPosition >= sectionTop) {
          newActive = href;
        }
      }

      setActiveSection((previous) =>
        previous === newActive ? previous : newActive,
      );
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setActiveSection(href);
    setIsOpen(false);
  };

  const isArabic = language === "ar";
  const highlight = isArabic ? highlightCopy.ar : highlightCopy.en;
  const { label: toggleLabel, aria: toggleAria } = toggleCopy[language];

  return (
    <nav
      lang={language}
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        isScrolled
          ? "border-b border-border bg-background/90 shadow-elevated backdrop-blur-lg"
          : "bg-background/20 backdrop-blur",
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
        <button
          onClick={() => scrollTo("#home")}
          className="flex items-center gap-3"
        >
          <div className="hidden sm:block">
            <BrandLogo variant="full" className="h-10" lang={language} />
          </div>
          <div className="text-lg font-semibold text-foreground sm:hidden">
            Avocat
          </div>
        </button>

        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map(({ href, icon: Icon, en, ar }) => {
            const label = isArabic ? ar : en;
            const isActive = activeSection === href;

            return (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group flex items-center gap-2 text-sm font-medium tracking-wide transition",
                  isActive
                    ? "text-amber-400"
                    : "text-muted-foreground hover:text-primary",
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 transition-all duration-300 group-hover:scale-110",
                    isActive &&
                      "text-amber-400 drop-shadow-[0_0_6px_rgba(214,182,76,0.35)]",
                  )}
                />
                <span>{label}</span>
                <span
                  className={cn(
                    "block h-0.5 w-0 bg-gradient-gold transition-all duration-300 group-hover:w-full",
                    isActive && "w-full",
                  )}
                />
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs uppercase tracking-widest text-muted-foreground backdrop-blur lg:flex">
            <Sparkles className="h-3 w-3 text-accent" />
            <span>{highlight}</span>
          </div>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            aria-label={toggleAria}
            className="inline-flex items-center gap-1 rounded-full border border-border/60 px-3 py-2 text-xs font-semibold uppercase lg:hidden"
          >
            <Languages className="h-4 w-4" />
            <span>{isArabic ? "EN" : "AR"}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            aria-label={toggleAria}
            className="hidden items-center justify-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm font-medium lg:inline-flex"
          >
            <Languages className="h-4 w-4" />
            <span>{toggleLabel}</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background/95 backdrop-blur transition-all duration-300 lg:hidden",
          isOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="space-y-1 px-4 py-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3 text-accent" />
              <span>{highlight}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              aria-label={toggleAria}
              onClick={() => {
                toggleLanguage();
                setIsOpen(false);
              }}
              className="flex items-center gap-2 rounded-full border border-border/60 px-3 py-2 text-xs font-semibold uppercase"
            >
              <Languages className="h-4 w-4" />
              <span>{toggleLabel}</span>
            </Button>
          </div>
          {navItems.map(({ href, icon: Icon, en, ar }) => {
            const label = isArabic ? ar : en;
            const isActive = activeSection === href;

            return (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl border border-transparent px-4 py-3 text-left transition-all duration-300 hover:border-accent/40 hover:bg-accent/10",
                  isActive && "border-amber-400/70 bg-amber-400/10 text-amber-400",
                )}
              >
                <div
                  className={cn(
                    "flex items-center gap-3 text-foreground",
                    isActive && "text-amber-400",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 text-primary transition-colors duration-300",
                      isActive && "text-amber-400",
                    )}
                  />
                  <span className="text-sm font-medium">{label}</span>
                </div>
                <span
                  className={cn(
                    "text-xs uppercase tracking-widest text-muted-foreground",
                    isActive && "text-amber-300",
                  )}
                >
                  {href.replace("#", "")}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
