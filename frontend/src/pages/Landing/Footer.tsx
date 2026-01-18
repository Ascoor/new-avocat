import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/theme-toggle";
import BrandLogo from "@/components/common/BrandLogo";
import { useLanguage } from "@/contexts/LanguageContext";
import { smoothScrollToElement } from "@/utils/smoothScroll";
import { Mail, ShieldCheck } from "lucide-react";

const Footer: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  const isArabic = language === "ar";

  const links = [
    { id: "home", en: "Home", ar: "الرئيسية" },
    { id: "services", en: "Services", ar: "الخدمات" },
    { id: "about", en: "Approach", ar: "المنهجية" },
    { id: "contact", en: "Contact", ar: "اتصل بنا" },
  ];

  const legal = [
    { en: "Privacy policy", ar: "سياسة الخصوصية" },
    { en: "Confidentiality", ar: "السرية المهنية" },
    { en: "Terms of service", ar: "شروط الخدمة" },
  ];

  return (
    <footer className="mt-16 border-t border-[hsl(var(--nav-border))] bg-[hsl(var(--surface-overlay))]">
      <div className="mx-auto grid max-w-screen-2xl gap-10 px-6 py-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="space-y-4">
          <BrandLogo variant="full" className="h-12 w-32" lang={language} />
          <p className="max-w-sm text-sm text-[hsl(var(--muted-foreground))]">
            {isArabic
              ? "منصة قانونية ترتكز على الدقة والحوكمة الذكية لبناء ثقة مستدامة مع العملاء." 
              : "A legal-tech platform grounded in precision and smart governance to build enduring client trust."}
          </p>
          <div className="flex items-center gap-3">
            <ThemeToggle tone="light" />
            <Button
              variant="outline"
              size="icon"
              onClick={toggleLanguage}
              className="rounded-full border-[hsl(var(--nav-border))]"
            >
              {isArabic ? "EN" : "AR"}
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-[hsl(var(--foreground))]">
            {isArabic ? "روابط سريعة" : "Quick links"}
          </p>
          <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  className="transition-colors hover:text-[hsl(var(--gold))]"
                  onClick={() => {
                    const element = document.getElementById(link.id);
                    if (element) smoothScrollToElement(element, { offset: 92 });
                  }}
                >
                  {isArabic ? link.ar : link.en}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-[hsl(var(--foreground))]">
            {isArabic ? "الالتزام القانوني" : "Legal"}
          </p>
          <ul className="space-y-2 text-sm text-[hsl(var(--muted-foreground))]">
            {legal.map((item) => (
              <li key={item.en}>
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[hsl(var(--gold))]" />
                  {isArabic ? item.ar : item.en}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
            <Mail className="h-4 w-4 text-[hsl(var(--gold))]" />
            contact@avocat.legal
          </div>
        </div>
      </div>

      <div className="border-t border-[hsl(var(--nav-border))] py-6 text-center text-xs text-[hsl(var(--muted-foreground))]">
        {isArabic
          ? "© 2024 أفوكات. جميع الحقوق محفوظة."
          : "© 2024 AVOCAT. All rights reserved."}
      </div>
    </footer>
  );
};

export default Footer;
