import { useCallback, useMemo } from 'react';
import type { ComponentType, SVGProps } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { BrainCircuit, Scale } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useWebsiteContent } from '@/hooks/useWebsiteContent';
import type { Locale } from '@/types/website';

const iconMap: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  legal_services: Scale,
  digital_ai_services: BrainCircuit,
};

const Services: React.FC = () => {
  const { language } = useLanguage();
  const locale = language as Locale;
  const isArabic = language === 'ar';
  const { contentBlocks, getLocalizedValue, getValueForLocale } = useWebsiteContent('services');

  const getString = useCallback(
    (key: string, fallback = ''): string => getValueForLocale<string>(key, locale) ?? fallback,
    [getValueForLocale, locale]
  );

  const groupKeys = useMemo(() => {
    const keys = new Set<string>();

    contentBlocks.forEach((block) => {
      const match = block.key.match(/^services_group_(.+)_title$/);
      if (match) {
        keys.add(match[1]);
      }
    });

    return Array.from(keys);
  }, [contentBlocks]);

  const groups = useMemo(
    () =>
      groupKeys.map((key) => {
        const itemsLocalized = getLocalizedValue<string[]>(`services_group_${key}_items`, {
          ar: [],
          en: [],
        });

        return {
          key,
          Icon: iconMap[key] ?? Scale,
          title: getString(`services_group_${key}_title`),
          description: getString(`services_group_${key}_description`),
          items: (itemsLocalized[locale] ?? itemsLocalized.en ?? []).filter(Boolean),
        };
      }),
    [getLocalizedValue, getString, groupKeys, locale]
  );

  const badge = getString('services_badge');
  const title = getString('services_title');
  const description = getString('services_description');
  const highlightOne = getString('services_highlight_1');
  const highlightTwo = getString('services_highlight_2');

  return (
    <section id="services" className="bg-surface-highlight/60 py-24" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2 text-xs font-semibold text-muted-foreground">
            <span>{badge}</span>
          </div>
          <h2 className="mt-6 text-4xl font-display font-bold text-foreground lg:text-5xl">{title}</h2>
          <p className="mt-4 text-lg text-muted-foreground lg:text-xl">{description}</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {groups.map((group) => {
            const { Icon } = group;

            return (
              <Card
                key={group.key}
                className="h-full border-border/80 bg-card/80 shadow-elevated backdrop-blur transition-transform duration-500 hover:-translate-y-2 hover:shadow-premium"
              >
                <CardContent className="space-y-8 p-8">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-gradient-gold p-3 text-accent-foreground shadow-gold">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground">{group.title}</h3>
                  </div>

                  <div className="space-y-4 text-base leading-relaxed text-muted-foreground" dir={isArabic ? 'rtl' : 'ltr'}>
                    <p>{group.description}</p>
                    <div className="flex flex-wrap gap-2" dir={isArabic ? 'rtl' : 'ltr'}>
                      {group.items.map((item) => (
                        <Badge
                          key={item}
                          variant="outline"
                          className="border-border bg-background/60 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground/90"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[highlightOne, highlightTwo]
            .filter(Boolean)
            .map((highlight) => (
              <div
                key={highlight}
                className="rounded-3xl border border-border bg-gradient-to-br from-primary/5 via-background to-background p-6 text-center shadow-ambient"
              >
                <p className="text-sm font-semibold text-primary">{highlight}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
