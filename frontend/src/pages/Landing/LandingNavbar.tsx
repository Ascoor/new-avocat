import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/theme-toggle";
import BrandLogo from "@/components/common/BrandLogo";
import { useLanguage } from "@/contexts/LanguageContext";
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

const navItems = [
  { href: "#home", icon: Scale, labelEn: "Home", labelAr: "الرئيسية" },
  { href: "#about", icon: BookOpenText, labelEn: "About", labelAr: "من نحن" },
  { href: "#services", icon: ShieldCheck, labelEn: "Services", labelAr: "الخدمات" },
  { href: "#capabilities", icon: Sparkles, labelEn: "Capabilities", labelAr: "الإمكانيات" },
  { href: "#achievements", icon: Award, labelEn: "Achievements", labelAr: "الإنجازات" },
  { href: "#team", icon: Users, labelEn: "Team", labelAr: "الفريق" },
  { href: "#insights", icon: BookOpenText, labelEn: "Insights", labelAr: "المدونة" },
  { href: "#contact", icon: Phone, labelEn: "Contact", labelAr: "اتصل بنا" },
];

const LandingNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

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

  const renderNavLabel = (labelEn: string, labelAr: string) => (
    <span className="text-sm font-medium tracking-wide">
      <span className="font-english">{labelEn}</span>
      <span className="mx-1 text-muted-foreground">|</span>
      <span className="font-arabic">{labelAr}</span>
    </span>
  );

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-lg border-b border-border shadow-elevated"
          : "bg-background/20 backdrop-blur"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
        <button
          onClick={() => scrollTo("#home")}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <div className="hidden sm:block">
            <BrandLogo variant="full" className="h-10" lang={language} />
          </div>
          <div className="sm:hidden text-lg font-display font-semibold text-foreground">
            Avocat
          </div>
        </button>

        <div className="hidden items-center space-x-6 rtl:space-x-reverse lg:flex">
          {navItems.map(({ href, icon: Icon, labelEn, labelAr }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className="group flex items-center space-x-2 rtl:space-x-reverse text-muted-foreground hover:text-primary transition"
            >
              <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              {renderNavLabel(labelEn, labelAr)}
              <span className="block h-0.5 w-0 bg-gradient-gold transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="hidden items-center space-x-3 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs uppercase tracking-widest text-muted-foreground backdrop-blur lg:flex">
            <Sparkles className="h-3 w-3 text-accent" />
            <span className="font-english">Legal Digital Transformation</span>
            <span className="text-muted-foreground">|</span>
            <span className="font-arabic">التحول الرقمي القانوني</span>
          </div>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center space-x-2 rtl:space-x-reverse"
          >
            <span className="font-english text-xs uppercase tracking-wide">
              {language === "en" ? "AR" : "EN"}
            </span>
            <span className="font-arabic text-sm">
              {language === "en" ? "العربية" : "English"}
            </span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur transition-all duration-300 ${
          isOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 px-4 py-6">
          {navItems.map(({ href, icon: Icon, labelEn, labelAr }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className="flex w-full items-center justify-between rounded-xl border border-transparent px-4 py-3 text-left transition-all duration-300 hover:border-accent/40 hover:bg-accent/10"
            >
              <div className="flex items-center space-x-3 rtl:space-x-reverse text-foreground">
                <Icon className="h-5 w-5 text-primary" />
                {renderNavLabel(labelEn, labelAr)}
              </div>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                {href.replace('#', '')}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
