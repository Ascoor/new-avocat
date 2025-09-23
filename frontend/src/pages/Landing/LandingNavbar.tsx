import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/theme-toggle";
import BrandLogo from "@/components/common/BrandLogo";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import {
  Award,
  BookOpenText,
  Menu,
  Phone,
  Scale,
  ShieldCheck,
  Users,
  X,
  Globe,
} from "lucide-react";
import { smoothScrollToElement } from "@/utils/smoothScroll";

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
  { href: "#capabilities", icon: Globe, en: "Capabilities", ar: "الإمكانيات" },
  { href: "#achievements", icon: Award, en: "Achievements", ar: "الإنجازات" },
  { href: "#team", icon: Users, en: "Team", ar: "الفريق" },
  { href: "#insights", icon: BookOpenText, en: "Insights", ar: "المدونة" },
  { href: "#contact", icon: Phone, en: "Contact", ar: "اتصل بنا" },
];

const LandingNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { language, toggleLanguage, direction } = useLanguage();
  const navigate = useNavigate();
  const [active, setActive] = useState("#home");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      const last = lastScrollY.current;

      setIsScrolled(current > 30);

      if (current <= 10) {
        setIsHidden(false);
      } else {
        if (current > last && current - last > 15) {
          setIsHidden(true);
        } else if (current < last && last - current > 15) {
          setIsHidden(false);
        }
      }

      lastScrollY.current = current;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsHidden(false);
    }
  }, [isOpen]);

  const scrollTo = (href: string) => {
    const element = document.querySelector<HTMLElement>(href);
    if (element) {
      smoothScrollToElement(element, { offset: 90, duration: 950 });
    }
    setActive(href);
    setIsOpen(false);
  };

  const isArabic = language === "ar";
  const isTop = !isScrolled;
  const navTextColorClass = isTop
    ? "text-white/80 hover:text-white"
    : "text-foreground/70 hover:text-foreground";
  const navIconColorClass = isTop ? "text-white" : "text-accent";
  const menuButtonColorClass = isTop ? "text-white" : "";

  const handleLogin = () => {
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <nav
      dir={direction}
      className={`fixed top-0 z-50 w-full transform transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        isHidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      } ${
        isScrolled
          ? "bg-background/90 backdrop-blur-lg border-b border-border shadow-elevated"
          : "bg-transparent"
      }`}
    >
      {/* Navbar container */}
      <div
        className={`container mx-auto flex h-20 items-center justify-between px-4 lg:px-8 ${
          isArabic ? "flex-row-reverse" : ""
        }`}
        dir={direction}
      >
        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollTo("#home")}
          className={`flex items-center gap-3 ${isArabic ? "flex-row-reverse text-right" : ""}`}
        >
          <BrandLogo
            variant="text"
            className="h-12"
            lang={language}
            dark={isTop ? true : undefined}
          />
          <span
            className={`text-lg font-semibold sm:hidden ${
              isArabic ? "text-right" : "text-left"
            } ${isTop ? "text-white" : "text-foreground"}`}
          >
            {isArabic ? "أفوكات" : "Avocat"}
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-6 lg:flex" dir={direction}>
          {navItems.map(({ href, icon: Icon, en, ar }) => {
            const label = isArabic ? ar : en;
            const isActive = active === href;
            return (
              <button
                key={href}
                type="button"
                onClick={() => scrollTo(href)}
                className={`group relative flex items-center gap-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                  isActive ? "text-yellow-400" : navTextColorClass
                } ${isArabic ? "justify-end text-right" : "text-left"}`}
                dir={direction}
              >
                <Icon
                  className={`h-4 w-4 transition-transform duration-300 group-hover:scale-110 ${
                    isActive ? "text-yellow-400" : navIconColorClass
                  }`}
                />
                <span className={`block ${isArabic ? "text-right" : "text-left"}`}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3" dir={direction}>
          <div className={isTop ? "text-white" : ""}>
            <ThemeToggle />
          </div>

          {/* 🌐 Language Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            aria-label="Toggle language"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border ${
              isTop ? "border-white/60 text-white" : "border-border/60"
            } ${isArabic ? "font-arabic" : "font-english"}`}
          >
            {isArabic ? "EN" : "AR"}
          </Button>

          {/* Login */}
          <Button
            type="button"
            onClick={handleLogin}
            className="hidden rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-md transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg lg:inline-flex"
          >
            {isArabic ? "تسجيل الدخول" : "Client Login"}
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className={`lg:hidden ${menuButtonColorClass}`}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`overflow-hidden border-t border-border/70 bg-background/95 backdrop-blur transition-all duration-300 lg:hidden ${
          isOpen ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0"
        }`}
        dir={direction}
      >
        <div className="space-y-4 px-4 py-6">
          {navItems.map(({ href, icon: Icon, en, ar }) => {
            const label = isArabic ? ar : en;
            const isActive = active === href;
            return (
              <button
                key={href}
                type="button"
                onClick={() => scrollTo(href)}
                className={`group flex w-full items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-300 ${
                  isArabic ? "flex-row-reverse text-right" : "text-left"
                } ${
                  isActive
                    ? "border-yellow-400 bg-yellow-50 text-yellow-500"
                    : "hover:border-accent/40 hover:bg-accent/10"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    isActive ? "text-yellow-500" : "text-accent"
                  }`}
                />
                <span className="text-sm font-medium">{label}</span>
              </button>
            );
          })}

          <Button
            type="button"
            onClick={handleLogin}
            className="w-full rounded-xl bg-primary py-2 text-sm font-semibold text-primary-foreground shadow-md transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            {isArabic ? "تسجيل الدخول" : "Client Login"}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
