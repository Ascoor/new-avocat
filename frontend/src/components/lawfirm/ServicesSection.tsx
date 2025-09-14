import { useTranslation } from 'react-i18next';
import { Scale, Gavel, FileText, Users } from 'lucide-react';

const services = [
  { icon: Scale, key: 'litigation' },
  { icon: Gavel, key: 'consult' },
  { icon: FileText, key: 'contracts' },
  { icon: Users, key: 'corporate' }
];

export const ServicesSection = () => {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-16 bg-background">
      <div className="container mx-auto text-center">
        <h2 className="section-title mb-8">{t('lawlanding.services.title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.key} className="service-card">
              <service.icon className="h-10 w-10 mx-auto text-primary mb-4" />
              <p className="font-medium">{t(`lawlanding.services.${service.key}`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
