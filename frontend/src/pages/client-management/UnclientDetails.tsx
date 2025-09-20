import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarClock, Mail, Phone, Shield } from 'lucide-react';

import { clientManagementService } from '@/api/clientManagement.service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';

import { DetailRow } from './ClientDetails.helpers';

const UnclientDetails = () => {
  const { unclientId } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const id = Number(unclientId);

  const unclientQuery = useQuery({
    queryKey: ['client-management', 'unclient', id],
    queryFn: () => clientManagementService.getUnclient(id!),
    enabled: Number.isFinite(id)
  });

  const formatDate = (value?: string | null) => {
    if (!value) return '—';
    try {
      return new Date(value).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US');
    } catch (error) {
      return value;
    }
  };

  if (unclientQuery.isLoading) {
    return (
      <Card className="border border-border/60 bg-card/60">
        <CardContent className="space-y-4 p-6">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!unclientId || !unclientQuery.data) {
    return (
      <Card className="border border-border/60 bg-card/60">
        <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            {t('clientManagement.unclients.details.notFound')}
          </p>
          <Button onClick={() => navigate('/dashboard/clients/unclients')} variant="secondary">
            {t('clientManagement.unclients.details.backToList')}
          </Button>
        </CardContent>
      </Card>
    );
  }

  const unclient = unclientQuery.data;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">{unclient.name}</h2>
          <p className="text-sm text-muted-foreground">
            {t('clientManagement.unclients.details.subtitle')}
          </p>
        </div>
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard/clients/unclients')}
          className="w-full justify-center sm:w-auto"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('clientManagement.unclients.details.backToList')}
        </Button>
      </div>

      <Card className="border border-border/60 bg-card/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5" />
            {t('clientManagement.unclients.details.overview')}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <DetailRow label={t('clientManagement.form.name')} value={unclient.name} />
            <DetailRow label={t('clientManagement.form.email')} value={unclient.email} icon={Mail} />
            <DetailRow label={t('clientManagement.form.phone')} value={unclient.phone_number} icon={Phone} />
            <DetailRow label={t('clientManagement.form.address')} value={unclient.address} />
            <DetailRow label={t('clientManagement.form.work')} value={unclient.work} />
          </div>
          <div className="space-y-3">
            <DetailRow label={t('clientManagement.form.emergency')} value={unclient.emergency_number} />
            <DetailRow label={t('clientManagement.form.birthDate')} value={formatDate(unclient.date_of_birth)} icon={CalendarClock} />
            <DetailRow
              label={t('clientManagement.form.gender')}
              value={
                unclient.gender
                  ? unclient.gender === 'ذكر'
                    ? t('clientManagement.form.genderMale')
                    : t('clientManagement.form.genderFemale')
                  : undefined
              }
            />
            <DetailRow
              label={t('clientManagement.form.religion')}
              value={
                unclient.religion
                  ? unclient.religion === 'مسلم'
                    ? t('clientManagement.form.religionMuslim')
                    : t('clientManagement.form.religionChristian')
                  : undefined
              }
            />
            <DetailRow label={t('clientManagement.form.identity')} value={unclient.identity_number} />
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border/60 bg-card/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CalendarClock className="h-5 w-5" />
            {t('clientManagement.unclients.details.timeline')}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <DetailRow label={t('clientManagement.unclients.details.createdAt')} value={formatDate(unclient.created_at)} />
          <DetailRow label={t('clientManagement.unclients.details.updatedAt')} value={formatDate(unclient.updated_at)} />
        </CardContent>
      </Card>
    </div>
  );
};

export default UnclientDetails;
