import BrandLogo from '@/components/common/BrandLogo';
import { useLanguage } from '@/contexts/LanguageContext';
import { useWebsiteContent } from '@/hooks/useWebsiteContent';
import { SocialGroup } from './SocialGroup';
import { smoothScrollToElement } from '@/utils/smoothScroll';
import { Linkedin, Mail, MapPin, Phone, Scale, Shield, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickLink {
  href: string;
  label: string;
}

interface ContactDetail {
  icon: string;
  text: string;
}

const iconLookup: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
  phone: Phone,
  map: MapPin,
  scale: Scale,
  shield: Shield,
};

const Footer: React.FC = () => {
  const { direction,language } = useLanguage();

  const currentYear = new Date().getFullYear();

  const locale = language as 'ar' | 'en';
  const { getLocalizedValue, getValueForLocale } = useWebsiteContent('footer');

  const mission = getValueForLocale('footer_mission', locale) ?? '';
  const highlight = getValueForLocale('footer_highlight', locale) ?? '';
  const subscribe = getLocalizedValue<{ title?: string; body?: string }>('footer_subscribe', {
    ar: { title: '', body: '' },
    en: { title: '', body: '' },
  });
  const subscribeCopy = subscribe[locale] ?? subscribe.en ?? { title: '', body: '' };
  const bottom = getValueForLocale('footer_bottom', locale) ?? '';

  const quickLinksLocalized = getLocalizedValue<QuickLink[]>('footer_quick_links', {
    ar: [],
    en: [],
  });
  const quickLinks = (quickLinksLocalized[locale] ?? quickLinksLocalized.en ?? []).filter(
    (link): link is QuickLink => Boolean(link?.href)
  );

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
    if (element) {
      smoothScrollToElement(element, { offset: 90, duration: 950 });
    }
  };

  return (
    <footer className="bg-gradient-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
    
              <div className="flex flex-col">
                     <BrandLogo variant="full" className="h-12" lang={language} dark />
                      </div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              {direction === 'rtl' 
                ? 'رائدون في التحول الرقمي القانوني، نقدم حلولاً متطورة للممارسات القانونية الحديثة.'
                : 'Leading legal digital transformation with advanced solutions for modern legal practices.'
              }
            </p>
          </div>
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-primary-foreground">
              {direction === 'rtl' ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="space-y-2">
              {[
                { key: 'home', href: '#home' },
                { key: 'about', href: '#about' },
                { key: 'services', href: '#services' },
                { key: 'contact', href: '#contact' }
              ].map((link) => (
                <li key={link.key}>
                  <a 
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-gold transition-colors duration-300"
                  >
                    {direction === 'rtl' 
                      ? ({ home: 'الرئيسية', about: 'من نحن', services: 'خدماتنا', contact: 'اتصل بنا' })[link.key]
                      : ({ home: 'Home', about: 'About Us', services: 'Services', contact: 'Contact' })[link.key]
                    }
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-primary-foreground">
              {direction === 'rtl' ? 'خدماتنا' : 'Our Services'}
            </h4>
            <ul className="space-y-2">
              {[
                direction === 'rtl' ? 'أنظمة الإدارة القانونية' : 'Legal Management',
                direction === 'rtl' ? 'حماية البيانات' : 'Data Protection',
                direction === 'rtl' ? 'التدريب القانوني' : 'Legal Training',
                direction === 'rtl' ? 'الخدمات الحكومية' : 'Government Services'
              ].map((service, index) => (
                <li key={index}>
                  <span className="text-primary-foreground/70 hover:text-gold transition-colors duration-300 cursor-pointer">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-primary-foreground">
              {direction === 'rtl' ? 'معلومات التواصل' : 'Contact Info'}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-primary-foreground/80">+966 11 234 5678</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-primary-foreground/80">info@avocat.sa</span>
              </div>
              <div className="flex items-start space-x-3 rtl:space-x-reverse">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80">
                  {direction === 'rtl' ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/70 text-sm">
              {direction === 'rtl' 
                ? `© ${currentYear} مكتب أفوكات للمحاماة. جميع الحقوق محفوظة.`
                : `© ${currentYear} Avocat Law Firm. All rights reserved.`
              }
            </p>
            <div className="flex space-x-6 rtl:space-x-reverse">
              <a href="#" className="text-primary-foreground/70 hover:text-gold transition-colors duration-300 text-sm">
                {direction === 'rtl' ? 'سياسة الخصوصية' : 'Privacy Policy'}
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-gold transition-colors duration-300 text-sm">
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
