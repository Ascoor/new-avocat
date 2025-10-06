import BrandLogo from '@/components/common/BrandLogo';
import { useLanguage } from '@/contexts/LanguageContext';
import { useWebsiteContent } from '@/hooks/useWebsiteContent';
import { smoothScrollToElement } from '@/utils/smoothScroll';
import { Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';

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
  const locale = language as 'ar' | 'en';
  const currentYear = new Date().getFullYear();

  const { getLocalizedValue, getValueForLocale } = useWebsiteContent('footer');

  // ===== Content =====
  const mission = (getValueForLocale('footer_mission', locale) ?? '') as string;

  const quickLinksLocalized = getLocalizedValue<QuickLink[]>('footer_quick_links', {
    ar: [],
    en: [],
  });
  const quickLinks = (quickLinksLocalized[locale] ?? quickLinksLocalized.en ?? []).filter(Boolean);

  const serviceHighlightsLocalized = getLocalizedValue<string[]>('footer_services', {
    ar: [],
    en: [],
  });
  const serviceHighlights = (serviceHighlightsLocalized[locale] ?? serviceHighlightsLocalized.en ?? []).filter(Boolean);

  const contactDetailsLocalized = getLocalizedValue<ContactDetail[]>('footer_contact_details', {
    ar: [],
    en: [],
  });
  const contactDetails = (contactDetailsLocalized[locale] ?? contactDetailsLocalized.en ?? []).filter(Boolean);

  const scrollTo = (href: string) => {
    const element = document.querySelector<HTMLElement>(href);
    if (element) smoothScrollToElement(element, { offset: 90, duration: 950 });
  };

  const headingClass = 'text-base sm:text-lg font-semibold neon-text drop-shadow-md';
  const linkClass =
    'group inline-flex items-center gap-2 text-sm sm:text-base text-primary-foreground/80 transition-colors duration-300 hover:text-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent';

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-primary-foreground">
      <div className="pointer-events-none absolute inset-0 opacity-80 mix-blend-screen" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(57,255,242,0.12),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(0,255,188,0.08),_transparent_60%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* ===== Brand Section ===== */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <BrandLogo variant="full" className="h-12" lang={language} dark />
              <span className="sr-only">Avocat</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
              {mission}
            </p>
            <div className="h-1 w-24 rounded-full neon-divider" />
          </div>

          {/* ===== Quick Links ===== */}
          <div className="space-y-4 sm:justify-self-center sm:text-center lg:justify-self-start lg:text-left">
            <h4 className={headingClass}>
              {direction === 'rtl' ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollTo(link.href);
                    }}
                    className={linkClass}
                  >
                    <span className="inline-flex h-2 w-2 rounded-full bg-neon/60 transition-transform duration-300 group-hover:scale-125" />
                    <span className="text-sm sm:text-base font-medium">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== Services ===== */}
          <div className="space-y-4 sm:justify-self-center sm:text-center lg:justify-self-start lg:text-left">
            <h4 className={headingClass}>
              {direction === 'rtl' ? 'خدماتنا' : 'Our Services'}
            </h4>
            <ul className="space-y-3 text-sm sm:text-base">
              {serviceHighlights.map((service, index) => (
                <li key={`${service}-${index}`} className="text-primary-foreground/75 transition-colors hover:text-neon">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* ===== Contact Info ===== */}
          <div className="space-y-4">
            <h4 className={headingClass}>
              {direction === 'rtl' ? 'معلومات التواصل' : 'Contact Info'}
            </h4>
            <div className="space-y-4 text-sm sm:text-base">
              {contactDetails.map((detail, index) => {
                const Icon =
                  detail.icon === 'phone'
                    ? Phone
                    : detail.icon === 'mail'
                    ? Mail
                    : detail.icon === 'map'
                    ? MapPin
                    : detail.icon === 'linkedin'
                    ? Linkedin
                    : detail.icon === 'twitter'
                    ? Twitter
                    : null;

                return (
                  <div
                    key={`${detail.icon ?? 'info'}-${index}`}
                    className="flex items-start gap-3 text-primary-foreground/85"
                  >
                    {Icon && <Icon className="h-5 w-5 flex-shrink-0 text-neon" />}
                    <span className="leading-relaxed">{detail.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ===== Bottom Bar ===== */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p className="neon-text-muted text-xs font-medium uppercase tracking-[0.2em] sm:text-sm">
              {direction === 'rtl'
                ? `© ${currentYear} مكتب أفوكات للمحاماة. جميع الحقوق محفوظة.`
                : `© ${currentYear} Avocat Law Firm. All rights reserved.`}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-end">
              <a href="#" className={`${linkClass} text-sm sm:text-base`}>
                {direction === 'rtl' ? 'سياسة الخصوصية' : 'Privacy Policy'}
              </a>
              <a href="#" className={`${linkClass} text-sm sm:text-base`}>
                {direction === 'rtl' ? 'الشروط والأحكام' : 'Terms of Service'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
