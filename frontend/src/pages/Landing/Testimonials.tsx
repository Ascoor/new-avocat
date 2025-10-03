import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Building, User } from 'lucide-react';

import SectionHeader from './components/SectionHeader';
import SectionContainer from './components/SectionContainer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useWebsiteContent } from '@/hooks/useWebsiteContent';
import type { ContentBlock, Locale } from '@/types/website';

type TestimonialType = 'firm' | 'individual';

interface TestimonialCopy {
  id: number;
  name: string;
  position: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
  type: TestimonialType;
}

interface TestimonialStat {
  number: string;
  label: string;
  icon: string;
}

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language, isRTL } = useLanguage();
  const locale = language as Locale;
  const { loading, contentBlocks, getValueForLocale } = useWebsiteContent('testimonials');

  const header = {
    title: getValueForLocale('testimonials_title', locale) ?? '',
    subtitle: getValueForLocale('testimonials_subtitle', locale) ?? '',
  };

  const testimonials = useMemo(() => extractTestimonials(contentBlocks, locale), [contentBlocks, locale]);
  const stats = useMemo(() => extractStats(contentBlocks, locale), [contentBlocks, locale]);

  useEffect(() => {
    if (currentIndex >= testimonials.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, testimonials.length]);

  useEffect(() => {
    if (testimonials.length <= 1) {
      return;
    }
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? 'text-accent drop-shadow-sm' : 'text-muted-foreground/50'
        }`}
      />
    ));

  if (!testimonials.length) {
    return null;
  }

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-gradient-to-br from-secondary/30 via-background to-secondary/30 py-24"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply blur-xl animate-float" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-accent rounded-full mix-blend-multiply blur-xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <SectionContainer
          loading={loading}
          loaderLabel={locale === 'ar' ? 'جارٍ تحميل الشهادات' : 'Loading testimonials'}
          className="bg-background/85"
        >
          <div className="space-y-14">
            <SectionHeader title={header.title} subtitle={header.subtitle} />

            <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="card-elevated relative mx-4 p-8 text-center text-foreground lg:p-12"
                  >
                    <div className="absolute left-6 top-6 opacity-20">
                      <Quote className="h-12 w-12 text-primary" />
                    </div>

                    <div className="absolute right-6 top-6">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full shadow-inner-glow ${
                          testimonial.type === 'firm'
                            ? 'bg-gradient-to-br from-primary to-primary-light'
                            : 'bg-gradient-to-br from-accent to-accent-glow'
                        }`}
                      >
                        {testimonial.type === 'firm' ? (
                          <Building className="h-6 w-6 text-primary-foreground" />
                        ) : (
                          <User className="h-6 w-6 text-primary-foreground" />
                        )}
                      </div>
                    </div>

                    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-secondary to-secondary-dark text-4xl shadow-elevated">
                      {testimonial.avatar}
                    </div>

                    <div className="mb-6 flex justify-center space-x-1 rtl:space-x-reverse">
                      {renderStars(testimonial.rating)}
                    </div>

                    <blockquote className="mx-auto mb-6 max-w-3xl text-xl leading-relaxed text-muted-foreground lg:text-2xl">
                      "{testimonial.quote}"
                    </blockquote>

                    <div className="space-y-2">
                      <h4 className="text-xl font-display font-semibold text-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                      <p className="text-sm font-medium text-primary">{testimonial.company}</p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevTestimonial}
            className={`group absolute top-1/2 h-12 w-12 -translate-y-1/2 rounded-full border border-border/60 bg-card/80 text-foreground shadow-elevated backdrop-blur transition-all duration-300 hover:bg-card hover:text-primary ${
              isRTL ? 'right-2' : 'left-2'
            }`}
          >
            <ChevronLeft className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
          </button>

          <button
            onClick={nextTestimonial}
            className={`group absolute top-1/2 h-12 w-12 -translate-y-1/2 rounded-full border border-border/60 bg-card/80 text-foreground shadow-elevated backdrop-blur transition-all duration-300 hover:bg-card hover:text-primary ${
              isRTL ? 'left-2' : 'right-2'
            }`}
          >
            <ChevronRight className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
          </button>
        </div>

            <div className="mb-10 flex justify-center space-x-3 rtl:space-x-reverse">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-primary'
                      : 'w-3 bg-muted-foreground/40 hover:bg-muted-foreground/60'
                  }`}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="card-premium text-center transition-all duration-500 hover:-translate-y-1 hover:card-elevated"
                >
                  <div className="mb-2 text-3xl font-display font-bold text-primary">{stat.number}</div>
                  <div className="pb-8 text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionContainer>
      </div>
    </section>
  );
};

function extractTestimonials(blocks: ContentBlock[], locale: Locale): TestimonialCopy[] {
  return blocks
    .filter((block) => /^testimonial_\d+$/.test(block.key))
    .map((block) => {
      const localized = block.value as unknown as {
        ar?: Partial<TestimonialCopy> | null;
        en?: Partial<TestimonialCopy> | null;
      };

      const fallback = localized.en ?? {};
      const data = localized[locale] ?? fallback ?? {};

      return {
        id: Number(block.key.replace('testimonial_', '')),
        name: data.name ?? fallback.name ?? '',
        position: data.position ?? fallback.position ?? '',
        company: data.company ?? fallback.company ?? '',
        avatar: data.avatar ?? fallback.avatar ?? '👤',
        rating: Number(data.rating ?? fallback.rating ?? 5),
        quote: data.quote ?? fallback.quote ?? '',
        type: (data.type ?? fallback.type ?? 'firm') as TestimonialType,
      };
    })
    .sort((a, b) => a.id - b.id);
}

function extractStats(blocks: ContentBlock[], locale: Locale): TestimonialStat[] {
  return blocks
    .filter((block) => block.key.startsWith('testimonials_stat_'))
    .sort((a, b) => a.key.localeCompare(b.key))
    .map((block) => {
      const localized = block.value as unknown as {
        ar?: TestimonialStat | null;
        en?: TestimonialStat | null;
      };

      const fallback = localized.en ?? { number: '', label: '', icon: '' };
      const data = localized[locale] ?? fallback;

      return {
        number: data.number ?? fallback.number ?? '',
        label: data.label ?? fallback.label ?? '',
        icon: data.icon ?? fallback.icon ?? '',
      };
    });
}

export default Testimonials;
