import React, { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useWebsiteContent } from '@/hooks/useWebsiteContent';
import type { ContentBlock, Locale } from '@/types/website';
import { Star, Quote, ChevronLeft, ChevronRight, Building, User } from 'lucide-react';

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
  const { contentBlocks, getValueForLocale } = useWebsiteContent('testimonials');

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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-accent fill-current' : 'text-muted-foreground'
        }`}
      />
    ));
  };

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

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl فونت-display font-bold text-foreground mb-6">
            {header.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {header.subtitle}
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto mb-16">
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <div className="card-elevated p-8 lg:p-12 text-center mx-4 relative animate-scale-in">
                    <div className="absolute top-6 left-6 opacity-20">
                      <Quote className="w-12 h-12 text-primary" />
                    </div>

                    <div className="absolute top-6 right-6">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          testimonial.type === 'firm'
                            ? 'bg-gradient-to-br from-primary to-primary-light'
                            : 'bg-gradient-to-br from-accent to-accent-glow'
                        }`}
                      >
                        {testimonial.type === 'firm' ? (
                          <Building className="w-6 h-6 text-white" />
                        ) : (
                          <User className="w-6 h-6 text-white" />
                        )}
                      </div>
                    </div>

                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-secondary to-secondary-dark rounded-full flex items-center justify-center text-4xl shadow-elevated">
                      {testimonial.avatar}
                    </div>

                    <div className="flex justify-center space-x-1 rtl:space-x-reverse mb-6">
                      {renderStars(testimonial.rating)}
                    </div>

                    <blockquote className="text-xl lg:text-2xl font-display text-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
                      "{testimonial.quote}"
                    </blockquote>

                    <div className="space-y-2">
                      <h4 className="text-xl font-display font-semibold text-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="text-muted-foreground">{testimonial.position}</p>
                      <p className="text-primary font-medium">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevTestimonial}
            className={`absolute top-1/2 -translate-y-1/2 ${
              isRTL ? 'right-2' : 'left-2'
            } w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-lg group`}
          >
            <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
          </button>

          <button
            onClick={nextTestimonial}
            className={`absolute top-1/2 -translate-y-1/2 ${
              isRTL ? 'left-2' : 'right-2'
            } w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-lg group`}
          >
            <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
          </button>
        </div>

        <div className="mb-16 flex justify-center space-x-3 rtl:space-x-reverse">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-primary w-8' : 'bg-muted-foreground/30 hover:bg-muted-foreground/60'
              }`}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center card-premium p-8 hover:card-elevated transition-all duration-500 group hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="mb-2 text-3xl font-display font-bold text-primary">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
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
