import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { 
  Sun, Moon, Globe, Menu, X,
  Scale, Shield, FileText, Users, Phone
} from "lucide-react";
import ThemeToggle from "@/components/ui/theme-toggle";

const LandingNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { key: "home", icon: Scale, href: "#home" },
    { key: "features", icon: Shield, href: "#features" },
    { key: "services", icon: FileText, href: "#services" },
    { key: "about", icon: Users, href: "#about" },
    { key: "contact", icon: Phone, href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-elevated"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="w-10 h-10 bg-gradient-gold rounded-lg flex items-center justify-center animate-glow">
            <Scale className="w-6 h-6 text-accent-foreground" />
          </div>
          <span className="text-2xl font-display font-bold text-foreground">
            Avocat {language === "ar" && <span className="text-accent">أفوكات</span>}
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => scrollTo(item.href)}
              className="group flex items-center space-x-2 rtl:space-x-reverse text-foreground hover:text-primary transition"
            >
              <item.icon className="w-4 h-4 group-hover:scale-110 transition" />
              <span className="relative font-medium">
                {t(item.key)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-gold transition-all duration-300 group-hover:w-full"></span>
              </span>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <ThemeToggle />

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center space-x-2 hover:bg-accent/20"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm">{language === "en" ? "العربية" : "English"}</span>
          </Button>

          <div className="hidden lg:flex space-x-3">
            <Button variant="ghost">{t("login")}</Button>
            <Button className="btn-premium">{t("signup")}</Button>
          </div>

          {/* Mobile Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 p-0"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="py-6 border-t border-border bg-card/80 backdrop-blur-md rounded-b-xl">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollTo(item.href)}
                className="flex items-center space-x-3 px-4 py-3 text-foreground hover:text-primary hover:bg-accent/10 transition"
              >
                <item.icon className="w-5 h-5" />
                <span>{t(item.key)}</span>
              </button>
            ))}

            <div className="flex flex-col space-y-3 px-4 pt-4 border-t border-border">
              <Button variant="ghost">{t("login")}</Button>
              <Button className="btn-premium">{t("signup")}</Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
