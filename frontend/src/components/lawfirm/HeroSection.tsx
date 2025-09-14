import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

const slides = [
  { id: 1, image: '/splash-image.jpg' },
  { id: 2, image: '/intro-app-mobile.png' },
  { id: 3, image: '/placeholder.svg' }
];

export const HeroSection = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center gradient-hero text-primary-foreground relative">
      <Carousel className="w-full max-w-5xl">
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="h-[500px] relative">
              <img src={slide.image} alt="slide" className="w-full h-full object-cover rounded-xl" />
              <div className="absolute inset-0 bg-background/40 flex flex-col items-center justify-center text-center p-4 rounded-xl">
                <h1 className="hero-title mb-4 fade-in-up">{t('lawlanding.hero.title')}</h1>
                <p className="section-subtitle mb-6 fade-in-up delay-1">{t('lawlanding.hero.subtitle')}</p>
                <Button className="btn-hero shadow-gold mt-2">
                  {t('lawlanding.hero.cta')}
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={`bg-white/80 ${isRTL ? 'right-2' : 'left-2'}`} />
        <CarouselNext className={`bg-white/80 ${isRTL ? 'left-2' : 'right-2'}`} />
      </Carousel>
    </section>
  );
};
