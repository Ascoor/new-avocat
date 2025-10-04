import BrandLogo from '@/components/common/BrandLogo';
import { useLanguage } from '@/contexts/LanguageContext';
import { useWebsiteContent } from '@/hooks/useWebsiteContent';
import { smoothScrollToElement } from '@/utils/smoothScroll';
import { Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  return (
    <footer className="bg-gradient-primary text-primary-foreground shadow-luxury">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* ===== Brand Section ===== */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <BrandLogo variant="full" className="h-12" lang={language} dark />
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">{mission}</p>
          </div>

          {/* ===== Quick Links ===== */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-primary-foreground">
              {direction === 'rtl' ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="text-primary-foreground/70 hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== Services ===== */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-primary-foreground">
              {direction === 'rtl' ? 'خدماتنا' : 'Our Services'}
            </h4>
            <ul className="space-y-2">
              {serviceHighlights.map((service, idx) => (
                <li key={idx}>
                  <span className="text-primary-foreground/70 hover:text-gold transition-colors duration-300 cursor-pointer">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== Contact Info ===== */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-primary-foreground">
              {direction === 'rtl' ? 'معلومات التواصل' : 'Contact Info'}
            </h4>
            <div className="space-y-3">
              {contactDetails.map((detail, idx) => {
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
                    key={idx}
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                  >
                    {Icon && <Icon className="w-5 h-5 text-gold flex-shrink-0" />}
                    <span className="text-primary-foreground/80">{detail.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ===== Bottom Bar ===== */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/70 text-sm">
              {direction === 'rtl'
                ? `© ${currentYear} مكتب أفوكات للمحاماة. جميع الحقوق محفوظة.`
                : `© ${currentYear} Avocat Law Firm. All rights reserved.`}
            </p>
            <div className="flex space-x-6 rtl:space-x-reverse">
              <a
                href="#"
                className="text-primary-foreground/70 hover:text-gold transition-colors duration-300 text-sm"
              >
                {direction === 'rtl' ? 'سياسة الخصوصية' : 'Privacy Policy'}
              </a>
              <a
                href="#"
                className="text-primary-foreground/70 hover:text-gold transition-colors duration-300 text-sm"
              >
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
