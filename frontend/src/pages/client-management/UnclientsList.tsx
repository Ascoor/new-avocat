import { useCallback, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Loader2, Plus } from 'lucide-react';

import { clientManagementService, UnclientInput } from '@/api/clientManagement.service';
import DataTable, { DataTableHeader } from '@/components/common/DataTable';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Unclient } from '@/types/unclients';

import ConfirmDeleteDialog from './components/ConfirmDeleteDialog';
import UnclientFormDialog, {
  UnclientFormValues
} from './components/UnclientFormDialog';

const UNCLIENTS_QUERY_KEY = ['client-management', 'unclients'];

const UnclientsList = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [formOpen, setFormOpen] = useState(false);
  const [editingUnclient, setEditingUnclient] = useState<Unclient | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Unclient | null>(null);

  const formatDate = useCallback(
    (value?: string | null) => {
      if (!value) return '—';
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) {
        return value;
      }
      return date.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US');
    },
    [language]
  );

  const unclientsQuery = useQuery({
    queryKey: UNCLIENTS_QUERY_KEY,
    queryFn: () => clientManagementService.listUnclients()
  });

  const createMutation = useMutation({
    mutationFn: (values: UnclientInput) => clientManagementService.createUnclient(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: UNCLIENTS_QUERY_KEY });
      toast({ title: t('clientManagement.unclients.notifications.createSuccess') });
      setFormOpen(false);
    },
    onError: () => {
      toast({
        title: t('clientManagement.unclients.notifications.createError'),
        variant: 'destructive'
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: number; values: UnclientInput }) =>
      clientManagementService.updateUnclient(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: UNCLIENTS_QUERY_KEY });
      toast({ title: t('clientManagement.unclients.notifications.updateSuccess') });
      setFormOpen(false);
    },
    onError: () => {
      toast({
        title: t('clientManagement.unclients.notifications.updateError'),
        variant: 'destructive'
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => clientManagementService.deleteUnclient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: UNCLIENTS_QUERY_KEY });
      toast({ title: t('clientManagement.unclients.notifications.deleteSuccess') });
      setDeleteTarget(null);
    },
    onError: () => {
      toast({
        title: t('clientManagement.unclients.notifications.deleteError'),
        variant: 'destructive'
      });
    }
  });

  const handleAdd = () => {
    setEditingUnclient(null);
    setFormOpen(true);
  };

  const handleEdit = (id: string) => {
    const unclient = unclientsQuery.data?.find(item => String(item.id) === id);
    if (!unclient) return;
    setEditingUnclient(unclient);
    setFormOpen(true);
  };

  const handleDelete = (id: string) => {
    const unclient = unclientsQuery.data?.find(item => String(item.id) === id);
    if (!unclient) return;
    setDeleteTarget(unclient);
  };

  const handleSubmit = async (values: UnclientFormValues) => {
    const payload: UnclientInput = {
      ...values,
      email: values.email || undefined,
      address: values.address || undefined,
      work: values.work || undefined,
      emergency_number: values.emergency_number || undefined,
      gender: values.gender || undefined,
      religion: values.religion || undefined
    };

    if (editingUnclient) {
      await updateMutation.mutateAsync({ id: editingUnclient.id, values: payload });
    } else {
      await createMutation.mutateAsync(payload);
    }
  };

  const headers = useMemo<DataTableHeader<Unclient>[]>(
    () => [
      {
        key: 'name',
        label: 'clientManagement.unclients.columns.name',
        render: row => (
          <div className="space-y-1">
            <p className="font-medium text-foreground">{row.name}</p>
            {row.email && <p className="text-xs text-muted-foreground">{row.email}</p>}
          </div>
        )
      },
      {
        key: 'phone_number',
        label: 'clientManagement.unclients.columns.phone'
      },
      {
        key: 'identity_number',
        label: 'clientManagement.unclients.columns.identity'
      },
      {
        key: 'date_of_birth',
        label: 'clientManagement.unclients.columns.birthDate',
        render: row => formatDate(row.date_of_birth)
      },
      {
        key: 'created_at',
        label: 'clientManagement.unclients.columns.createdAt',
        render: row => formatDate(row.created_at)
      }
    ],
    [formatDate]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {t('clientManagement.unclients.title')}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t('clientManagement.unclients.subtitle')}
          </p>
        </div>
        <Button onClick={handleAdd} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          {t('clientManagement.unclients.actions.add')}
        </Button>
      </div>

      {unclientsQuery.isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <DataTable
          data={unclientsQuery.data ?? []}
          headers={headers}
          onView={id => navigate(id)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <UnclientFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        initialData={editingUnclient ?? undefined}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />

      <ConfirmDeleteDialog
        open={Boolean(deleteTarget)}
        onOpenChange={open => !open && setDeleteTarget(null)}
        title={t('clientManagement.unclients.actions.confirmDeleteTitle')}
        description={t('clientManagement.unclients.actions.confirmDeleteDescription', {
          name: deleteTarget?.name ?? ''
        })}
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
        loading={deleteMutation.isPending}
      />
    </div>
  );
};

export default UnclientsList;
