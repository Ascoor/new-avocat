import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="py-8 bg-gray-900 text-gray-200 text-center">
      <p>{t('lawlanding.footer.rights')}</p>
    </footer>
  );
};
