import React from 'react';
import { useTranslation } from 'react-i18next';

interface DemoPageProps {
  titleKey: string;
}

const DemoPage: React.FC<DemoPageProps> = ({ titleKey }) => {
  const { t } = useTranslation();
  const title = t(`sidebar.${titleKey}`);
  const description = t('demo.description', { section: title });

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={n}
            className="p-4 rounded-xl border border-glass-border bg-glass-bg/50 dark:bg-glass-bg/20 backdrop-blur shadow-glass transition-all duration-300 hover:shadow-glow hover:-translate-y-1 hover:scale-105"
          >
            <p className="text-center">{t('demo.card_title', { number: n })}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemoPage;
