import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/lib/utils';

const EmptyState = ({ message }) => (
  <div className="rounded-xl border border-dashed border-border/60 bg-muted/10 p-4 text-sm text-muted-foreground">
    {message}
  </div>
);

const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-3">
    <h3 className="text-base font-semibold text-foreground">{title}</h3>
    {subtitle ? <p className="text-xs text-muted-foreground">{subtitle}</p> : null}
  </div>
);

const CaseTreeView = ({ direction, caseItem, caseData, subTab }) => {
  if (!caseItem) {
    return <EmptyState message="اختر قضية لعرض التفاصيل داخل مساحة العمل." />;
  }

  const hasData = caseData?.loaded;
  const isLoading = caseData?.loading;
  const error = caseData?.error;

  const renderProcedures = () => {
    const procedures = caseData?.procedures ?? [];
    if (!hasData && !isLoading) {
      return <EmptyState message="افتح الإجراءات من الشجرة لتحميل البيانات." />;
    }

    if (isLoading) {
      return <EmptyState message="جاري تحميل إجراءات القضية..." />;
    }

    if (error) {
      return <EmptyState message={error} />;
    }

    if (procedures.length === 0) {
      return <EmptyState message="لا توجد إجراءات مرتبطة بهذه القضية." />;
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-3 py-2">النوع</th>
              <th className="px-3 py-2">المكان</th>
              <th className="px-3 py-2">الحالة</th>
              <th className="px-3 py-2">التاريخ</th>
            </tr>
          </thead>
          <tbody>
            {procedures.map((procedure) => (
              <tr key={procedure.id} className="border-b border-border/60">
                <td className="px-3 py-2 text-sm text-foreground">
                  {procedure?.procedure_type?.name ?? procedure?.job ?? '—'}
                </td>
                <td className="px-3 py-2 text-sm text-muted-foreground">
                  {procedure?.procedure_place_name ?? procedure?.procedure_place_type?.name ?? '—'}
                </td>
                <td className="px-3 py-2 text-sm text-muted-foreground">{procedure?.status ?? '—'}</td>
                <td className="px-3 py-2 text-sm text-muted-foreground">{procedure?.date_start ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderSessions = () => {
    const sessions = caseData?.sessions ?? [];
    if (!hasData && !isLoading) {
      return <EmptyState message="افتح الجلسات من الشجرة لتحميل البيانات." />;
    }

    if (isLoading) {
      return <EmptyState message="جاري تحميل الجلسات..." />;
    }

    if (error) {
      return <EmptyState message={error} />;
    }

    if (sessions.length === 0) {
      return <EmptyState message="لا توجد جلسات لهذه القضية." />;
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-3 py-2">التاريخ</th>
              <th className="px-3 py-2">المحكمة</th>
              <th className="px-3 py-2">النتيجة</th>
              <th className="px-3 py-2">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session.id} className="border-b border-border/60">
                <td className="px-3 py-2 text-sm text-foreground">{session?.session_date ?? '—'}</td>
                <td className="px-3 py-2 text-sm text-muted-foreground">
                  {session?.court?.name ?? session?.court_department ?? '—'}
                </td>
                <td className="px-3 py-2 text-sm text-muted-foreground">{session?.result ?? '—'}</td>
                <td className="px-3 py-2 text-sm text-muted-foreground">{session?.status ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderAds = () => {
    const ads = caseData?.ads ?? [];
    if (!hasData && !isLoading) {
      return <EmptyState message="افتح الإعلانات من الشجرة لتحميل البيانات." />;
    }

    if (isLoading) {
      return <EmptyState message="جاري تحميل الإعلانات القانونية..." />;
    }

    if (error) {
      return <EmptyState message={error} />;
    }

    if (ads.length === 0) {
      return <EmptyState message="لا توجد إعلانات لهذه القضية." />;
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-3 py-2">الرقم</th>
              <th className="px-3 py-2">النوع</th>
              <th className="px-3 py-2">التاريخ</th>
              <th className="px-3 py-2">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad.id} className="border-b border-border/60">
                <td className="px-3 py-2 text-sm text-foreground">{ad?.number ?? '—'}</td>
                <td className="px-3 py-2 text-sm text-muted-foreground">{ad?.legal_ad_type?.name ?? '—'}</td>
                <td className="px-3 py-2 text-sm text-muted-foreground">{ad?.date ?? '—'}</td>
                <td className="px-3 py-2 text-sm text-muted-foreground">{ad?.status ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const content = () => {
    switch (subTab) {
      case 'procedures':
        return renderProcedures();
      case 'sessions':
        return renderSessions();
      case 'ads':
        return renderAds();
      default:
        return <EmptyState message="اختر قسمًا من شجرة القضية لعرض التفاصيل." />;
    }
  };

  return (
    <div className={cn('rounded-2xl border border-border/60 bg-background p-4 shadow-sm', direction === 'rtl' ? 'text-right' : 'text-left')}>
      <SectionHeader
        title={`قضية: ${caseItem?.title ?? caseItem?.slug ?? ''}`}
        subtitle={caseItem?.status ? `الحالة: ${caseItem.status}` : null}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={subTab ?? 'empty'}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
        >
          {content()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CaseTreeView;
