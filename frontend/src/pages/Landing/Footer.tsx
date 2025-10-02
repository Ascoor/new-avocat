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
  const { language, direction } = useLanguage();
  const isArabic = language === 'ar';
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
    <footer
      className={cn(
        'relative mt-24 overflow-hidden transition-colors bg-gradient-to-t from-primary/90 via-primary/90 to-primary/95 text-white dark:text-foreground'
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
            <p className="text-sm text-white/80 dark:text-foreground/70">{mission}</p>
            <p className="text-xs uppercase tracking-widest text-accent">{highlight}</p>
            <SocialGroup />
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-white dark:text-foreground">
              {getValueForLocale('footer_quick_links_title', locale) ?? ''}
            </h3>
            <ul className="mt-6 space-y-3 text-sm text-white/80 dark:text-foreground/70">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="flex w-full items-center justify-between rounded-xl border border-transparent px-3 py-2 text-left transition-all duration-300 hover:border-white/40 hover:bg-white/10 dark:hover:border-foreground/30 dark:hover:bg-foreground/10"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs uppercase tracking-widest text-white/60 dark:text-foreground/50">
                      {link.href.replace('#', '')}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-white dark:text-foreground">
              {getValueForLocale('footer_services_title', locale) ?? ''}
            </h3>
            <ul className="mt-6 space-y-3 text-sm text-white/80 dark:text-foreground/70">
              {serviceHighlights.map((service) => (
                <li
                  key={service}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 dark:border-foreground/20 dark:bg-foreground/5"
                >
                  {service}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-3xl border border-white/20 bg-white/10 p-5 dark:border-foreground/20 dark:bg-foreground/5">
              <h4 className="font-display text-base font-semibold text-white dark:text-foreground">
                {subscribeCopy.title}
              </h4>
              <p className="mt-2 text-xs text-white/80 dark:text-foreground/70">{subscribeCopy.body}</p>
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="font-display text-lg font-semibold text-white dark:text-foreground">
              {getValueForLocale('footer_contact_title', locale) ?? ''}
            </h3>
            <div className="space-y-4 text-sm text-white/80 dark:text-foreground/70">
              {contactDetails.map((detail, index) => {
                const Icon = iconLookup[detail.icon.toLowerCase()] ?? MapPin;
                return (
                  <div key={`${detail.icon}-${index}`} className="flex items-start gap-3">
                    <Icon className="mt-1 h-5 w-5 text-white/80 dark:text-foreground/70" />
                    <p>{detail.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-primary/95 dark:border-foreground/20 dark:bg-background/95">
          <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-white/80 dark:text-foreground/60 lg:flex-row lg:px-8">
            <p>{bottom}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
