
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '../ui/card';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialsSectionProps {
  specialEdition: boolean;
}

const testimonials = [
  {
    id: 1,
    nameAr: 'أحمد محسن',
    nameEn: 'Ahmed Mohsen',
    roleAr: 'صاحب شركة',
    roleEn: 'Business Owner',
    contentAr: 'خدمة استثنائية وفريق محترف. ساعدوني في حل قضية معقدة بأفضل الطرق القانونية.',
    contentEn: 'Exceptional service and professional team. They helped me solve a complex case with the best legal methods.',
    rating: 5,
    avatar: '/default-profile.png'
  },
  {
    id: 2,
    nameAr: 'فاطمة علي',
    nameEn: 'Fatima Ali',
    roleAr: 'محامية',
    roleEn: 'Lawyer',
    contentAr: 'منصة رائعة تسهل التواصل مع العملاء وإدارة القضايا بكفاءة عالية.',
    contentEn: 'Amazing platform that facilitates communication with clients and manages cases with high efficiency.',
    rating: 5,
    avatar: '/default-profile.png'
  },
  {
    id: 3,
    nameAr: 'محمد عبدالله',
    nameEn: 'Mohamed Abdullah',
    roleAr: 'مستثمر',
    roleEn: 'Investor',
    contentAr: 'أسرع وأفضل خدمة قانونية تلقيتها. النصائح كانت قيمة ودقيقة.',
    contentEn: 'The fastest and best legal service I have received. The advice was valuable and accurate.',
    rating: 5,
    avatar: '/default-profile.png'
  }
];

export const TestimonialsSection = ({ specialEdition }: TestimonialsSectionProps) => {
  const { i18n } = useTranslation();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const isArabic = i18n.language === 'ar';

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const current = testimonials[currentTestimonial];

  return (
    <div className="text-center">
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${
        specialEdition 
          ? 'text-amber-900 dark:text-amber-100' 
          : 'text-gray-900 dark:text-white'
      }`}>
        {specialEdition ? 'شهادات عملاء الطبعة الذهبية' : 'ماذا يقول عملاؤنا'}
      </h2>

      <div className="relative max-w-4xl mx-auto">
        <Card className={`transition-all duration-500 border-0 shadow-2xl ${
          specialEdition
            ? 'bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20'
            : 'bg-white dark:bg-gray-800'
        }`}>
          <CardContent className="p-8 md:p-12">
            <Quote className={`h-12 w-12 mx-auto mb-6 transition-colors duration-300 ${
              specialEdition 
                ? 'text-amber-400' 
                : 'text-blue-400'
            }`} />
            
            <blockquote className={`text-xl md:text-2xl font-medium mb-8 leading-relaxed transition-colors duration-300 ${
              specialEdition 
                ? 'text-amber-800 dark:text-amber-200' 
                : 'text-gray-700 dark:text-gray-300'
            }`}>
              "{isArabic ? current.contentAr : current.contentEn}"
            </blockquote>

            <div className="flex items-center justify-center mb-6">
              {[...Array(current.rating)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-6 w-6 fill-current transition-colors duration-300 ${
                    specialEdition 
                      ? 'text-amber-400' 
                      : 'text-yellow-400'
                  }`} 
                />
              ))}
            </div>

            <div className="flex items-center justify-center">
              <img
                src={current.avatar}
                alt={isArabic ? current.nameAr : current.nameEn}
                className="w-16 h-16 rounded-full mr-4 border-4 border-white shadow-lg"
              />
              <div className="text-center">
                <h4 className={`font-bold text-lg transition-colors duration-300 ${
                  specialEdition 
                    ? 'text-amber-900 dark:text-amber-100' 
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {isArabic ? current.nameAr : current.nameEn}
                </h4>
                <p className={`transition-colors duration-300 ${
                  specialEdition 
                    ? 'text-amber-600 dark:text-amber-400' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}>
                  {isArabic ? current.roleAr : current.roleEn}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <button
          onClick={prevTestimonial}
          className={`absolute top-1/2 -translate-y-1/2 left-4 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 ${
            specialEdition
              ? 'bg-amber-500 hover:bg-amber-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={nextTestimonial}
          className={`absolute top-1/2 -translate-y-1/2 right-4 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 ${
            specialEdition
              ? 'bg-amber-500 hover:bg-amber-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentTestimonial(index);
                setIsAutoPlaying(false);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial
                  ? specialEdition
                    ? 'bg-amber-500 w-8'
                    : 'bg-blue-500 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
