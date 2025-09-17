import { lazy, Suspense, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useLegalCase } from '@/hooks/useLegalCases';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  ArrowLeft,
  BadgeCheck,
  CalendarClock,
  ClipboardList,
  Gavel,
  Hash,
  Layers,
  Megaphone,
  Phone,
  Scale,
  UserCircle2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { motion } from 'framer-motion';

const ClientsSection = lazy(() => import('./ClientsSection'));
const CourtsSection = lazy(() => import('./CourtsSection'));
const ProceduresSection = lazy(() => import('./ProceduresSection'));
const SessionsSection = lazy(() => import('./SessionsSection'));
const AdsSection = lazy(() => import('./AdsSection'));

const DetailsSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-10 w-40" />
    <Skeleton className="h-48 w-full" />
    <Skeleton className="h-96 w-full" />
  </div>
);

const LegalCaseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState('procedures');

  const {
    data: legCase,
    isLoading,
    error,
    refetch,
  } = useLegalCase(id);

  const basicInfo = useMemo(() => {
    if (!legCase) return [];
    return [
      {
        label: t('legalCaseDetails.fields.slug'),
        value: legCase.slug ?? '—',
        icon: Hash,
      },
      {
        label: t('legalCaseDetails.fields.title'),
        value: legCase.title ?? '—',
        icon: Layers,
      },
      {
        label: t('legalCaseDetails.fields.status'),
        value: legCase.status ?? '—',
        icon: BadgeCheck,
      },
      {
        label: t('legalCaseDetails.fields.caseType'),
        value: legCase.case_type?.name ?? '—',
        icon: Scale,
      },
      {
        label: t('legalCaseDetails.fields.caseSubType'),
        value: legCase.case_sub_type?.name ?? '—',
        icon: ClipboardList,
      },
      {
        label: t('legalCaseDetails.fields.clientCapacity'),
        value: legCase.client_capacity ?? '—',
        icon: UserCircle2,
      },
    ];
  }, [legCase, t]);

  const opponentInfo = useMemo(() => {
    if (!legCase) return [];
    return [
      {
        label: t('legalCaseDetails.fields.litigantName'),
        value: legCase.litigants_name ?? '—',
        icon: UserCircle2,
      },
      {
        label: t('legalCaseDetails.fields.litigantPhone'),
        value: legCase.litigants_phone ?? '—',
        icon: Phone,
      },
      {
        label: t('legalCaseDetails.fields.lawyerName'),
        value: legCase.litigants_lawyer_name ?? '—',
        icon: Gavel,
      },
      {
        label: t('legalCaseDetails.fields.lawyerPhone'),
        value: legCase.litigants_lawyer_phone ?? '—',
        icon: Phone,
      },
    ];
  }, [legCase, t]);

  if (!id) {
    return (
      <div className="p-6">
        <Card className="p-6 text-destructive">
          {t('legalCaseDetails.fetchError')}
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full border border-border/50 bg-surface-100/80 backdrop-blur-sm transition hover:border-primary/50 hover:bg-primary/10"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">{t('legalCaseDetails.back')}</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {t('legalCaseDetails.title')}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t('legalCaseDetails.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {isLoading && <DetailsSkeleton />}

      {error && (
        <Card className="p-6 text-destructive">
          {t('legalCaseDetails.fetchError')}
        </Card>
      )}

      {!isLoading && legCase && (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <GlassCard
              variant="primary"
              hover="glow"
              className="relative overflow-hidden border border-border/60 bg-gradient-card/90 p-6 md:p-8"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_45%)]" />
              <div className="relative grid gap-8 md:grid-cols-2">
                <InfoList
                  title={t('legalCaseDetails.sections.basicInfo')}
                  items={basicInfo}
                  direction={isRTL ? 'rtl' : 'ltr'}
                />
                <InfoList
                  title={t('legalCaseDetails.sections.opponentInfo')}
                  items={opponentInfo}
                  direction={isRTL ? 'rtl' : 'ltr'}
                />
                {legCase.description && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.15 }}
                    className="md:col-span-2 rounded-2xl border border-border/60 bg-surface-100/80 p-5 shadow-inner"
                  >
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-text-muted">
                      {t('legalCaseDetails.fields.description')}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-strong">
                      {legCase.description}
                    </p>
                  </motion.div>
                )}
              </div>
            </GlassCard>
          </motion.div>

          <Suspense fallback={<DetailsSkeleton />}>
            <ClientsSection
              caseId={id}
              clients={legCase.clients ?? []}
              onChanged={refetch}
            />
          </Suspense>

          <Suspense fallback={<DetailsSkeleton />}>
            <CourtsSection
              caseId={id}
              courts={legCase.courts ?? []}
              onChanged={refetch}
            />
          </Suspense>
          <Suspense fallback={<DetailsSkeleton />}>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="flex flex-wrap justify-start gap-2 md:justify-center">
                <TabsTrigger
                  value="procedures"
                  className="group flex items-center gap-2 rounded-full border border-border/50 bg-surface-100/70 px-4 py-2 text-sm font-semibold text-muted-foreground transition data-[state=active]:border-primary/60 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                  <ClipboardList className="h-4 w-4 transition group-data-[state=active]:text-primary" />
                  {t('legalCaseDetails.tabs.procedures')}
                </TabsTrigger>
                <TabsTrigger
                  value="sessions"
                  className="group flex items-center gap-2 rounded-full border border-border/50 bg-surface-100/70 px-4 py-2 text-sm font-semibold text-muted-foreground transition data-[state=active]:border-primary/60 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                  <CalendarClock className="h-4 w-4 transition group-data-[state=active]:text-primary" />
                  {t('legalCaseDetails.tabs.sessions')}
                </TabsTrigger>
                <TabsTrigger
                  value="ads"
                  className="group flex items-center gap-2 rounded-full border border-border/50 bg-surface-100/70 px-4 py-2 text-sm font-semibold text-muted-foreground transition data-[state=active]:border-primary/60 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                  <Megaphone className="h-4 w-4 transition group-data-[state=active]:text-primary" />
                  {t('legalCaseDetails.tabs.ads')}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="procedures">
                <ProceduresSection caseId={id} onChanged={refetch} />
              </TabsContent>
              <TabsContent value="sessions">
                <SessionsSection caseId={id} onChanged={refetch} />
              </TabsContent>
              <TabsContent value="ads">
                <AdsSection caseId={id} onChanged={refetch} />
              </TabsContent>
            </Tabs>
          </Suspense>

        </div>
      )}
    </div>
  );
};

interface InfoItem {
  label: string;
  value: string;
  icon?: LucideIcon;
}

const InfoList = ({
  title,
  items,
  direction,
}: {
  title: string;
  items: InfoItem[];
  direction: 'rtl' | 'ltr';
}) => (
  <div className="space-y-4" dir={direction}>
    <h3 className="text-sm font-semibold uppercase tracking-wide text-text-muted">
      {title}
    </h3>
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className="group flex items-center gap-3 rounded-2xl border border-border/50 bg-surface-100/80 px-4 py-3 shadow-inner backdrop-blur-sm transition hover:border-primary/60 hover:bg-primary/5"
        >
          {item.icon && (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
              <item.icon className="h-5 w-5" aria-hidden="true" />
            </span>
          )}
          <div className="flex flex-1 flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              {item.label}
            </span>
            <span className="text-sm font-semibold text-text-strong text-end">
              {item.value || '—'}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default LegalCaseDetails;
