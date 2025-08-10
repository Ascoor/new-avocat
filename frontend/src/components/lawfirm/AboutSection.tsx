import { useTranslation } from 'react-i18next';

export const AboutSection = () => {
  const { t } = useTranslation();
  return (
    <section id="about" className="py-16">
      <div className="container mx-auto text-center max-w-2xl">
        <h2 className="text-3xl font-bold mb-6">{t('lawlanding.about.title')}</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {t('lawlanding.about.description')}
        </p>
      </div>
    </section>
  );
};
