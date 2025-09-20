import { Suspense, lazy } from 'react';
import { UserMinus } from 'lucide-react';

import PageHeader from '@/components/common/PageHeader';
import GlobalSpinner from '@/components/common/GlobalSpinner';
import { useLanguage } from '@/contexts/LanguageContext';

const UnClientList = lazy(() => import('@/components/clientsAndUnclients/UnClients'));

const UnClientPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="space-y-6">
      <PageHeader
        icon={<UserMinus className="h-6 w-6" />}
        title={t('unClients.title')}
        subtitle={t('unClients.subtitle')}
      />

      <Suspense fallback={<GlobalSpinner />}>
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
          <UnClientList />
        </div>
      </Suspense>
    </section>
  );
};

export default UnClientPage;
