import { useEffect, useMemo } from 'react';
import { ArrowLeftCircle, ArrowRightCircle, Phone, User } from 'lucide-react';

import { cn } from '@/lib/utils';
import ClientTreeNav from './ClientTreeNav';
import CaseTreeView from './CaseTreeView';
import ServiceTreeView from './ServiceTreeView';

const ClientWorkspace = ({
  direction,
  client,
  cases,
  services,
  loading,
  error,
  view,
  onChangeView,
  caseTree,
  serviceTree,
  loadCaseTree,
  loadServiceTree,
}) => {
  const selectedCase = useMemo(
    () => cases.find((caseItem) => String(caseItem.id) === String(view.itemId)),
    [cases, view.itemId],
  );

  const selectedService = useMemo(
    () => services.find((service) => String(service.id) === String(view.itemId)),
    [services, view.itemId],
  );

  useEffect(() => {
    if (view.section === 'cases' && view.itemId && view.subTab) {
      loadCaseTree(view.itemId);
    }
  }, [loadCaseTree, view.itemId, view.section, view.subTab]);

  useEffect(() => {
    if (view.section === 'services' && view.itemId && view.subTab) {
      loadServiceTree(view.itemId);
    }
  }, [loadServiceTree, view.itemId, view.section, view.subTab]);

  if (!client && !loading) {
    return (
      <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/5 p-8 text-sm text-muted-foreground">
        اختر موكل من نتائج البحث لعرض مساحة العمل.
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-6 rounded-2xl border border-border/60 bg-surface-raised/70 p-4 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">{client?.name ?? '—'}</h2>
            <p className="text-xs text-muted-foreground">{client?.slug ?? '—'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border/60 bg-background px-3 py-1 text-xs text-muted-foreground">
          <Phone className="h-3.5 w-3.5" />
          {client?.phone_number ?? client?.phoneNumber ?? client?.phone ?? '—'}
        </div>
      </div>

      {loading ? (
        <div className="rounded-xl border border-border/60 bg-muted/30 p-4 text-sm text-muted-foreground">
          جاري تحميل بيانات الموكل...
        </div>
      ) : null}

      {error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-600">
          {error}
        </div>
      ) : null}

      <div
        className={cn(
          'flex flex-col gap-6 lg:flex-row',
          direction === 'rtl' ? 'lg:flex-row-reverse' : 'lg:flex-row',
        )}
      >
        <div className="w-full lg:w-[280px]">
          <ClientTreeNav
            direction={direction}
            client={client}
            cases={cases}
            services={services}
            view={view}
            onChangeView={onChangeView}
            onLoadCaseTree={loadCaseTree}
            onLoadServiceTree={loadServiceTree}
          />
        </div>
        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-background p-3 text-sm text-muted-foreground">
            <div>
              {view.section === 'cases' ? 'تفاصيل القضايا' : 'تفاصيل الخدمات'}
              {view.subTab ? ` · ${view.subTab}` : ''}
            </div>
            {direction === 'rtl' ? (
              <ArrowLeftCircle className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ArrowRightCircle className="h-4 w-4 text-muted-foreground" />
            )}
          </div>

          {view.section === 'cases' ? (
            <CaseTreeView
              direction={direction}
              caseItem={selectedCase}
              caseData={selectedCase ? caseTree[selectedCase.id] : null}
              subTab={view.subTab}
            />
          ) : (
            <ServiceTreeView
              direction={direction}
              service={selectedService}
              serviceData={selectedService ? serviceTree[selectedService.id] : null}
              subTab={view.subTab}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientWorkspace;
