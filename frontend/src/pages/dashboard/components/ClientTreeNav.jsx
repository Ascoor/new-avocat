import { useMemo, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, FolderTree, Layers } from 'lucide-react';

import { cn } from '@/lib/utils';

const TreeSectionButton = ({
  title,
  count,
  isOpen,
  onToggle,
  direction,
}) => (
  <button
    type="button"
    onClick={onToggle}
    className="flex w-full items-center justify-between rounded-lg border border-border/60 bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-muted/40"
  >
    <span className="flex items-center gap-2">
      <Layers className="h-4 w-4 text-muted-foreground" />
      {title}
      <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{count}</span>
    </span>
    <span className="flex items-center gap-1 text-xs text-muted-foreground">
      {isOpen ? 'إخفاء' : 'عرض'}
      <ChevronDown
        className={cn('h-4 w-4 transition', isOpen ? 'rotate-180' : '')}
      />
    </span>
  </button>
);

const TreeItem = ({
  title,
  subtitle,
  isActive,
  onClick,
  direction,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'flex w-full items-start justify-between gap-2 rounded-lg border border-transparent px-3 py-2 text-sm transition hover:bg-muted/30',
      isActive && 'border-brand-primary/40 bg-brand-primary/10 text-brand-primary',
      direction === 'rtl' ? 'text-right' : 'text-left',
    )}
  >
    <span className="flex flex-col">
      <span className="font-medium">{title}</span>
      {subtitle ? <span className="text-xs text-muted-foreground">{subtitle}</span> : null}
    </span>
    {direction === 'rtl' ? (
      <ChevronLeft className="mt-1 h-4 w-4 text-muted-foreground" />
    ) : (
      <ChevronRight className="mt-1 h-4 w-4 text-muted-foreground" />
    )}
  </button>
);

const CaseNode = ({
  caseItem,
  isExpanded,
  onToggle,
  onSelect,
  isActive,
  direction,
}) => (
  <div className="rounded-xl border border-border/60 bg-background p-3 shadow-sm">
    <div className="flex items-center justify-between">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-2 text-sm font-semibold text-foreground"
      >
        <FolderTree className="h-4 w-4 text-muted-foreground" />
        {caseItem?.title ?? caseItem?.slug ?? 'قضية'}
      </button>
      <button
        type="button"
        onClick={() => onSelect({ section: 'cases', itemId: caseItem?.id, subTab: null })}
        className={cn(
          'rounded-full border border-border/60 px-2 py-1 text-xs text-muted-foreground transition hover:bg-muted/40',
          isActive && 'border-brand-primary/40 bg-brand-primary/10 text-brand-primary',
        )}
      >
        التفاصيل
      </button>
    </div>
    {isExpanded ? (
      <div className="mt-3 space-y-2">
        <TreeItem
          title="الإجراءات"
          subtitle="إجراءات القضية"
          isActive={isActive?.subTab === 'procedures'}
          onClick={() => onSelect({ section: 'cases', itemId: caseItem?.id, subTab: 'procedures' })}
          direction={direction}
        />
        <TreeItem
          title="الجلسات"
          subtitle="مواعيد الجلسات"
          isActive={isActive?.subTab === 'sessions'}
          onClick={() => onSelect({ section: 'cases', itemId: caseItem?.id, subTab: 'sessions' })}
          direction={direction}
        />
        <TreeItem
          title="الإعلانات"
          subtitle="إعلانات القضية"
          isActive={isActive?.subTab === 'ads'}
          onClick={() => onSelect({ section: 'cases', itemId: caseItem?.id, subTab: 'ads' })}
          direction={direction}
        />
      </div>
    ) : null}
  </div>
);

const ServiceNode = ({
  service,
  isExpanded,
  onToggle,
  onSelect,
  isActive,
  direction,
}) => (
  <div className="rounded-xl border border-border/60 bg-background p-3 shadow-sm">
    <div className="flex items-center justify-between">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-2 text-sm font-semibold text-foreground"
      >
        <FolderTree className="h-4 w-4 text-muted-foreground" />
        {service?.slug ?? 'خدمة'}
      </button>
      <button
        type="button"
        onClick={() => onSelect({ section: 'services', itemId: service?.id, subTab: null })}
        className={cn(
          'rounded-full border border-border/60 px-2 py-1 text-xs text-muted-foreground transition hover:bg-muted/40',
          isActive && 'border-brand-primary/40 bg-brand-primary/10 text-brand-primary',
        )}
      >
        التفاصيل
      </button>
    </div>
    {isExpanded ? (
      <div className="mt-3 space-y-2">
        <TreeItem
          title="الإجراءات"
          subtitle="إجراءات الخدمة"
          isActive={isActive?.subTab === 'procedures'}
          onClick={() => onSelect({ section: 'services', itemId: service?.id, subTab: 'procedures' })}
          direction={direction}
        />
      </div>
    ) : null}
  </div>
);

const ClientTreeNav = ({
  direction,
  client,
  cases,
  services,
  view,
  onChangeView,
  onLoadCaseTree,
  onLoadServiceTree,
}) => {
  const [openCases, setOpenCases] = useState(true);
  const [openServices, setOpenServices] = useState(true);
  const [expandedCases, setExpandedCases] = useState([]);
  const [expandedServices, setExpandedServices] = useState([]);

  const activeCaseView = useMemo(() => (
    view.section === 'cases' ? view : null
  ), [view]);

  const activeServiceView = useMemo(() => (
    view.section === 'services' ? view : null
  ), [view]);

  const toggleExpandedCase = (caseId) => {
    setExpandedCases((prev) => {
      const exists = prev.includes(caseId);
      const next = exists ? prev.filter((id) => id !== caseId) : [...prev, caseId];
      if (!exists) {
        onLoadCaseTree(caseId);
      }
      return next;
    });
  };

  const toggleExpandedService = (serviceId) => {
    setExpandedServices((prev) => {
      const exists = prev.includes(serviceId);
      const next = exists ? prev.filter((id) => id !== serviceId) : [...prev, serviceId];
      if (!exists) {
        onLoadServiceTree(serviceId);
      }
      return next;
    });
  };

  const handleSelect = (nextView) => {
    onChangeView({
      clientId: view.clientId,
      section: nextView.section,
      itemId: nextView.itemId,
      subTab: nextView.subTab ?? null,
    });
  };

  return (
    <div className={cn('space-y-4', direction === 'rtl' ? 'text-right' : 'text-left')}>
      <div className="rounded-2xl border border-border/60 bg-background p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-foreground">شجرة الموكل</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {client ? `العميل: ${client?.name ?? '—'}` : 'اختر موكل لعرض التفاصيل.'}
        </p>
      </div>

      <TreeSectionButton
        title="القضايا"
        count={cases.length}
        isOpen={openCases}
        onToggle={() => setOpenCases((prev) => !prev)}
        direction={direction}
      />

      {openCases ? (
        <div className="space-y-3">
          {cases.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border/60 bg-muted/10 p-3 text-xs text-muted-foreground">
              لا توجد قضايا مرتبطة بالموكل حالياً.
            </div>
          ) : (
            cases.map((caseItem) => (
              <CaseNode
                key={caseItem.id}
                caseItem={caseItem}
                isExpanded={expandedCases.includes(caseItem.id)}
                onToggle={() => toggleExpandedCase(caseItem.id)}
                onSelect={handleSelect}
                isActive={activeCaseView?.itemId === caseItem.id ? activeCaseView : null}
                direction={direction}
              />
            ))
          )}
        </div>
      ) : null}

      <TreeSectionButton
        title="الخدمات"
        count={services.length}
        isOpen={openServices}
        onToggle={() => setOpenServices((prev) => !prev)}
        direction={direction}
      />

      {openServices ? (
        <div className="space-y-3">
          {services.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border/60 bg-muted/10 p-3 text-xs text-muted-foreground">
              لا توجد خدمات مرتبطة بالموكل حالياً.
            </div>
          ) : (
            services.map((service) => (
              <ServiceNode
                key={service.id}
                service={service}
                isExpanded={expandedServices.includes(service.id)}
                onToggle={() => toggleExpandedService(service.id)}
                onSelect={handleSelect}
                isActive={activeServiceView?.itemId === service.id ? activeServiceView : null}
                direction={direction}
              />
            ))
          )}
        </div>
      ) : null}
    </div>
  );
};

export default ClientTreeNav;
