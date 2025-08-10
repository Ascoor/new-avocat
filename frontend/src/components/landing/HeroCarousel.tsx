
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../hooks/useLanguage';
import { Button } from '../ui/button';
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroCarouselProps {
  specialEdition: boolean;
}

const slides = [
  {
    id: 1,
    image: '/img/slides/slide-1.png',
    titleAr: 'افتح باب العدالة',
    titleEn: 'Open the Door to Justice',
    subtitleAr: 'خدمات قانونية حديثة عبر منصة أفوكات المتطورة',
    subtitleEn: 'Modern legal services through the advanced Avocat platform',
    ctaAr: 'ابدأ الآن',
    ctaEn: 'Start Now',
  },
  {
    id: 2,
    image: '/img/slides/slide-2.png',
    titleAr: 'العدالة في العالم',
    titleEn: 'Justice in the World',
    subtitleAr: 'خدمات قانونية حديثة عبر منصة أفوكات المتطورة',
    subtitleEn: 'Modern legal services through the advanced Avocat platform',
    ctaAr: 'ابدأ الآن',
    ctaEn: 'Start Now',
  },
  {
    id:3,
    image: '/img/slides/slide-3.png',
    titleAr: 'العدالة في العالم',
    titleEn: 'Justice in the World',
    subtitleAr: 'خدمات قانونية حديثة عبر منصة أفوكات المتطورة',
    subtitleEn: 'Modern legal services through the advanced Avocat platform',
    ctaAr: 'ابدأ الآن',
    ctaEn: 'Start Now',

  },
  {
    id: 4,
    image: '/img/slides/slide-4.png',
    titleAr: 'العدالة في العالم',
    titleEn: 'Justice in the World',
    subtitleAr: 'خدمات قانونية حديثة عبر منصة أفوكات المتطورة',
    subtitleEn: 'Modern legal services through the advanced Avocat platform',
    ctaAr: 'ابدأ الآن',
    ctaEn: 'Start Now',
  },
  {

    id:5,
    image: '/img/slides/slide-5.png',
    titleAr: 'العدالة في العالم',
    titleEn: 'Justice in the World',
    subtitleAr: 'خدمات قانونية حديثة عبر منصة أفوكات المتطورة',
    subtitleEn: 'Modern legal services through the advanced Avocat platform',
    ctaAr: 'ابدأ الآن',
    ctaEn: 'Start Now',




  },
  {
    id: 6,
    image: '/img/slides/slide-6.png',
    titleAr: 'العدالة في العالم',
    titleEn: 'Justice in the World',
    subtitleAr: 'خدمات قانونية حديثة عبر منصة أفوكات المتطورة',
    subtitleEn: 'Modern legal services through the advanced Avocat platform',
    ctaAr: 'ابدأ الآن',
    ctaEn: 'Start Now',
  },
  {
    id:7,
    image: '/img/slides/slide-7.png',
    titleAr: 'العدالة في العالم',
    titleEn: 'Justice in the World',
    subtitleAr: 'خدمات قانونية حديثة عبر منصة أفوكات المتطورة',
    subtitleEn: 'Modern legal services through the advanced Avocat platform',
    ctaAr: 'ابدأ الآن',
    ctaEn: 'Start Now',


  }
  
];

export const HeroCarousel = ({ specialEdition }: HeroCarouselProps) => {
  const { t, i18n } = useTranslation();
  const { isRTL } = useLanguage();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

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

  const currentSlideData = slides[currentSlide];
  const isArabic = i18n.language === 'ar';

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Special Edition Badge */}
      {specialEdition && (
        <div className="absolute top-6 left-6 z-20 bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-900 px-6 py-3 rounded-full shadow-lg animate-pulse">
          <span className="font-bold text-sm">🏆 النسخة الذهبية</span>
        </div>
      )}

      <div className={`relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ${
        specialEdition 
          ? 'bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 dark:from-amber-900/40 dark:via-yellow-900/30 dark:to-orange-900/40' 
          : 'bg-gradient-to-br from-blue-900/20 via-indigo-100 to-purple-100 dark:from-blue-900/60 dark:via-indigo-900/40 dark:to-purple-900/40'
      }`}>
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={currentSlideData.image}
            alt={isArabic ? currentSlideData.titleAr : currentSlideData.titleEn}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className={`absolute inset-0 transition-all duration-500 ${
            specialEdition 
              ? 'bg-gradient-to-r from-amber-900/60 via-yellow-800/40 to-orange-900/60' 
              : 'bg-gradient-to-r from-blue-900/60 via-indigo-900/40 to-purple-900/60'
          }`} />
        </div>

        {/* Content */}
        <div className={`relative z-10 h-full flex items-center ${isRTL ? 'pr-36 md:pr-16' : 'pl-8 md:pl-16'}`}>
          <div className="max-w-2xl text-white">
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 animate-fade-in transition-all duration-700 ${
              specialEdition ? 'text-amber-100' : 'text-white'
            }`}>
              {isArabic ? currentSlideData.titleAr : currentSlideData.titleEn}
            </h1>
            
            <p className={`text-xl md:text-2xl mb-8 leading-relaxed transition-all duration-700 ${
              specialEdition ? 'text-amber-200' : 'text-blue-100'
            }`}>
              {isArabic ? currentSlideData.subtitleAr : currentSlideData.subtitleEn}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                onClick={() => navigate('/register')}
                className={`px-8 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 ${
                  specialEdition
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                }`}
              >
                {isArabic ? currentSlideData.ctaAr : currentSlideData.ctaEn}
                <ArrowRight className={`h-5 w-5 ${isRTL ? 'rotate-180 mr-2' : 'ml-2'}`} />
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                onClick={() => navigate('/product')}
                className={`border-2 px-8 py-16 text-lg transition-all duration-200 ${
                  specialEdition
                    ? 'border-amber-300 text-amber-100 hover:bg-amber-100 hover:text-amber-900'
                    : 'border-blue-300 text-blue-100 hover:bg-blue-100 hover:text-blue-900'
                }`}
              >
                {t('landing.learn_more')}
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className={`absolute top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 ${
            isRTL ? 'right-6' : 'left-6'
          } ${
            specialEdition
              ? 'bg-amber-500/80 hover:bg-amber-500 text-white'
              : 'bg-blue-500/80 hover:bg-blue-500 text-white'
          }`}
        >
          {isRTL ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
        </button>

        <button
          onClick={nextSlide}
          className={`absolute top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 ${
            isRTL ? 'left-6' : 'right-6'
          } ${
            specialEdition
              ? 'bg-amber-500/80 hover:bg-amber-500 text-white'
              : 'bg-blue-500/80 hover:bg-blue-500 text-white'
          }`}
        >
          {isRTL ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? specialEdition
                    ? 'bg-amber-400 w-8'
                    : 'bg-blue-400 w-8'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
