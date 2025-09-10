import { useTranslation } from 'react-i18next';
import { BrandLogo } from '@/components/common/BrandLogo';

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="py-8 bg-gray-900 text-gray-200 text-center">
      <BrandLogo variant="full" className="mx-auto mb-4 h-10 w-auto" />
      <p>{t('lawlanding.footer.rights')}</p>
    </footer>
  );
};
