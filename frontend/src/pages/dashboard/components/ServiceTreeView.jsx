import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/lib/utils';

const EmptyState = ({ message }) => (
  <div className="rounded-xl border border-dashed border-border/60 bg-muted/10 p-4 text-sm text-muted-foreground">
    {message}
  </div>
);

const ServiceTreeView = ({ direction, service, serviceData, subTab }) => {
  if (!service) {
    return <EmptyState message="اختر خدمة لعرض التفاصيل داخل مساحة العمل." />;
  }

  const hasData = serviceData?.loaded;
  const isLoading = serviceData?.loading;
  const error = serviceData?.error;

  const renderProcedures = () => {
    const procedures = serviceData?.procedures ?? [];

    if (!hasData && !isLoading) {
      return <EmptyState message="افتح الإجراءات من الشجرة لتحميل البيانات." />;
    }

    if (isLoading) {
      return <EmptyState message="جاري تحميل إجراءات الخدمة..." />;
    }

    if (error) {
      return <EmptyState message={error} />;
    }

    if (procedures.length === 0) {
      return <EmptyState message="لا توجد إجراءات لهذه الخدمة." />;
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-3 py-2">العنوان</th>
              <th className="px-3 py-2">المكان</th>
              <th className="px-3 py-2">الحالة</th>
              <th className="px-3 py-2">التاريخ</th>
            </tr>
          </thead>
          <tbody>
            {procedures.map((procedure) => (
              <tr key={procedure.id} className="border-b border-border/60">
                <td className="px-3 py-2 text-sm text-foreground">
                  {procedure?.title ?? procedure?.job ?? '—'}
                </td>
                <td className="px-3 py-2 text-sm text-muted-foreground">
                  {procedure?.procedure_place_name ?? '—'}
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

  const content = () => {
    if (subTab === 'procedures') {
      return renderProcedures();
    }

    return <EmptyState message="اختر قسمًا من شجرة الخدمة لعرض التفاصيل." />;
  };

  return (
    <div className={cn('rounded-2xl border border-border/60 bg-background p-4 shadow-sm', direction === 'rtl' ? 'text-right' : 'text-left')}>
      <div className="mb-3">
        <h3 className="text-base font-semibold text-foreground">خدمة: {service?.slug ?? '—'}</h3>
        {service?.status ? <p className="text-xs text-muted-foreground">الحالة: {service.status}</p> : null}
      </div>
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

export default ServiceTreeView;
