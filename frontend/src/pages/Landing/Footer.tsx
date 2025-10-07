import BrandLogo from "@/components/common/BrandLogo";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import { smoothScrollToElement } from "@/utils/smoothScroll";
import { Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";

interface QuickLink {
  href: string;
  label: string;
}

interface ContactDetail {
  icon: string;
  text: string;
}

const Footer: React.FC = () => {
  const { direction, language } = useLanguage();
  const locale = language as "ar" | "en";
  const currentYear = new Date().getFullYear();

  const { getLocalizedValue, getValueForLocale } = useWebsiteContent("footer");

  // ===== محتوى CMS =====
  const mission = (getValueForLocale("footer_mission", locale) ?? "") as string;

  const quickLinksLocalized = getLocalizedValue<QuickLink[]>("footer_quick_links", {
    ar: [],
    en: [],
  });
  const quickLinks =
    (quickLinksLocalized[locale] ?? quickLinksLocalized.en ?? []).filter(Boolean);

  const serviceHighlightsLocalized = getLocalizedValue<string[]>("footer_services", {
    ar: [],
    en: [],
  });
  const serviceHighlights =
    (serviceHighlightsLocalized[locale] ?? serviceHighlightsLocalized.en ?? []).filter(Boolean);

  const contactDetailsLocalized = getLocalizedValue<ContactDetail[]>("footer_contact_details", {
    ar: [],
    en: [],
  });
  const contactDetails =
    (contactDetailsLocalized[locale] ?? contactDetailsLocalized.en ?? []).filter(Boolean);

  const scrollTo = (href: string) => {
    const element = document.querySelector<HTMLElement>(href);
    if (element) smoothScrollToElement(element, { offset: 90, duration: 950 });
  };

  const headingClass =
    "font-semibold text-lg sm:text-xl text-white dark:text-slate-100 mb-4 font-cairo";
  const linkClass =
    "text-slate-300 dark:text-slate-400 hover:text-accent dark:hover:text-accent transition-colors duration-300 text-sm inline-block hover:translate-x-1 rtl:hover:-translate-x-1";

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800/70 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-black border-t border-border/50">
      {/* تأثير النيون الخفيف */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-primary/5 to-accent/5 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* ===== الشبكة الرئيسية ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* ===== الشعار والمهمة ===== */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <div className="flex flex-col">
                <BrandLogo variant="full" className="h-8 w-8" />
             
              
              </div>
            </div>

  <p className="text-slate-300 dark:text-slate-400 leading-relaxed text-sm max-w-xs">
    {mission
      ? mission
      : language === "ar"
        ? "رائدون في التحول الرقمي القانوني، نقدم حلولاً متطورة للممارسات القانونية الحديثة."
        : "Leading legal digital transformation with advanced solutions for modern legal practices."}
  </p>
          </div>

          {/* ===== الروابط السريعة ===== */}
          <div className="space-y-4">
            <h4 className={headingClass}>
              {direction === "rtl" ? "روابط سريعة" : "Quick Links"}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className={linkClass}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== الخدمات ===== */}
          <div className="space-y-4">
            <h4 className={headingClass}>
              {direction === "rtl" ? "خدماتنا" : "Our Services"}
            </h4>
            <ul className="space-y-3">
              {serviceHighlights.length > 0
                ? serviceHighlights.map((service, i) => (
                    <li key={i}>
                      <span className="text-slate-300 dark:text-slate-400 hover:text-gold dark:hover:text-gold transition-colors duration-300 cursor-pointer text-sm inline-block hover:translate-x-1 rtl:hover:-translate-x-1">
                        {service}
                      </span>
                    </li>
                  ))
                : [
                    direction === "rtl" ? "أنظمة الإدارة القانونية" : "Legal Management",
                    direction === "rtl" ? "حماية البيانات" : "Data Protection",
                    direction === "rtl" ? "التدريب القانوني" : "Legal Training",
                    direction === "rtl" ? "الخدمات الحكومية" : "Government Services",
                  ].map((s, i) => (
                    <li key={i}>
                      <span className="text-slate-300 dark:text-slate-400 hover:text-gold transition-colors duration-300 text-sm inline-block hover:translate-x-1 rtl:hover:-translate-x-1">
                        {s}
                      </span>
                    </li>
                  ))}
            </ul>
          </div>

          {/* ===== معلومات التواصل ===== */}
          <div className="space-y-4">
            <h4 className={headingClass}>
              {direction === "rtl" ? "معلومات التواصل" : "Contact Info"}
            </h4>
            <div className="space-y-4">
              {contactDetails.length > 0
                ? contactDetails.map((detail, i) => {
                    const Icon =
                      detail.icon === "phone"
                        ? Phone
                        : detail.icon === "mail"
                        ? Mail
                        : detail.icon === "map"
                        ? MapPin
                        : detail.icon === "linkedin"
                        ? Linkedin
                        : detail.icon === "twitter"
                        ? Twitter
                        : null;

                    return (
                      <div
                        key={i}
                        className="flex items-center space-x-3 rtl:space-x-reverse group"
                      >
                        {Icon && (
                          <Icon className="w-5 h-5 text-gold flex-shrink-0 group-hover:scale-110 transition-transform" />
                        )}
                        <span className="text-slate-300 dark:text-slate-400 text-sm">
                          {detail.text}
                        </span>
                      </div>
                    );
                  })
                : [
                    {
                      icon: Phone,
                      text: "+966 11 234 5678",
                    },
                    {
                      icon: Mail,
                      text: "info@avocat.sa",
                    },
                    {
                      icon: MapPin,
                      text:
                        direction === "rtl"
                          ? "الرياض، المملكة العربية السعودية"
                          : "Riyadh, Saudi Arabia",
                    },
                  ].map((d, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-3 rtl:space-x-reverse group"
                    >
                      <d.icon className="w-5 h-5 text-gold flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-slate-300 dark:text-slate-400 text-sm">
                        {d.text}
                      </span>
                    </div>
                  ))}
            </div>
          </div>
        </div>

        {/* ===== الشريط السفلي ===== */}
        <div className="border-t border-slate-700/50 dark:border-slate-800/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 gap-4">
            <p className="text-slate-400 dark:text-slate-500 text-sm text-center md:text-left">
              {direction === "rtl"
                ? `© ${currentYear} مكتب أفوكات للمحاماة. جميع الحقوق محفوظة.`
                : `© ${currentYear} Avocat Law Firm. All rights reserved.`}
            </p>
            <div className="flex flex-wrap justify-center gap-6 rtl:space-x-reverse">
              <a
                href="#"
                className="text-slate-400 dark:text-slate-500 hover:text-accent dark:hover:text-accent transition-colors duration-300 text-sm"
              >
                {direction === "rtl" ? "سياسة الخصوصية" : "Privacy Policy"}
              </a>
              <a
                href="#"
                className="text-slate-400 dark:text-slate-500 hover:text-accent dark:hover:text-accent transition-colors duration-300 text-sm"
              >
                {direction === "rtl" ? "الشروط والأحكام" : "Terms of Service"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
