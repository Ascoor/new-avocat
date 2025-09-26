import { useMemo, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Eye, Pencil, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import DetailsTable, { DetailsTableColumn } from '@/components/common/DetailsTable';
import PageHeader from '@/components/common/PageHeader';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import ServiceFormDialog from '@/components/services/ServiceFormDialog';
import type { ServiceRecord } from '@/components/services/types';
import {
  getServices,
  deleteService,
} from '@/api/services.service';

const STATUS_OPTIONS = [
  { value: 'جارى التنفيذ', key: 'inProgress' },
  { value: 'قيد التنفيذ', key: 'underExecution' },
  { value: 'منتهية', key: 'completed' },
  { value: 'متداولة', key: 'circulating' },
  { value: 'استيفاء', key: 'settled' },
] as const;

const statusClassMap: Record<string, string> = {
  'جارى التنفيذ': 'border-amber-300 text-amber-600',
  'قيد التنفيذ': 'border-blue-300 text-blue-600',
  'منتهية': 'border-emerald-300 text-emerald-600',
  'متداولة': 'border-slate-300 text-slate-600',
  'استيفاء': 'border-purple-300 text-purple-600',
  unknown: 'border-muted text-muted-foreground',
};

const ServicesPage: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedService, setSelectedService] = useState<ServiceRecord | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setSelectedService(null);
      setDialogMode('create');
    }
  };

  const servicesQuery = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data } = await getServices();
      if (Array.isArray(data)) {
        return data as unknown as ServiceRecord[];
      }
      return data.services ?? [];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteService(String(id)),
    onSuccess: () => {
      toast({ title: t('services.messages.deleteSuccess') });
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
    onError: () => {
      toast({
        title: t('services.messages.deleteErrorTitle'),
        description: t('services.messages.deleteErrorDescription'),
        variant: 'destructive',
      });
    },
    onSettled: () => {
      setConfirmOpen(false);
      setSelectedService(null);
    },
  });

  const services = servicesQuery.data ?? [];

  const columns = useMemo<DetailsTableColumn<ServiceRecord>[]>(
    () => [
      {
        key: 'slug',
        header: t('services.list.table.slug'),
        accessor: (service) => service.slug ?? '',
        render: (service) => service.slug ?? '—',
        sortable: true,
      },
      {
        key: 'type',
        header: t('services.list.table.type'),
        accessor: (service) => service.service_type?.name ?? '',
        render: (service) => service.service_type?.name ?? '—',
        sortable: true,
      },
      {
        key: 'place',
        header: t('services.list.table.place'),
        accessor: (service) => service.service_place_name ?? '',
        render: (service) => service.service_place_name ?? '—',
        sortable: true,
      },
      {
        key: 'year',
        header: t('services.list.table.year'),
        accessor: (service) => service.service_year ?? '',
        render: (service) => service.service_year ?? '—',
        sortable: true,
      },
      {
        key: 'status',
        header: t('services.list.table.status'),
        accessor: (service) => service.status ?? '',
        render: (service) => {
          const match = STATUS_OPTIONS.find((option) => option.value === service.status);
          const label = match ? t(`services.status.${match.key}`) : service.status ?? t('services.status.unknown');
          const customClass = statusClassMap[match?.value ?? ''] ?? 'border-muted text-muted-foreground';
          return (
            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${customClass}`}>
              {label}
            </span>
          );
        },
        sortable: true,
      },
    ],
    [t],
  );

  const handleOpen = (mode: 'create' | 'edit' | 'view', service?: ServiceRecord) => {
    setDialogMode(mode);
    setSelectedService(service ?? null);
    setDialogOpen(true);
  };

  const handleDelete = (service: ServiceRecord) => {
    setSelectedService(service);
    setConfirmOpen(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader iconKey="services" title={t('services.title')} subtitle={t('services.subtitle')} />

      <DetailsTable
        data={services}
        columns={columns}
        enableSorting
        enableExport
        enableSearch
        enablePagination
        exportFileName="services"
        isLoading={servicesQuery.isLoading}
        emptyMessage={servicesQuery.isLoading ? t('common.loading') : t('services.list.empty')}
        onAdd={() => handleOpen('create')}
        addButtonLabel={t('services.list.add')}
        actionsHeader={t('services.list.table.actions')}
        renderActions={(service) => (
          <div className="flex items-center justify-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleOpen('view', service)}
            >
              <Eye className="h-4 w-4" />
              <span className="sr-only">{t('services.list.actions.view')}</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleOpen('edit', service)}
            >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">{t('services.list.actions.edit')}</span>
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleDelete(service)}
              disabled={deleteMutation.isPending}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">{t('services.list.actions.delete')}</span>
            </Button>
          </div>
        )}
      />

      <ServiceFormDialog
        open={dialogOpen}
        mode={dialogMode}
        serviceId={selectedService?.id}
        onOpenChange={handleDialogOpenChange}
        onSaved={() => {
          queryClient.invalidateQueries({ queryKey: ['services'] });
        }}
      />

      <ConfirmDialog
        open={confirmOpen}
        title={t('services.list.confirmDeleteTitle', { name: selectedService?.slug ?? '' })}
        description={t('services.list.confirmDeleteDescription')}
        confirmLabel={t('services.list.confirmDelete')}
        cancelLabel={t('common.cancel')}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          if (!selectedService?.id) return;
          deleteMutation.mutate(selectedService.id);
        }}
      />
    </div>
  );
};

export default ServicesPage;
