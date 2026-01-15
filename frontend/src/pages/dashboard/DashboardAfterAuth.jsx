import { useMemo, useState } from 'react';
import { LayoutGrid, MoveHorizontal } from 'lucide-react';

import { cn } from '@/lib/utils';
import { shellContainer } from '@/components/layout/layout-classes';
import { useLanguage } from '@/contexts/LanguageContext';
import useClientsSearch from '@/hooks/useClientsSearch';
import useClientWorkspace from '@/hooks/useClientWorkspace';
import useCaseTree from '@/hooks/useCaseTree';
import useServiceTree from '@/hooks/useServiceTree';

import ResultsPanel from './components/ResultsPanel';
import ClientWorkspace from './components/ClientWorkspace';

const DashboardAfterAuth = ({ direction: initialDirection }) => {
  const { language } = useLanguage();
  const defaultDirection = useMemo(
    () => initialDirection ?? (language === 'ar' ? 'rtl' : 'ltr'),
    [initialDirection, language],
  );

  const [direction, setDirection] = useState(defaultDirection);
  const [query, setQuery] = useState('');
  const [view, setView] = useState({
    clientId: null,
    section: 'cases',
    itemId: null,
    subTab: null,
  });

  const { results, loading: searchLoading, error: searchError } = useClientsSearch(query);
  const { client, cases, services, loading: workspaceLoading, error: workspaceError } = useClientWorkspace(view.clientId);
  const { caseTree, loadCaseTree } = useCaseTree();
  const { serviceTree, loadServiceTree } = useServiceTree();

  const handleSelectClient = (clientItem) => {
    setView({
      clientId: clientItem?.id ?? null,
      section: 'cases',
      itemId: null,
      subTab: null,
    });
  };

  const handleToggleDirection = () => {
    setDirection((prev) => (prev === 'rtl' ? 'ltr' : 'rtl'));
  };

  const resultsPanelOrder = direction === 'rtl' ? 'lg:order-2' : 'lg:order-1';
  const workspaceOrder = direction === 'rtl' ? 'lg:order-1' : 'lg:order-2';

  return (
    <div dir={direction} className={cn(shellContainer, 'w-full px-4 pb-10 pt-6 sm:px-6 lg:px-10', direction === 'rtl' ? 'text-right' : 'text-left')}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
            <LayoutGrid className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">لوحة التحكم</h1>
            <p className="text-sm text-muted-foreground">إدارة الموكلين والقضايا والخدمات بشكل مباشر.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleToggleDirection}
          className="flex items-center gap-2 rounded-full border border-border/60 bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted/40"
        >
          <MoveHorizontal className="h-4 w-4" />
          {direction === 'rtl' ? 'تفعيل LTR' : 'تفعيل RTL'}
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className={cn('col-span-12 flex-none min-w-[320px] lg:col-span-4', resultsPanelOrder)}>
          <ResultsPanel
            direction={direction}
            query={query}
            onQueryChange={setQuery}
            results={results}
            loading={searchLoading}
            error={searchError}
            selectedClientId={view.clientId}
            onSelectClient={handleSelectClient}
          />
        </div>
        <div className={cn('col-span-12 min-w-0 lg:col-span-8', workspaceOrder)}>
          <ClientWorkspace
            direction={direction}
            client={client}
            cases={cases}
            services={services}
            loading={workspaceLoading}
            error={workspaceError}
            view={view}
            onChangeView={setView}
            caseTree={caseTree}
            serviceTree={serviceTree}
            loadCaseTree={loadCaseTree}
            loadServiceTree={loadServiceTree}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardAfterAuth;
