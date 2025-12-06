import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ClipboardList,
  MapPin,
  Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import CaseSection from '@/components/legalCases/Details/CaseSection';
import { ServiceSummaryCard } from '@/components/services/ServiceSummaryCard';
import { useService } from '@/hooks/useServices';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const DetailsSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-10 w-40" />
    <Skeleton className="h-48 w-full" />
    <Skeleton className="h-96 w-full" />
  </div>
);

const ServiceDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { t, isRTL } = useLanguage();
  const [overviewExpanded, setOverviewExpanded] = useState(true);

  const {
    data: service,
    isLoading,
    error,
  } = useService(id);

  if (!id) {
    return (
      <div className="p-6">
        <Card className="p-6 text-destructive">{t('serviceDetails.fetchError')}</Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="hero"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full border border-border/50 bg-surface-highlight/80 backdrop-blur-sm transition hover:border-primary/50 hover:bg-primary/10"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">{t('serviceDetails.back')}</span>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t('serviceDetails.title')}</h1>
            <p className="text-sm text-muted-foreground">{t('serviceDetails.subtitle')}</p>
          </div>
        </div>
      </div>

      {isLoading && <DetailsSkeleton />}

      {error && (
        <Card className="p-6 text-destructive">{t('serviceDetails.fetchError')}</Card>
      )}

      {!isLoading && service && (
        <div className="space-y-6">
          <ServiceSummaryCard
            service={service}
            expanded={overviewExpanded}
            onToggleExpanded={() => setOverviewExpanded((prev) => !prev)}
          />

          <CaseSection
            icon={Users}
            title={t('serviceDetails.clients.title')}
            subtitle={t('serviceDetails.clients.subtitle')}
          >
            <div className="grid gap-3 md:grid-cols-2">
              {(service.clients ?? []).map((client) => (
                <Card key={`client-${client.id}`} className="p-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-semibold text-foreground">{client.name}</div>
                      <Badge variant="secondary">{t('serviceDetails.clients.client')}</Badge>
                    </div>
                  </div>
                </Card>
              ))}

              {(service.unclients ?? []).map((unclient) => (
                <Card key={`unclient-${unclient.id}`} className="p-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-semibold text-foreground">{unclient.name}</div>
                      <Badge variant="outline">{t('serviceDetails.clients.prospect')}</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {(service.clients?.length ?? 0) === 0 && (service.unclients?.length ?? 0) === 0 && (
              <Card className="p-4 text-center text-muted-foreground">
                {t('serviceDetails.clients.empty')}
              </Card>
            )}
          </CaseSection>

          <CaseSection
            icon={ClipboardList}
            title={t('serviceDetails.procedures.title')}
            subtitle={t('serviceDetails.procedures.subtitle')}
          >
            {service.procedures && service.procedures.length > 0 ? (
              <div className="overflow-hidden rounded-2xl border border-border/70">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('serviceDetails.procedures.columns.title')}</TableHead>
                      <TableHead>{t('serviceDetails.procedures.columns.lawyer')}</TableHead>
                      <TableHead>{t('serviceDetails.procedures.columns.place')}</TableHead>
                      <TableHead>{t('serviceDetails.procedures.columns.startDate')}</TableHead>
                      <TableHead>{t('serviceDetails.procedures.columns.endDate')}</TableHead>
                      <TableHead className="text-right">{t('serviceDetails.procedures.columns.status')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {service.procedures.map((procedure) => (
                      <TableRow key={procedure.id}>
                        <TableCell className="font-medium">{procedure.title ?? '—'}</TableCell>
                        <TableCell>{procedure.lawyer?.name ?? '—'}</TableCell>
                        <TableCell className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{procedure.procedure_place_name ?? '—'}</span>
                        </TableCell>
                        <TableCell>
                          {procedure.date_start ? new Date(procedure.date_start).toLocaleDateString() : '—'}
                        </TableCell>
                        <TableCell>
                          {procedure.date_end ? new Date(procedure.date_end).toLocaleDateString() : '—'}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant="outline"
                            className={cn(
                              'rounded-full px-3 py-1 text-xs font-semibold',
                              procedure.status === 'تمت'
                                ? 'border-emerald-200 text-emerald-700'
                                : procedure.status === 'جارى التنفيذ'
                                  ? 'border-amber-200 text-amber-700'
                                  : 'border-slate-200 text-slate-700',
                            )}
                          >
                            {procedure.status ?? t('serviceDetails.procedures.status.unknown')}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <Card className="flex items-center justify-center gap-2 p-6 text-muted-foreground">
                <ClipboardList className="h-4 w-4" />
                <span>{t('serviceDetails.procedures.empty')}</span>
              </Card>
            )}
          </CaseSection>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
