import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/ui/language-toggle';

const LandingPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between p-6">
        <h1 className="text-2xl font-bold gradient-text">{t('brand.name')}</h1>
        <LanguageToggle />
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center space-y-6 p-4">
        <h2 className="text-4xl font-bold">{t('brand.slogan')}</h2>
        <Button asChild className="glow-effect">
          <Link to="/login">{t('auth.login.title')}</Link>
        </Button>
      </main>
    </div>
  );
};

export default LandingPage;
