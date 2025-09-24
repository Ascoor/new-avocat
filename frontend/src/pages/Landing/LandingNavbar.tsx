import { useEffect, useState } from "react";
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
  // { href: "#capabilities", icon: Sparkles, en: "Capabilities", ar: "الإمكانيات" },
  { href: "#achievements", icon: Award, en: "Achievements", ar: "الإنجازات" },
  { href: "#team", icon: Users, en: "Team", ar: "الفريق" },
  // { href: "#insights", icon: BookOpenText, en: "Insights", ar: "المدونة" },
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
  const { language, toggleLanguage, direction } = useLanguage();
  const navigate = useNavigate();
 

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };
 
  const isArabic = language === "ar";
  const highlight = isArabic ? highlightCopy.ar : highlightCopy.en;
  const { label: toggleLabel, aria: toggleAria } = toggleCopy[language];
  const underlineAlignment = isArabic ? "right-0 origin-right" : "left-0 origin-left";
  const isTop = !isScrolled;
  const navTextColorClass = isTop
    ? "text-white/80 hover:text-white"
    : "text-foreground/70 hover:text-foreground";
  const navIconColorClass = isTop ? "text-white" : "text-accent";
  const navUnderlineToneClass = isTop
    ? "bg-white/90"
    : "bg-gradient-to-r from-accent via-primary to-accent";
  const highlightChipClass = isTop
    ? "border border-white/50 bg-white/10 text-white/80"
    : "border border-border/70 bg-card/70 text-foreground/70";
  const highlightIconClass = isTop ? "text-white" : "text-accent";
  const languageIconButtonClass = isTop
    ? "border border-white/60 text-white hover:border-white/80 hover:text-white"
    : "border border-border/60";
  const languageDesktopButtonClass = isTop
    ? "border border-white/60 text-white hover:border-white/80 hover:text-white"
    : "border border-border/60";
  const menuButtonColorClass = isTop ? "text-white" : "";

  const handleLogin = () => {
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <nav
      dir={direction}
 
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-lg border-b border-border shadow-elevated"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
        <button
          type="button"
          onClick={() => scrollTo("#home")} 
          className="flex items-center gap-3" 
        >
          <div className="hidden sm:block">
            <BrandLogo
                variant="text"
                className="h-12"
                lang={language}
                dark={isTop ? true : undefined}
              />   </div> 
          <div className="text-lg font-semibold text-foreground sm:hidden">Avocat</div>
        </button>

        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map(({ href, icon: Icon, en, ar }) => {
            const label = isArabic ? ar : en;
            return (
              <button
                key={href}
                type="button"
                onClick={() => scrollTo(href)}
                className={`group relative flex items-center gap-2 text-sm font-medium tracking-wide transition-colors duration-300 ${navTextColorClass}`}
              >
                <Icon
                  className={`h-4 w-4 transition-transform duration-300 group-hover:scale-110 ${navIconColorClass}`}
                />
                <span className={`relative ${isArabic ? "text-right" : ""}`}>
                  {label}
                  <span
                    className={`absolute -bottom-1 block h-0.5 w-full scale-x-0 transform transition-transform duration-300 group-hover:scale-x-100 ${underlineAlignment} ${navUnderlineToneClass}`}
                  />
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
 
          <ThemeToggle />
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
  variant="warning" // 👈 شكل بطولي متدرج مع glow
  size="lg"
  className="hidden lg:inline-flex rounded-full"
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

      <div 
        className={`overflow-hidden border-t border-border/70 bg-background/95 backdrop-blur transition-all duration-300 lg:hidden ${
          isOpen ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-4 px-4 py-6"> 
          <div
            className={`flex items-center justify-between ${
              isArabic ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`flex items-center gap-2 rounded-full border border-border/70 px-3 py-1 text-xs text-foreground/70 ${
                isArabic ? "flex-row-reverse" : ""
              }`}
            >
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
            >
              {toggleLabel}
            </Button>
          </div>
          {navItems.map(({ href, icon: Icon, en, ar }) => {
            const label = isArabic ? ar : en;
            return (
              <button
                key={href}
                type="button"
                onClick={() => scrollTo(href)}
                className={`group flex w-full items-center justify-between rounded-xl border border-transparent px-4 py-3 text-left transition-all duration-300 hover:border-accent/40 hover:bg-accent/10 ${
                  isArabic ? "text-right" : ""
                }`}
              >
                <div className="flex items-center gap-3 text-foreground">
                  <Icon className="h-5 w-5 text-accent" />
                  <span className={`relative text-sm font-medium ${isArabic ? "text-right" : ""}`}>
                    {label}
                    <span
                      className={`absolute -bottom-0.5 block h-0.5 w-full scale-x-0 transform rounded-full bg-accent/80 transition-transform duration-300 group-hover:scale-x-100 ${underlineAlignment}`}
                    />
                  </span>
                </div>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  {href.replace('#', '')}
                </span>
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
