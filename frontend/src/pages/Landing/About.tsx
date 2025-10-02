import { useCallback, useMemo } from 'react';
import { Building2, Compass, Handshake, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useWebsiteContent } from '@/hooks/useWebsiteContent';
import type { Locale } from '@/types/website';

const pillarIcons = [Building2, Target, Compass, Handshake];

const About: React.FC = () => {
  const { language, direction } = useLanguage();
  const locale = language as Locale;
  const isArabic = language === 'ar';
  const { contentBlocks, getLocalizedValue, getValueForLocale } = useWebsiteContent('about');

  const pillarNumbers = useMemo(() => {
    const numbers = new Set<number>();

    contentBlocks.forEach((block) => {
      const match = block.key.match(/^about_pillar_(\d+)_/);
      if (match) {
        numbers.add(Number(match[1]));
      }
    });

    return Array.from(numbers).sort((a, b) => a - b);
  }, [contentBlocks]);

  const getString = useCallback(
    (key: string, lang: Locale = locale, fallback = ''): string =>
      getValueForLocale<string>(key, lang) ?? fallback,
    [getValueForLocale, locale]
  );

  const pillars = useMemo(
    () =>
      pillarNumbers.map((number, index) => {
        const pointsLocalized = getLocalizedValue<string[]>(`about_pillar_${number}_points`, {
          ar: [],
          en: [],
        });

        return {
          icon: pillarIcons[index % pillarIcons.length],
          title: getString(`about_pillar_${number}_title`),
          description: getString(`about_pillar_${number}_description`),
          points: (pointsLocalized[locale] ?? pointsLocalized.en ?? []).filter(Boolean),
          arabicTitle: getString(`about_pillar_${number}_title`, 'ar'),
        };
      }),
    [getLocalizedValue, getString, locale, pillarNumbers]
  );

  const badge = getString('about_badge');
  const title = getString('about_title');
  const description = getString('about_description');
  const detailLabel = getString('about_detail_label');

  return (
    <section id="about" className="relative overflow-hidden py-24" dir={direction}>
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2 text-xs font-semibold text-muted-foreground">
            <span>{badge}</span>
          </div>
          <h2 className="mt-6 text-4xl font-display font-bold text-foreground lg:text-5xl">{title}</h2>
          <p className="mt-4 text-lg text-muted-foreground lg:text-xl">{description}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;

            return (
              <div
                key={`${pillar.title}-${index}`}
                className="group flex h-full flex-col gap-6 rounded-3xl border border-border bg-card/70 p-8 shadow-ambient backdrop-blur transition-transform duration-500 hover:-translate-y-2 hover:shadow-premium"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-gradient-gold p-3 text-accent-foreground shadow-gold">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className={isArabic ? 'text-right' : 'text-left'}>
                      <h3 className="text-xl font-semibold text-foreground">{pillar.title}</h3>
                      <p
                        className={`text-sm text-muted-foreground ${
                          isArabic ? '' : 'uppercase tracking-widest'
                        }`}
                      >
                        {detailLabel}
                      </p>
                    </div>
                  </div>
                  {pillar.arabicTitle ? (
                    <span className="font-arabic text-lg text-accent">{pillar.arabicTitle}</span>
                  ) : null}
                </div>
                <div className="space-y-3 text-base leading-relaxed text-muted-foreground" dir={isArabic ? 'rtl' : 'ltr'}>
                  <p>{pillar.description}</p>
                  <ul className="space-y-2 text-sm">
                    {pillar.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{point}</span>
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

export default About;
