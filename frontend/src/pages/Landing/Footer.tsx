import BrandLogo from "@/components/common/BrandLogo";
import { useLanguage } from "@/contexts/LanguageContext"; 
import { SocialGroup } from "./SocialGroup";  
import { smoothScrollToElement } from "@/utils/smoothScroll";
import { Linkedin, Mail, MapPin, Phone, Scale, Shield, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

const quickLinks = [
  { href: "#home", en: "Home", ar: "الرئيسية" },
  { href: "#about", en: "About", ar: "من نحن" },
  { href: "#services", en: "Services", ar: "الخدمات" },
  { href: "#capabilities", en: "Capabilities", ar: "الإمكانيات" },
  { href: "#achievements", en: "Achievements", ar: "الإنجازات" },
  { href: "#team", en: "Team", ar: "الفريق" },
  { href: "#insights", en: "Insights", ar: "المدونة" },
  { href: "#contact", en: "Contact", ar: "اتصل بنا" },
];

const serviceHighlights = [
  { en: "Litigation & Arbitration", ar: "التقاضي والتحكيم" },
  { en: "Digital Case Management", ar: "إدارة القضايا الرقمية" },
  { en: "AI Legal Research", ar: "البحث القانوني بالذكاء الاصطناعي" },
  { en: "Cybersecurity Advisory", ar: "استشارات الأمن السيبراني" },
];
const contactDetails = [
  {
    icon: MapPin,
    en: "Downtown Cairo Smart District, Nile Corniche",
    ar: "منطقة القاهرة الذكية – كورنيش النيل",
  },
  {
    icon: Phone,
    en: "+20 2 1234 5678 | +971 4 567 8900",
    ar: "+٢٠ ٢ ١٢٣٤ ٥٦٧٨ | +٩٧١ ٤ ٥٦٧ ٨٩٠٠",
  },
  {
    icon: Mail,
    en: "contact@avocatlaw.com",
    ar: "contact@avocatlaw.com",
  },
  {
    icon: Shield,
    en: "GDPR, DIFC, and NCA compliant digital infrastructure.",
    ar: "بنية رقمية متوافقة مع لوائح GDPR وDIFC والهيئة الوطنية للأمن السيبراني.",
  },
];

const footerCopy = {
  en: {
    mission:
      "Pioneering legal digital transformation across the Middle East and North Africa with prestige, innovation, and unwavering trust.",
    highlight: "Legal Digital Transformation",
    quickLinks: "Quick Links",
    services: "Signature Services",
    subscribeTitle: "Subscribe for Insights",
    subscribeBody:
      "Receive monthly briefings on AI in law, cybersecurity directives, and smart justice reforms.",
    contact: "Contact",
    bottom: (year: number) => `© ${year} Avocat Law Firm. All rights reserved.`,
  },
  ar: {
    mission:
      "رواد التحول الرقمي القانوني في الشرق الأوسط وشمال أفريقيا بفخامة وابتكار وثقة راسخة.",
    highlight: "التحول الرقمي القانوني",
    quickLinks: "الروابط السريعة",
    services: "خدماتنا المميزة",
    subscribeTitle: "اشترك في الرؤى",
    subscribeBody:
      "احصل على موجز شهري حول الذكاء الاصطناعي في القانون وتوجيهات الأمن السيبراني وإصلاحات العدالة الذكية.",
    contact: "تواصل",
    bottom: (year: number) => `© ${year} مكتب أفوكات للمحاماة. جميع الحقوق محفوظة.`,
  },
};

const Footer: React.FC = () => {
  const { language, direction } = useLanguage();
  const isArabic = language === "ar";
  const copy = footerCopy[language];


  const scrollTo = (href: string) => {
    const element = document.querySelector<HTMLElement>(href);
    if (element) {
      smoothScrollToElement(element, { offset: 90, duration: 950 });
    }
  };

  return (
 
    <footer
      className={cn(
        "relative mt-24 overflow-hidden transition-colors",
        "bg-gradient-to-t from-primary/90 via-primary/80 to-primary/95 text-white",
        "dark:bg-gradient-to-t dark:from-background/96 dark:via-background/92 dark:to-background/98 dark:text-foreground"
      )}
      dir={direction}
    >

      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-10 top-16 h-48 w-48 rounded-full bg-accent/70 blur-3xl dark:bg-accent/40" />
        <div className="absolute right-0 bottom-10 h-56 w-56 rounded-full bg-white/50 blur-3xl dark:bg-primary/30" />
      </div>
      <div className="relative">
        <div className="container mx-auto grid gap-12 px-4 py-16 lg:grid-cols-4 lg:px-8">
          <div className="space-y-6">
            <BrandLogo variant="full" className="h-12" lang={language} dark /> 
             
  <SocialGroup />
 

          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-white dark:text-foreground">{copy.quickLinks}</h3>
            <ul className="mt-6 space-y-3 text-sm text-white/80 dark:text-foreground/70">
              {quickLinks.map((link) => {
                const label = isArabic ? link.ar : link.en;
                return (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="flex w-full items-center justify-between rounded-xl border border-transparent px-3 py-2 text-left transition-all duration-300 hover:border-white/40 hover:bg-white/10 dark:hover:border-foreground/30 dark:hover:bg-foreground/10"
                    >
                      <span>{label}</span>
                      <span className="text-xs uppercase tracking-widest text-white/60 dark:text-foreground/50">
                        {link.href.replace('#', '')}
                      </span>
                    </button>
                  </li>
                );
              })}
             </ul>
          </div>

          <div>
              <h3 className="font-display text-lg font-semibold text-white dark:text-foreground">{copy.services}</h3>
            <ul className="mt-6 space-y-3 text-sm text-white/80 dark:text-foreground/70">
              {serviceHighlights.map((service) => {
                const text = isArabic ? service.ar : service.en;
                return (
                  <li
                    key={service.en}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 dark:border-foreground/20 dark:bg-foreground/5"
                  >
                    {text}
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 rounded-3xl border border-white/20 bg-white/10 p-5 dark:border-foreground/20 dark:bg-foreground/5">
              <h4 className="font-display text-base font-semibold text-white dark:text-foreground">{copy.subscribeTitle}</h4>
              <p className="mt-2 text-xs text-white/80 dark:text-foreground/70">{copy.subscribeBody}</p>
              </div>
          </div>
         <div className="space-y-5">
            <h3 className="font-display text-lg font-semibold text-white">{copy.contact}</h3>
            <div className="space-y-4 text-sm text-white/80">
              {contactDetails.map((detail) => {
                const Icon = detail.icon;
                const text = isArabic ? detail.ar : detail.en;
                return (
                  <div key={detail.en} className="flex items-start gap-3">
                    <Icon className="mt-1 h-5 w-5" />
                    <p>{text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-primary/95">
          <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-white/80 lg:flex-row lg:px-8">
            <p>{copy.bottom(new Date().getFullYear())}</p>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
