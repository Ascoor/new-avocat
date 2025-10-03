import { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Building2, Compass, Handshake, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useWebsiteContent } from '@/hooks/useWebsiteContent';
import type { Locale } from '@/types/website';
import SectionHeader from './components/SectionHeader';
import SectionContainer from './components/SectionContainer';

const pillarIcons = [Building2, Target, Compass, Handshake];

const About: React.FC = () => {
  const { language, direction } = useLanguage();
  const locale = language as Locale;
  const isArabic = language === 'ar';
  const { loading, contentBlocks, getLocalizedValue, getValueForLocale } = useWebsiteContent('about');

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

  const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  } as const;

  return (
    <section id="about" className="relative overflow-hidden py-24" dir={direction}>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
      <div className="container relative mx-auto px-4 lg:px-8">
        <SectionContainer
          loading={loading}
          loaderLabel={isArabic ? 'جارٍ تجهيز قسم من نحن' : 'Preparing about section'}
          className="bg-background/70"
        >
          <div className="space-y-16">
            <SectionHeader badge={badge} title={title} subtitle={description} />

            <div className="grid gap-8 md:grid-cols-2">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;

                return (
                  <motion.article
                    key={`${pillar.title}-${index}`}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.35 }}
                    className="group flex h-full flex-col gap-6 rounded-3xl border border-border/60 bg-card/80 p-8 shadow-ambient backdrop-blur transition-transform duration-500 hover:-translate-y-2 hover:shadow-premium"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <motion.div
                          initial={{ scale: 0.85, rotate: -4, opacity: 0 }}
                          whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{ duration: 0.6, delay: 0.05 * (index % 3) }}
                          className="rounded-2xl bg-gradient-gold p-3 text-accent-foreground shadow-gold"
                        >
                          <Icon className="h-6 w-6" />
                        </motion.div>
                        <div className={isArabic ? 'text-right' : 'text-left'}>
                          <h3 className="text-xl font-semibold text-foreground">{pillar.title}</h3>
                          <p
                            className={`text-sm text-muted-foreground ${
                              isArabic ? '' : 'uppercase tracking-[0.35em]'
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
                    <motion.div
                      className="space-y-3 text-base leading-relaxed text-muted-foreground"
                      dir={isArabic ? 'rtl' : 'ltr'}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.45 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    >
                      <p>{pillar.description}</p>
                      <ul className="space-y-2 text-sm">
                        {pillar.points.map((point) => (
                          <motion.li
                            key={point}
                            className="flex items-start gap-2"
                            initial={{ opacity: 0, x: isArabic ? 16 : -16 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.8 }}
                            transition={{ duration: 0.45, delay: 0.12 }}
                          >
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                            <span>{point}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </SectionContainer>
      </div>
    </section>
  );
};

export default About;
