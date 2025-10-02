import { useCallback, useMemo } from 'react';
import { Cpu, Layers, ShieldEllipsis } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useWebsiteContent } from '@/hooks/useWebsiteContent';
import type { ContentBlock, Locale } from '@/types/website';

const iconLookup: Record<string, typeof Layers> = {
  layers: Layers,
  cpu: Cpu,
  shieldellipsis: ShieldEllipsis,
};

const Capabilities: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  const locale = language as Locale;
  const { contentBlocks, getValueForLocale } = useWebsiteContent('capabilities');

  const getString = useCallback(
    (key: string, fallback = ''): string => getValueForLocale<string>(key, locale) ?? fallback,
    [getValueForLocale, locale]
  );

  const header = {
    badge: getString('capabilities_badge'),
    title: getString('capabilities_title'),
    subtitle: getString('capabilities_subtitle'),
  };

  const capabilities = useMemo(() => {
    return contentBlocks
      .filter((block) => block.key.startsWith('capabilities_item_'))
      .map((block) => mapCapability(block, locale));
  }, [contentBlocks, locale]);

  return (
    <section id="capabilities" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/15 to-background" />

      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center justify-center rounded-full border border-border bg-card px-5 py-2 text-xs uppercase tracking-widest text-muted-foreground">
            <span className={isArabic ? 'font-arabic' : 'font-english'}>{header.badge}</span>
          </div>
          <h2
            className={`mt-6 text-4xl font-display font-bold lg:text-5xl ${
              isArabic ? 'text-accent font-arabic' : 'text-foreground font-english'
            }`}
          >
            {header.title}
          </h2>
          <p
            className={`mt-4 text-lg lg:text-xl leading-relaxed text-muted-foreground ${
              isArabic ? 'font-arabic text-accent/90' : 'font-english'
            }`}
          >
            {header.subtitle}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {capabilities.map((capability, index) => {
            const Icon = capability.Icon;
            const cardPoints = capability.points;

            return (
              <div
                key={`${capability.title}-${index}`}
                className="h-full rounded-3xl border border-border bg-card/80 p-8 shadow-elevated backdrop-blur transition-transform duration-500 hover:-translate-y-2 hover:shadow-premium"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3
                    className={`${
                      isArabic
                        ? 'font-arabic text-lg font-semibold text-accent'
                        : 'font-english text-xl font-semibold text-foreground'
                    }`}
                  >
                    {capability.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  <p
                    className={`leading-relaxed text-muted-foreground ${
                      isArabic ? 'font-arabic' : 'font-english'
                    }`}
                  >
                    {capability.description}
                  </p>

                  <ul className="space-y-3 border-l-2 border-accent pl-5">
                    {cardPoints.map((point, i) => (
                      <li key={i} className="relative">
                        <span className="absolute -left-[18px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-accent bg-card text-xs font-bold text-accent">
                          {i + 1}
                        </span>
                        <span
                          className={`leading-relaxed ${
                            isArabic ? 'font-arabic text-right' : 'font-english'
                          }`}
                        >
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

function mapCapability(block: ContentBlock, locale: Locale) {
  const localized = block.value as unknown as {
    ar?: {
      icon?: string;
      title?: string;
      description?: string;
      points?: string[];
    } | null;
    en?: {
      icon?: string;
      title?: string;
      description?: string;
      points?: string[];
    } | null;
  };

  const fallback = localized.en ?? {};
  const data = localized[locale] ?? fallback ?? {};
  const iconKey = (data.icon ?? fallback.icon ?? 'Layers').toLowerCase();
  const Icon = iconLookup[iconKey] ?? Layers;

  return {
    Icon,
    title: data.title ?? fallback.title ?? '',
    description: data.description ?? fallback.description ?? '',
    points: (data.points ?? fallback.points ?? []).filter(Boolean),
  };
}

export default Capabilities;
