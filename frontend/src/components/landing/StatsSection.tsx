
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface StatsSectionProps {
  specialEdition: boolean;
}

const stats = [
  {
    key: 'cases',
    value: 5000,
    suffix: '+',
    titleAr: 'قضية مكتملة',
    titleEn: 'Completed Cases'
  },
  {
    key: 'lawyers',
    value: 150,
    suffix: '+',
    titleAr: 'محامي محترف',
    titleEn: 'Professional Lawyers'
  },
  {
    key: 'satisfaction',
    value: 98,
    suffix: '%',
    titleAr: 'رضا العملاء',
    titleEn: 'Client Satisfaction'
  },
  {
    key: 'years',
    value: 15,
    suffix: '+',
    titleAr: 'سنة خبرة',
    titleEn: 'Years Experience'
  }
];

export const StatsSection = ({ specialEdition }: StatsSectionProps) => {
  const { i18n } = useTranslation();
  const [animated, setAnimated] = useState(false);
  const isArabic = i18n.language === 'ar';

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="text-center">
      <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${
        specialEdition 
          ? 'text-amber-900 dark:text-amber-100' 
          : 'text-gray-900 dark:text-white'
      }`}>
        {specialEdition ? 'إنجازات الطبعة الذهبية' : 'إنجازاتنا بالأرقام'}
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
        {stats.map((stat, index) => (
          <div
            key={stat.key}
            className={`text-center transform transition-all duration-500 ${
              animated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className={`text-4xl md:text-5xl font-bold mb-2 transition-colors duration-300 ${
              specialEdition 
                ? 'text-amber-600 dark:text-amber-400' 
                : 'text-blue-600 dark:text-blue-400'
            }`}>
              <AnimatedCounter
                target={stat.value}
                suffix={stat.suffix}
                animated={animated}
                delay={index * 150}
              />
            </div>
            <p className={`text-lg font-medium transition-colors duration-300 ${
              specialEdition 
                ? 'text-amber-800 dark:text-amber-200' 
                : 'text-gray-700 dark:text-gray-300'
            }`}>
              {isArabic ? stat.titleAr : stat.titleEn}
            </p>
          </div>
        ))}
      </div>

      {specialEdition && (
        <div className="mt-8 inline-flex items-center text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-6 py-3 rounded-full">
          🏆 أرقام حصرية للطبعة الذهبية - أداء استثنائي
        </div>
      )}
    </div>
  );
};

interface AnimatedCounterProps {
  target: number;
  suffix: string;
  animated: boolean;
  delay: number;
}

const AnimatedCounter = ({ target, suffix, animated, delay }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!animated) return;

    const timer = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(counter);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [target, animated, delay]);

  return <span>{count}{suffix}</span>;
};
