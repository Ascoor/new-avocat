import { Suspense, lazy } from 'react';
import { Users } from 'lucide-react';

import PageHeader from '@/components/common/PageHeader';
import GlobalSpinner from '@/components/common/GlobalSpinner';
import { useLanguage } from '@/contexts/LanguageContext';

const ClientList = lazy(() => import('@/components/clientsAndUnclients/Clients'));

const ClientPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="space-y-6">
      <PageHeader
        icon={<Users className="h-6 w-6" />}
        title={t('clients.title')}
        subtitle={t('clients.subtitle')}
      />

      <Suspense fallback={<GlobalSpinner />}>
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
          <ClientList />
        </div>
      </Suspense>
    </section>
  );
};

export default ClientPage;
