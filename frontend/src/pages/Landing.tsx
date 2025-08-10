import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { HeroCarousel } from '../components/landing/HeroCarousel';
import { FeatureCards } from '../components/landing/FeatureCards';
import { StatsSection } from '../components/landing/StatsSection';
import { TestimonialsSection } from '../components/landing/TestimonialsSection';
import { FAQSection } from '../components/landing/FAQSection';
import { 
  Scale, 
  Users, 
  FileText, 
  BarChart3, 
  Clock,
  ArrowRight,
  Shield,
  Gavel,
  BookOpen,
  Star,
  Crown
} from 'lucide-react';

export const Landing = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const navigate = useNavigate();
  const [specialEdition, setSpecialEdition] = useState(false);
  const [animatedScale, setAnimatedScale] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScale(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      specialEdition 
        ? 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-100 dark:from-amber-900/20 dark:via-yellow-900/10 dark:to-orange-900/20' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20'
    }`}>
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-all duration-500 ${
        specialEdition
          ? 'bg-amber-50/80 dark:bg-amber-900/80 border-amber-200/50 dark:border-amber-700/50'
          : 'bg-white/80 dark:bg-gray-900/80 border-gray-200/50 dark:border-gray-700/50'
      }`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Scale className={`h-8 w-8 transition-all duration-1000 ${
                specialEdition 
                  ? 'text-amber-600 dark:text-amber-400' 
                  : 'text-blue-600 dark:text-blue-400'
              } ${animatedScale ? 'rotate-12' : ''}`} />
              {specialEdition && (
                <Crown className="absolute -top-2 -right-2 h-4 w-4 text-amber-500 animate-pulse" />
              )}
            </div>
            <div>
              <h1 className={`text-xl font-bold transition-colors duration-300 ${
                specialEdition 
                  ? 'text-amber-900 dark:text-amber-100' 
                  : 'text-gray-900 dark:text-white'
              }`}>
                {t('landing.title')}
              </h1>
              <p className={`text-xs transition-colors duration-300 ${
                specialEdition 
                  ? 'text-amber-700 dark:text-amber-300' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}>
                {specialEdition ? 'النسخة الذهبية - طبعة محدودة' : t('landing.subtitle')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSpecialEdition(!specialEdition)}
              className={`transition-all duration-300 ${
                specialEdition 
                  ? 'text-amber-600 hover:text-amber-700 hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-900/20' 
                  : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              }`}
            >
              <Crown className="h-4 w-4 mr-2" />
              {specialEdition ? 'العادية' : 'الذهبية'}
            </Button>
            <LanguageSwitcher />
            <ThemeToggle />
            <Button 
              variant="ghost"
              onClick={() => navigate('/login')}
              className={`transition-colors duration-300 ${
                specialEdition 
                  ? 'text-amber-700 dark:text-amber-300 hover:text-amber-800 dark:hover:text-amber-200' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              {t('common.login')}
            </Button>
            <Button 
              onClick={() => navigate('/register')}
              className={`shadow-lg hover:shadow-xl transition-all duration-200 ${
                specialEdition
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {t('common.register')}
            </Button>
          </div>
        </div>
        
        {specialEdition && (
          <div className="bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-900 text-center py-2 text-sm font-medium animate-pulse">
            🎉 العرض الذهبي - خصم 50% على الاشتراك السنوي - عرض محدود! 🎉
          </div>
        )}
      </header>

      {/* Hero Carousel Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <HeroCarousel specialEdition={specialEdition} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <FeatureCards specialEdition={specialEdition} />
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 px-4 transition-all duration-500 ${
        specialEdition 
          ? 'bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30' 
          : 'bg-white/50 dark:bg-gray-800/50'
      }`}>
        <div className="container mx-auto">
          <StatsSection specialEdition={specialEdition} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <TestimonialsSection specialEdition={specialEdition} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-16 px-4 transition-all duration-500 ${
        specialEdition 
          ? 'bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20' 
          : 'bg-gray-50 dark:bg-gray-800/30'
      }`}>
        <div className="container mx-auto">
          <FAQSection specialEdition={specialEdition} />
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 px-4 text-white transition-all duration-500 ${
        specialEdition 
          ? 'bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600' 
          : 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800'
      }`}>
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {specialEdition ? 'استفد من العرض الذهبي الآن!' : 'Ready to Transform Your Legal Practice?'}
            </h2>
            <p className={`text-xl mb-8 ${specialEdition ? 'text-amber-100' : 'text-blue-100'}`}>
              {specialEdition 
                ? 'انضم للآلاف من رجال القانون الذين يثقون في أفوكات - العرض الذهبي' 
                : 'Join thousands of legal professionals who trust Avocat Law Firm'
              }
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/register')}
              className={`px-8 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 ${
                specialEdition
                  ? 'bg-white text-amber-600 hover:bg-amber-50'
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              }`}
            >
              {specialEdition ? 'احصل على العرض الذهبي' : 'Start Your Free Trial'}
              <ArrowRight className={`h-5 w-5 ${isRTL ? 'rotate-180 mr-2' : 'ml-2'}`} />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-4 text-white transition-all duration-500 ${
        specialEdition 
          ? 'bg-amber-900 dark:bg-amber-950' 
          : 'bg-gray-900 dark:bg-black'
      }`}>
        <div className="container mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Scale className={`h-8 w-8 ${specialEdition ? 'text-amber-400' : 'text-blue-400'}`} />
              <span className="text-2xl font-bold">Avocat Law Firm</span>
              {specialEdition && <Crown className="h-6 w-6 text-amber-400" />}
            </div>
            
            <div className="flex justify-center mb-6">
              <LanguageSwitcher />
            </div>
            
            <p className={`mb-4 ${specialEdition ? 'text-amber-200' : 'text-gray-400'}`}>
              {t('landing.footer.copyright')} {specialEdition && '- الإصدار الذهبي'}
            </p>
            
            <p className={`text-sm max-w-2xl mx-auto ${specialEdition ? 'text-amber-300' : 'text-gray-500'}`}>
              {t('landing.footer.disclaimer')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
