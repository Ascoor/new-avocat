import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

export const ContactSection = () => {
  const { t } = useTranslation();
  return (
    <section id="contact" className="py-16 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto max-w-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">{t('lawlanding.contact.title')}</h2>
        <form className="space-y-4">
          <input type="text" placeholder={t('lawlanding.contact.name')} className="w-full p-3 rounded-md border border-gray-300" />
          <input type="email" placeholder={t('lawlanding.contact.email')} className="w-full p-3 rounded-md border border-gray-300" />
          <textarea placeholder={t('lawlanding.contact.message')} className="w-full p-3 rounded-md border border-gray-300 h-32" />
          <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
            {t('lawlanding.contact.submit')}
          </Button>
        </form>
      </div>
    </section>
  );
};
