import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import BrandLogo from "@/components/common/BrandLogo";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/theme-toggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const LandingNavbar: React.FC = () => {
  const { t, isRTL, language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { key: "home", href: "#hero", label: t("landing.nav.home") },
    { key: "features", href: "#features", label: t("landing.nav.features") },
    { key: "services", href: "#services", label: t("landing.nav.services") },
    { key: "about", href: "#about", label: t("landing.nav.about") },
    { key: "contact", href: "#contact", label: t("landing.nav.contact") },
  ];

  const languageToggleLabel =
    language === "ar"
      ? t("landing.nav.languageToggle.toEnglish")
      : t("landing.nav.languageToggle.toArabic");

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const toggleLang = () => {
    setLanguage(language === "ar" ? "en" : "ar");
  };

  const getNavTextColor = () => {
    if (isScrolled) return "text-foreground hover:text-primary";
    return theme === "dark"
      ? "text-text-inverse hover:text-text-subtle"
      : "text-text-strong hover:text-primary";
  };

  return (
    <>
      <nav
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
          isScrolled
            ? "border-b border-border bg-background/90 backdrop-blur-lg shadow-card"
            : "bg-transparent",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Display dark BrandLogo before scroll and theme-based after scroll */}
            <BrandLogo
              variant="text"
              className="h-12"
              lang={language}
              dark={isScrolled ? theme === "dark" : true} // Ensure dark before scroll
            />
 

            <div className="hidden items-center space-x-8 rtl:space-x-reverse lg:flex">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className={cn("text-sm font-medium transition-colors", getNavTextColor())}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="hidden items-center space-x-4 rtl:space-x-reverse lg:flex">
              <ThemeToggle />

              <Button
                onClick={toggleLang}
                size="sm"
                variant="outline"
                className={cn(
                  "font-medium",
                  isScrolled
                    ? "border-border text-foreground hover:text-primary"
                    : theme === "dark"
                      ? "border-border text-foreground hover:bg-foreground/10"
                      : "border-border text-text-strong hover:text-primary",
                )}
              >
                {languageToggleLabel}
              </Button>

              <Button
                asChild
                variant="ghost"
                size="sm"
                className={cn("font-medium", getNavTextColor())}
              >
                <Link to="/login">{t("landing.nav.login")}</Link>
              </Button>

              <Button asChild size="sm" variant="hero" className="font-medium">
                <Link to="/register">{t("landing.nav.signup")}</Link>
              </Button>
            </div>

            <div className="flex items-center space-x-2 rtl:space-x-reverse lg:hidden">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen((prev) => !prev)}
                className={getNavTextColor()}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-0 top-16 z-40 px-4 lg:hidden"
          >
            <div className="container mx-auto">
              <div className="space-y-4 rounded-xl border border-border bg-surface-muted p-4 shadow-card">
                <div className={cn("flex flex-col gap-2", isRTL ? "text-right" : "text-left")}>
                  {navItems.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => scrollToSection(item.href)}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-text-strong transition-colors duration-200 ease-smooth hover:bg-accent-soft"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col gap-3 border-t border-border pt-4">
                  <Button
                    onClick={toggleLang}
                    variant="outline"
                    className="justify-center border-border text-sm font-medium text-text-strong hover:text-primary"
                  >
                    {languageToggleLabel}
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    className="justify-center text-sm font-medium text-text-strong hover:text-primary"
                  >
                    <Link to="/login">{t("landing.nav.login")}</Link>
                  </Button>
                  <Button asChild variant="hero" className="justify-center text-sm font-semibold">
                    <Link to="/register">{t("landing.nav.signup")}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LandingNavbar;
