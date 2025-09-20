import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const HeroSlider: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = useMemo(() => {
    const data = t('landing.hero.slides', { returnObjects: true }) as Record<
      string,
      { title?: string; description?: string; cta?: string }
    >;
    const parsed = Object.values(data ?? {}).map((slide) => ({
      title: slide.title ?? '',
      subtitle: slide.description ?? '',
      cta: slide.cta ?? '',
    }));
    return parsed.length > 0
      ? parsed
      : [
          {
            title: '',
            subtitle: '',
            cta: '',
          },
        ];
  }, [t]);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-hero">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      {/* Navigation Arrows */}
      <button
        onClick={isRTL ? nextSlide : prevSlide}
        className={`absolute top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 ${
          isRTL ? 'right-6' : 'left-6'
        }`}
        aria-label={isRTL ? 'التالي' : 'Previous'}
      >
        {isRTL ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
      </button>

      <button
        onClick={isRTL ? prevSlide : nextSlide}
        className={`absolute top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 ${
          isRTL ? 'left-6' : 'right-6'
        }`}
        aria-label={isRTL ? 'السابق' : 'Next'}
      >
        {isRTL ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slides Content */}
      <div className="container mx-auto px-4 h-screen flex items-center relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: isRTL ? -100 : 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? 100 : -100 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {slides[currentSlide]?.title}
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl mb-8 text-white/90 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {slides[currentSlide]?.subtitle}
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button 
                asChild 
                variant="default" 
                size="lg" 
                className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 font-semibold text-lg px-8 py-4"
              >
                <Link to="/register">
                  {slides[currentSlide]?.cta}
                  <ArrowRight className={`h-5 w-5 ml-2 ${isRTL ? 'rotate-180 ml-0 mr-2' : ''}`} />
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20 font-semibold text-lg px-8 py-4"
              >
                <Link to="/login">
                  {t('landing.cta.login')}
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSlider;