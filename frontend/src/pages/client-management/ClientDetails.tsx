import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarClock, Mail, Phone, Shield } from 'lucide-react';

import { clientManagementService } from '@/api/clientManagement.service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/LanguageContext';

import { DetailRow } from './ClientDetails.helpers';

const ClientDetails = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const id = Number(clientId);

  const clientQuery = useQuery({
    queryKey: ['client-management', 'client', id],
    queryFn: () => clientManagementService.getClient(id!),
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

  if (clientQuery.isLoading) {
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

  if (!clientId || !clientQuery.data) {
    return (
      <Card className="border border-border/60 bg-card/60">
        <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            {t('clientManagement.clients.details.notFound')}
          </p>
          <Button onClick={() => navigate('/dashboard/clients')} variant="secondary">
            {t('clientManagement.clients.details.backToList')}
          </Button>
        </CardContent>
      </Card>
    );
  }

  const client = clientQuery.data;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">{client.name}</h2>
          <p className="text-sm text-muted-foreground">
            {t('clientManagement.clients.details.subtitle')}
          </p>
        </div>
        <Button variant="ghost" onClick={() => navigate('/dashboard/clients')} className="w-full justify-center sm:w-auto">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('clientManagement.clients.details.backToList')}
        </Button>
      </div>

      <Card className="border border-border/60 bg-card/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5" />
            {t('clientManagement.clients.details.overview')}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <DetailRow label={t('clientManagement.form.name')} value={client.name} />
            <DetailRow label={t('clientManagement.form.email')} value={client.email} icon={Mail} />
            <DetailRow label={t('clientManagement.form.phone')} value={client.phone_number} icon={Phone} />
            <DetailRow label={t('clientManagement.form.address')} value={client.address} />
            <DetailRow label={t('clientManagement.form.nationality')} value={client.nationality} />
          </div>
          <div className="space-y-3">
            <DetailRow label={t('clientManagement.form.work')} value={client.work} />
            <DetailRow label={t('clientManagement.form.emergency')} value={client.emergency_number} />
            <DetailRow label={t('clientManagement.form.birthDate')} value={formatDate(client.date_of_birth)} icon={CalendarClock} />
            <DetailRow label={t('clientManagement.form.gender')} value={client.gender === 'ذكر' ? t('clientManagement.form.genderMale') : t('clientManagement.form.genderFemale')} />
            <DetailRow label={t('clientManagement.form.religion')} value={client.religion === 'مسلم' ? t('clientManagement.form.religionMuslim') : t('clientManagement.form.religionChristian')} />
            <DetailRow label={t('clientManagement.form.identity')} value={client.identity_number} />
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border/60 bg-card/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CalendarClock className="h-5 w-5" />
            {t('clientManagement.clients.details.timeline')}
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <DetailRow label={t('clientManagement.clients.details.createdAt')} value={formatDate(client.created_at)} />
          <DetailRow label={t('clientManagement.clients.details.updatedAt')} value={formatDate(client.updated_at)} />
          <DetailRow
            label={t('clientManagement.form.status')}
            value={t(`status.${client.status}`)}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDetails;
