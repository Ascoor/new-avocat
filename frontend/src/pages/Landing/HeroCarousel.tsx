import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight, Play, ArrowRight } from 'lucide-react';

// Import hero images
import heroLegal1 from '@/assets/slides/hero-legal-1.png';
import heroDigital2 from '@/assets/slides/hero-digital-2.png';
import heroPartnership3 from '@/assets/slides/hero-partnership-3.png';

interface Slide {
  id: number;
  titleKey: string;
  subtitleKey: string;
  image: string;
  overlay: string;
}

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { t, isRTL } = useLanguage();

  const slides: Slide[] = [
    {
      id: 1,
      titleKey: 'heroSlide1Title',
      subtitleKey: 'heroSlide1Subtitle',
      image: heroLegal1,
      overlay: 'bg-gradient-to-r from-primary/90 via-primary/60 to-transparent'
    },
    {
      id: 2,
      titleKey: 'heroSlide2Title',
      subtitleKey: 'heroSlide2Subtitle',
      image: heroDigital2,
      overlay: 'bg-gradient-to-r from-primary-light/90 via-primary-light/60 to-transparent'
    },
    {
      id: 3,
      titleKey: 'heroSlide3Title',
      subtitleKey: 'heroSlide3Subtitle',
      image: heroPartnership3,
      overlay: 'bg-gradient-to-r from-primary/95 via-primary/70 to-accent/20'
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            
            {/* Overlay */}
            <div className={`absolute inset-0 ${slide.overlay}`} />
            
            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-4 lg:px-8">
                <div className={`max-w-4xl ${isRTL ? 'mr-auto text-right' : 'ml-auto text-left'}`}>
                  <div className="animate-fade-in">
                    <h1 className="text-5xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
                      <span className="block animate-slide-up">
                        {t(slide.titleKey)}
                      </span>
                    </h1>
                    
                    <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl animate-slide-up delay-200">
                      {t(slide.subtitleKey)}
                    </p>
                    
                    <div className={`flex flex-col sm:flex-row gap-4 animate-slide-up delay-400 ${
                      isRTL  ? 'sm:justify-end' : 'sm:justify-start'
                    }`}>
                      <Button 
                        size="lg" 
                        className="btn-gold text-lg px-8 py-4 h-auto group"
                        onClick={() => window.open('#demo', '_blank')}
                      >
                        <Play className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 group-hover:scale-110 transition-transform" />
                        {t('getDemo')}
                      </Button>
                      
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="btn-glass text-lg px-8 py-4 h-auto group"
                        onClick={scrollToContact}
                      >
                        {t('contactUs')}
                        <ArrowRight className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className={`absolute top-1/2 -translate-y-1/2 ${
          isRTL ? 'right-6' : 'left-6'
        } z-20 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group`}
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>
      
      <button
        onClick={nextSlide}
        className={`absolute top-1/2 -translate-y-1/2 ${
          isRTL  ? 'left-6' : 'right-6'
        } z-20 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group`}
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-accent w-8' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Auto-play Toggle */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute bottom-6 right-6 z-20 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
      >
        {isAutoPlaying ? (
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        ) : (
          <Play className="w-4 h-4 text-white fill-current" />
        )}
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel