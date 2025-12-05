import { lazy, Suspense, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useLegalCase } from '@/hooks/useLegalCases';
import { useLanguage } from '@/contexts/LanguageContext';

import {
  ArrowLeft,
  CalendarClock,
  ClipboardList,
  Megaphone,
} from 'lucide-react';

import { CaseSummaryCard } from '@/components/legalCases/CaseSummaryCard';

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
  const [overviewExpanded, setOverviewExpanded] = useState(true);


  const {
    data: legCase,
    isLoading,
    error,
    refetch,
  } = useLegalCase(id);

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
            className="rounded-full border border-border/50 bg-surface-highlight/80 backdrop-blur-sm transition hover:border-primary/50 hover:bg-primary/10"
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
          <CaseSummaryCard
            legCase={legCase}
            expanded={overviewExpanded}
            onToggleExpanded={() => setOverviewExpanded((prev) => !prev)}
          />

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
                  className="group flex items-center gap-2 rounded-full border border-border/50 bg-surface-highlight/70 px-4 py-2 text-sm font-semibold text-muted-foreground transition data-[state=active]:border-primary/60 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                  <ClipboardList className="h-4 w-4 transition group-data-[state=active]:text-primary" />
                  {t('legalCaseDetails.tabs.procedures')}
                </TabsTrigger>
                <TabsTrigger
                  value="sessions"
                  className="group flex items-center gap-2 rounded-full border border-border/50 bg-surface-highlight/70 px-4 py-2 text-sm font-semibold text-muted-foreground transition data-[state=active]:border-primary/60 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                  <CalendarClock className="h-4 w-4 transition group-data-[state=active]:text-primary" />
                  {t('legalCaseDetails.tabs.sessions')}
                </TabsTrigger>
                <TabsTrigger
                  value="ads"
                  className="group flex items-center gap-2 rounded-full border border-border/50 bg-surface-highlight/70 px-4 py-2 text-sm font-semibold text-muted-foreground transition data-[state=active]:border-primary/60 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
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

export default LegalCaseDetails;
