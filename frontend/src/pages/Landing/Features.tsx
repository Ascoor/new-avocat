import React, { useMemo } from 'react';
import { Database, Laptop, Shield, Users } from 'lucide-react';

import SectionHeader from '@/components/landing/SectionHeader';
import { useLanguage } from '@/contexts/LanguageContext';
import { useWebsiteContent } from '@/hooks/useWebsiteContent';
import type { ContentBlock, Locale } from '@/types/website';

const iconLookup: Record<string, typeof Shield> = {
  shield: Shield,
  users: Users,
  database: Database,
  laptop: Laptop,
};

const Features: React.FC = () => {
  const { language } = useLanguage();
  const locale = language as Locale;
  const { contentBlocks, getValueForLocale } = useWebsiteContent('features');

  const header = {
    eyebrow: getValueForLocale('features_badge', locale) ?? '',
    title: getValueForLocale('features_title', locale) ?? '',
    subtitle: getValueForLocale('features_subtitle', locale) ?? '',
  };

  const features = useMemo(
    () =>
      contentBlocks
        .filter((block) => block.key.startsWith('features_item_'))
        .map((block) => mapFeature(block, locale)),
    [contentBlocks, locale]
  );

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-background py-24"
      aria-labelledby="features-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,hsla(200,85%,65%,0.18),transparent_62%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/70 to-transparent" />

      <div className="container relative z-10 mx-auto px-6">
        <SectionHeader
          title={header.title}
          subtitle={header.subtitle}
          eyebrow={header.eyebrow}
          className="mb-16"
          titleClassName="text-balance"
          titleId="features-heading"
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <article
              key={`${feature.title}-${index}`}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/90 p-6 shadow-ambient transition-all duration-500 ease-elegant hover:-translate-y-3 hover:shadow-glow-strong animate-fadeInUp"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="pointer-events-none absolute inset-[1px] -z-10 rounded-[1.05rem] bg-gradient-card opacity-0 transition-opacity duration-500 ease-elegant group-hover:opacity-100" />
              <div className="pointer-events-none absolute -inset-12 -z-20 rounded-full bg-gradient-aurora opacity-0 blur-[140px] transition-all duration-700 ease-smooth group-hover:scale-110 group-hover:opacity-60" />

              <div className="mb-6 flex items-center justify-center">
                <div className="relative rounded-full bg-accent-soft p-4 shadow-inner-glow transition-all duration-300 ease-smooth group-hover:scale-105 group-hover:bg-accent">
                  <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-aurora opacity-0 blur-xl transition-opacity duration-500 ease-smooth group-hover:opacity-80" />
                  <feature.Icon className="h-10 w-10 text-accent animate-float group-hover:animate-glowPulse" aria-hidden />
                </div>
              </div>

              <h3 className="mb-2 text-xl font-semibold text-text-strong transition-colors duration-300 ease-smooth group-hover:text-primary">
                {feature.title}
              </h3>

              <p className="text-text-body transition-colors duration-300 ease-smooth group-hover:text-text-muted">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

function mapFeature(block: ContentBlock, locale: Locale) {
  const localized = block.value as unknown as {
    ar?: {
      icon?: string;
      title?: string;
      description?: string;
      tagline?: string;
    } | null;
    en?: {
      icon?: string;
      title?: string;
      description?: string;
      tagline?: string;
    } | null;
  };

  const fallback = localized.en ?? {};
  const data = localized[locale] ?? fallback ?? {};
  const iconKey = (data.icon ?? fallback.icon ?? 'shield').toLowerCase();

  return {
    Icon: iconLookup[iconKey] ?? Shield,
    title: data.title ?? fallback.title ?? '',
    description: data.description ?? fallback.description ?? '',
    tagline: data.tagline ?? fallback.tagline ?? '',
  };
}

export default Features;
