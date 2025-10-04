import React, { useMemo, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion, useAnimationFrame } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
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

/* ------------------------------------------------------ */
const Testimonials: React.FC = () => {
  const { language, direction } = useLanguage();
  const locale: Locale = language.startsWith('ar') ? 'ar' : 'en';
  const { contentBlocks } = useWebsiteContent('testimonials');
  const testimonials = useMemo(() => extractTestimonials(contentBlocks, locale), [contentBlocks, locale]);

  const speed = 0.25; // سرعة التحريك
  const [paused, setPaused] = useState(false);
  const x = useRef(0);

  useAnimationFrame(() => {
    if (paused || testimonials.length === 0) return;
    const dir = direction === 'rtl' ? 1 : -1;
    x.current += dir * speed;
  });

  const duplicated = [...testimonials, ...testimonials]; // تكرار المحتوى للـ loop

  if (!testimonials.length) return null;

  return (
    <section className="py-24 bg-gradient-subtle overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-gold-light text-gold-muted font-semibold text-sm mb-4">
            {direction === 'rtl' ? 'آراء العملاء' : 'Client Reviews'}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-cairo">
            {direction === 'rtl' ? 'ماذا يقول عملاؤنا' : 'What Our Clients Say'}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {direction === 'rtl'
              ? 'آراء حقيقية من محامين ومكاتب قانونية تستخدم حلولنا يومياً'
              : 'Real feedback from lawyers and law firms using our solutions daily'}
          </p>
        </div>

        {/* Infinite Loop Motion Track */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-6"
            style={{
              x: x.current,
              direction: direction === 'rtl' ? 'rtl' : 'ltr',
              transform: `translateX(${x.current}px)`,
            }}
            animate={{
              x: [0, direction === 'rtl' ? 1000 : -1000],
            }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 40,
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {duplicated.map((testimonial, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[85%] sm:w-[60%] md:w-[45%] lg:w-[30%]"
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-8">
            {direction === 'rtl'
              ? 'موثوق به من قبل كبرى المكاتب القانونية'
              : 'Trusted by Leading Law Firms'}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-32 h-16 bg-muted rounded-lg flex items-center justify-center"
              >
                <span className="text-xl font-bold text-muted-foreground">LOGO {i}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------ */
const TestimonialCard = ({ testimonial }: { testimonial: TestimonialCopy }) => {
  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-accent fill-accent' : 'text-muted-foreground/40'}`}
      />
    ));

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      className="hover:shadow-elegant transition-all duration-500 border-0 shadow-card bg-card/70 backdrop-blur-sm rounded-2xl h-full text-center flex flex-col justify-between"
    >
      <Card className="border-none shadow-none bg-transparent h-full">
        <CardContent className="p-8 flex flex-col items-center h-full">
          {/* Avatar */}
          <div className="w-16 h-16 mb-4 rounded-full bg-gradient-gold flex items-center justify-center text-3xl shadow-gold">
            {testimonial.avatar}
          </div>

          {/* Name + Position + Company */}
          <div className="space-y-1 mb-4">
            <h4 className="font-semibold text-foreground text-lg">{testimonial.name}</h4>
            <p className="text-sm text-muted-foreground">{testimonial.position}</p>
            <p className="text-sm font-medium text-accent">{testimonial.company}</p>
          </div>

          {/* Stars */}
          <div className="flex justify-center gap-1 mb-4">{renderStars(testimonial.rating)}</div>

          {/* Quote */}
          <div className="relative flex flex-col items-center mt-auto">
            <Quote className="w-8 h-8 text-gold/20 absolute -top-6 opacity-30" />
            <p className="text-muted-foreground leading-relaxed text-sm italic max-w-xs mx-auto">
              “{testimonial.quote}”
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

/* ------------------------------------------------------ */
function extractTestimonials(blocks: ContentBlock[], locale: Locale): TestimonialCopy[] {
  return blocks
    .filter((block) => /^testimonial_\d+$/.test(block.key))
    .map((block) => {
      const value = block.value as {
        ar?: Partial<TestimonialCopy> | null;
        en?: Partial<TestimonialCopy> | null;
      };
      const base = value.en ?? {};
      const localized = value[locale] ?? {};
      const merged: Partial<TestimonialCopy> = { ...base, ...localized };

      return {
        id: Number(block.key.replace('testimonial_', '')),
        name: merged.name ?? '',
        position: merged.position ?? '',
        company: merged.company ?? '',
        avatar: merged.avatar ?? '👤',
        rating: Number(merged.rating ?? 5),
        quote: merged.quote ?? '',
        type: (merged.type ?? 'firm') as TestimonialType,
      };
    })
    .filter((t) => t.quote && t.name)
    .sort((a, b) => a.id - b.id);
}

export default Testimonials;
