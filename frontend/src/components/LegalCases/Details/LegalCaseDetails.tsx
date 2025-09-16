import { lazy, Suspense, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useLegalCase } from '@/hooks/useLegalCases';
import { LegalCase } from '@/types/legalCase';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft } from 'lucide-react';

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
  const { t } = useLanguage();
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
      { label: t('legalCaseDetails.fields.slug'), value: legCase.slug },
      { label: t('legalCaseDetails.fields.title'), value: legCase.title },
      { label: t('legalCaseDetails.fields.status'), value: legCase.status },
      {
        label: t('legalCaseDetails.fields.caseType'),
        value: legCase.case_type?.name ?? '—',
      },
      {
        label: t('legalCaseDetails.fields.caseSubType'),
        value: legCase.case_sub_type?.name ?? '—',
      },
      {
        label: t('legalCaseDetails.fields.clientCapacity'),
        value: legCase.client_capacity ?? '—',
      },
    ];
  }, [legCase, t]);

  const opponentInfo = useMemo(() => {
    if (!legCase) return [];
    return [
      {
        label: t('legalCaseDetails.fields.litigantName'),
        value: legCase.litigants_name ?? '—',
      },
      {
        label: t('legalCaseDetails.fields.litigantPhone'),
        value: legCase.litigants_phone ?? '—',
      },
      {
        label: t('legalCaseDetails.fields.lawyerName'),
        value: legCase.litigants_lawyer_name ?? '—',
      },
      {
        label: t('legalCaseDetails.fields.lawyerPhone'),
        value: legCase.litigants_lawyer_phone ?? '—',
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
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
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
          <Card className="grid gap-6 p-6 md:grid-cols-2">
            <InfoList title={t('legalCaseDetails.sections.basicInfo')} items={basicInfo} />
            <InfoList
              title={t('legalCaseDetails.sections.opponentInfo')}
              items={opponentInfo}
            />
            {legCase.description && (
              <div className="md:col-span-2">
                <h3 className="text-sm font-semibold text-muted-foreground">
                  {t('legalCaseDetails.fields.description')}
                </h3>
                <p className="mt-2 text-sm text-foreground">{legCase.description}</p>
              </div>
            )}
          </Card>

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
              <TabsList className="flex flex-wrap gap-2">
                <TabsTrigger value="procedures">
                  {t('legalCaseDetails.tabs.procedures')}
                </TabsTrigger>
                <TabsTrigger value="sessions">
                  {t('legalCaseDetails.tabs.sessions')}
                </TabsTrigger>
                <TabsTrigger value="ads">
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
}

const InfoList = ({ title, items }: { title: string; items: InfoItem[] }) => (
  <div className="space-y-3">
    <h3 className="text-sm font-semibold text-muted-foreground">{title}</h3>
    <div className="space-y-2 rounded-lg border border-border/60 bg-card/60 p-4">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col gap-1 text-sm">
          <span className="text-muted-foreground">{item.label}</span>
          <span className="text-foreground">{item.value || '—'}</span>
        </div>
      ))}
    </div>
  </div>
);

export default LegalCaseDetails;
