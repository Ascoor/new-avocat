
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '../ui/card';
import { 
  Scale, 
  Users, 
  FileText, 
  Clock,
  Shield,
  Gavel,
  Phone,
  Calendar
} from 'lucide-react';

interface FeatureCardsProps {
  specialEdition: boolean;
}

const features = [
  {
    key: 'instant_consultation',
    icon: Phone,
    titleAr: 'استشارات فورية',
    titleEn: 'Instant Consultations',
    descAr: 'احصل على استشارة قانونية فورية من أفضل المحامين',
    descEn: 'Get instant legal consultation from top lawyers'
  },
  {
    key: 'contracts',
    icon: FileText,
    titleAr: 'عقود وتوكيلات',
    titleEn: 'Contracts & Power of Attorney',
    descAr: 'إعداد العقود والتوكيلات بأعلى المعايير المهنية',
    descEn: 'Prepare contracts and powers of attorney with highest professional standards'
  },
  {
    key: 'case_tracking',
    icon: Gavel,
    titleAr: 'متابعة القضايا',
    titleEn: 'Case Tracking',
    descAr: 'تابع قضاياك خطوة بخطوة مع تحديثات مستمرة',
    descEn: 'Track your cases step by step with continuous updates'
  },
  {
    key: 'appointments',
    icon: Calendar,
    titleAr: 'مواعيد مرنة',
    titleEn: 'Flexible Appointments',
    descAr: 'احجز مواعيدك بسهولة واختر الوقت المناسب لك',
    descEn: 'Book your appointments easily and choose the time that suits you'
  },
  {
    key: 'security',
    icon: Shield,
    titleAr: 'حماية البيانات',
    titleEn: 'Data Protection',
    descAr: 'أمان عالي وحماية كاملة لبياناتك الشخصية والقانونية',
    descEn: 'High security and complete protection for your personal and legal data'
  },
  {
    key: 'support',
    icon: Users,
    titleAr: 'دعم 24/7',
    titleEn: '24/7 Support',
    descAr: 'فريق دعم متاح على مدار الساعة لمساعدتك',
    descEn: 'Support team available around the clock to help you'
  }
];

export const FeatureCards = ({ specialEdition }: FeatureCardsProps) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <div className="text-center mb-12">
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${
        specialEdition 
          ? 'text-amber-900 dark:text-amber-100' 
          : 'text-gray-900 dark:text-white'
      }`}>
        {specialEdition ? 'خدمات الطبعة الذهبية' : 'خدماتنا المميزة'}
      </h2>
      <p className={`text-lg mb-12 transition-colors duration-300 ${
        specialEdition 
          ? 'text-amber-700 dark:text-amber-300' 
          : 'text-gray-600 dark:text-gray-300'
      }`}>
        {specialEdition ? 'تجربة قانونية لا مثيل لها مع مزايا حصرية' : 'حلول قانونية شاملة لجميع احتياجاتك'}
      </p>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card 
              key={feature.key} 
              className={`group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg ${
                specialEdition
                  ? 'bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 hover:shadow-amber-200/50 dark:hover:shadow-amber-900/30'
                  : 'bg-white/80 dark:bg-gray-800/80 hover:shadow-blue-200/50 dark:hover:shadow-blue-900/30'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className={`p-4 rounded-full transition-all duration-300 group-hover:scale-110 ${
                    specialEdition
                      ? 'bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/50 dark:to-yellow-900/50'
                      : 'bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50'
                  }`}>
                    <Icon className={`h-8 w-8 transition-colors duration-300 ${
                      specialEdition 
                        ? 'text-amber-600 dark:text-amber-400' 
                        : 'text-blue-600 dark:text-blue-400'
                    }`} />
                  </div>
                </div>
                
                <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                  specialEdition 
                    ? 'text-amber-900 dark:text-amber-100' 
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {isArabic ? feature.titleAr : feature.titleEn}
                </h3>
                
                <p className={`leading-relaxed transition-colors duration-300 ${
                  specialEdition 
                    ? 'text-amber-700 dark:text-amber-300' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}>
                  {isArabic ? feature.descAr : feature.descEn}
                </p>

                {specialEdition && (
                  <div className="mt-4 inline-flex items-center text-xs text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full">
                    ⭐ حصري للطبعة الذهبية
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
