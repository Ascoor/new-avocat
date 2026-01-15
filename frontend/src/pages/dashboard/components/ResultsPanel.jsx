import { memo, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';

import { cn } from '@/lib/utils';

const highlightText = (text, query) => {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = String(text).split(new RegExp(`(${escaped})`, 'gi'));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={`${part}-${index}`} className="rounded bg-amber-100 px-1 text-amber-900">
        {part}
      </span>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  );
};

const ResultRow = memo(({ client, query, isActive, onSelect }) => {
  const phone = client?.phone_number ?? client?.phoneNumber ?? client?.phone ?? '—';
  return (
    <tr
      className={cn(
        'cursor-pointer border-b border-border/60 transition hover:bg-muted/40',
        isActive && 'bg-muted/60',
      )}
      onClick={() => onSelect(client)}
    >
      <td className="px-3 py-3 text-sm font-medium text-foreground">
        {highlightText(client?.name ?? '—', query)}
      </td>
      <td className="px-3 py-3 text-sm text-muted-foreground">
        {highlightText(client?.slug ?? '—', query)}
      </td>
      <td className="px-3 py-3 text-sm text-muted-foreground">
        {highlightText(phone, query)}
      </td>
    </tr>
  );
});

ResultRow.displayName = 'ResultRow';

const ResultsPanel = ({
  direction,
  query,
  onQueryChange,
  results,
  loading,
  error,
  selectedClientId,
  onSelectClient,
}) => {
  const hasQuery = query.trim().length > 0;
  const shouldAnimateItems = results.length <= 200;

  const motionProps = useMemo(
    () => ({
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 8 },
      transition: { duration: 0.25, ease: 'easeOut' },
    }),
    [],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex h-full flex-col gap-4 rounded-2xl border border-border/60 bg-surface-raised/80 p-4 shadow-card"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-foreground">بحث العملاء</h2>
            <p className="text-sm text-muted-foreground">ابحث بالاسم أو الرقم أو الهاتف.</p>
          </div>
          <span className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            {results.length} نتيجة
          </span>
        </div>
        <div className="relative">
          <Search className={cn('absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground', direction === 'rtl' ? 'right-3' : 'left-3')} />
          <input
            type="text"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="ابحث عن موكل"
            className={cn(
              'w-full rounded-xl border border-border/60 bg-background px-10 py-2 text-sm text-foreground shadow-sm outline-none transition focus:border-brand-primary/60 focus:ring-2 focus:ring-brand-primary/10',
              direction === 'rtl' ? 'pr-10' : 'pl-10',
            )}
          />
        </div>
      </div>

      <div className="flex-1">
        <AnimatePresence mode="wait">
          {!hasQuery ? (
            <motion.div key="empty" {...motionProps} className="rounded-xl border border-dashed border-border/70 bg-muted/10 p-4 text-sm text-muted-foreground">
              ابدأ بإدخال كلمة للبحث عن الموكلين.
            </motion.div>
          ) : null}

          {loading ? (
            <motion.div key="loading" {...motionProps} className="rounded-xl border border-border/70 bg-muted/20 p-4 text-sm text-muted-foreground">
              جاري تحميل النتائج...
            </motion.div>
          ) : null}

          {!loading && error ? (
            <motion.div key="error" {...motionProps} className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-600">
              {error}
            </motion.div>
          ) : null}

          {!loading && hasQuery && !error && results.length === 0 ? (
            <motion.div key="no-results" {...motionProps} className="rounded-xl border border-border/70 bg-muted/20 p-4 text-sm text-muted-foreground">
              لا توجد نتائج مطابقة للبحث الحالي.
            </motion.div>
          ) : null}
        </AnimatePresence>

        {!loading && results.length > 0 ? (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="mt-4 max-h-[70vh] overflow-auto rounded-xl border border-border/60 bg-background/60"
          >
            <div className="md:hidden">
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: shouldAnimateItems ? 0.03 : 0,
                    },
                  },
                }}
                className="divide-y divide-border/60"
              >
                {results.map((client) => {
                  const phone = client?.phone_number ?? client?.phoneNumber ?? client?.phone ?? '—';
                  const isActive = String(client?.id) === String(selectedClientId);
                  return (
                    <motion.li
                      key={client.id}
                      variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                      className={cn('cursor-pointer p-4 transition hover:bg-muted/30', isActive && 'bg-muted/40')}
                      onClick={() => onSelectClient(client)}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-foreground">
                          {highlightText(client?.name ?? '—', query)}
                        </h3>
                        <span className="text-xs text-muted-foreground">{client?.slug ?? '—'}</span>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">{highlightText(phone, query)}</p>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>

            <div className="hidden md:block">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
                    <tr>
                      <th className="px-3 py-2">الاسم</th>
                      <th className="px-3 py-2">الرقم</th>
                      <th className="px-3 py-2">الجوال</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((client) => (
                      <ResultRow
                        key={client.id}
                        client={client}
                        query={query}
                        isActive={String(client?.id) === String(selectedClientId)}
                        onSelect={onSelectClient}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        ) : null}
      </div>
    </motion.div>
  );
};

export default ResultsPanel;
