
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '../ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQSectionProps {
  specialEdition: boolean;
}

const faqs = [
  {
    id: 1,
    questionAr: 'كيف يمكنني حجز استشارة قانونية؟',
    questionEn: 'How can I book a legal consultation?',
    answerAr: 'يمكنك حجز استشارة قانونية بسهولة من خلال التطبيق أو الموقع الإلكتروني. اختر المحامي المناسب واحجز الموعد الذي يناسبك.',
    answerEn: 'You can easily book a legal consultation through the app or website. Choose the right lawyer and book an appointment that suits you.'
  },
  {
    id: 2,
    questionAr: 'ما هي تكلفة الخدمات القانونية؟',
    questionEn: 'What is the cost of legal services?',
    answerAr: 'تختلف التكلفة حسب نوع الخدمة والمحامي المختار. يمكنك مراجعة الأسعار قبل الحجز مع إمكانية الحصول على استشارة مجانية أولية.',
    answerEn: 'The cost varies depending on the type of service and the chosen lawyer. You can review prices before booking with the possibility of getting an initial free consultation.'
  },
  {
    id: 3,
    questionAr: 'هل البيانات آمنة ومحمية؟',
    questionEn: 'Is the data safe and protected?',
    answerAr: 'نعم، نحن نستخدم أحدث تقنيات الأمان والتشفير لحماية بياناتك الشخصية والقانونية بأعلى معايير الأمان.',
    answerEn: 'Yes, we use the latest security and encryption technologies to protect your personal and legal data with the highest security standards.'
  },
  {
    id: 4,
    questionAr: 'هل يمكنني متابعة قضيتي إلكترونياً؟',
    questionEn: 'Can I track my case electronically?',
    answerAr: 'بالطبع! يمكنك متابعة تطورات قضيتك، المواعيد القادمة، والمستندات المطلوبة من خلال حسابك على المنصة.',
    answerEn: 'Of course! You can track your case developments, upcoming appointments, and required documents through your account on the platform.'
  },
  {
    id: 5,
    questionAr: 'ما هي مميزات الطبعة الذهبية؟',
    questionEn: 'What are the features of the Golden Edition?',
    answerAr: 'الطبعة الذهبية تشمل استشارات مجانية إضافية، أولوية في الحجز، دعم مخصص 24/7، وخصومات حصرية على جميع الخدمات.',
    answerEn: 'The Golden Edition includes additional free consultations, booking priority, dedicated 24/7 support, and exclusive discounts on all services.'
  }
];

export const FAQSection = ({ specialEdition }: FAQSectionProps) => {
  const { i18n } = useTranslation();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const isArabic = i18n.language === 'ar';

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${
          specialEdition 
            ? 'text-amber-900 dark:text-amber-100' 
            : 'text-gray-900 dark:text-white'
        }`}>
          {specialEdition ? 'أسئلة شائعة - الطبعة الذهبية' : 'الأسئلة الشائعة'}
        </h2>
        <p className={`text-lg transition-colors duration-300 ${
          specialEdition 
            ? 'text-amber-700 dark:text-amber-300' 
            : 'text-gray-600 dark:text-gray-300'
        }`}>
          {specialEdition ? 'إجابات على أهم استفساراتكم حول الطبعة الذهبية' : 'إجابات على أهم استفساراتكم'}
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card 
            key={faq.id}
            className={`transition-all duration-300 border-0 shadow-lg hover:shadow-xl ${
              specialEdition
                ? 'bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20'
                : 'bg-white dark:bg-gray-800'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-0">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className={`w-full p-6 text-left flex items-center justify-between transition-colors duration-200 ${
                  specialEdition 
                    ? 'hover:bg-amber-100/50 dark:hover:bg-amber-900/30' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <h3 className={`text-lg font-semibold transition-colors duration-300 ${
                  specialEdition 
                    ? 'text-amber-900 dark:text-amber-100' 
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {isArabic ? faq.questionAr : faq.questionEn}
                </h3>
                
                <div className={`transition-transform duration-200 ${
                  openFAQ === faq.id ? 'rotate-180' : ''
                }`}>
                  <ChevronDown className={`h-5 w-5 transition-colors duration-300 ${
                    specialEdition 
                      ? 'text-amber-600 dark:text-amber-400' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`} />
                </div>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${
                openFAQ === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-6">
                  <p className={`leading-relaxed transition-colors duration-300 ${
                    specialEdition 
                      ? 'text-amber-700 dark:text-amber-300' 
                      : 'text-gray-600 dark:text-gray-300'
                  }`}>
                    {isArabic ? faq.answerAr : faq.answerEn}
                  </p>
                  
                  {specialEdition && faq.id === 5 && (
                    <div className="mt-4 inline-flex items-center text-xs text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full">
                      🏆 مميزات حصرية
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
