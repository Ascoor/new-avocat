import { useCallback, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Loader2, Plus } from 'lucide-react';

import { clientManagementService, ClientInput } from '@/api/clientManagement.service';
import DataTable, { DataTableHeader } from '@/components/common/DataTable';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { Client } from '@/types/clients';

import ClientFormDialog, {
  ClientFormValues
} from './components/ClientFormDialog';
import ConfirmDeleteDialog from './components/ConfirmDeleteDialog';

const CLIENTS_QUERY_KEY = ['client-management', 'clients'];

const ClientsList = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formOpen, setFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Client | null>(null);

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

  const clientsQuery = useQuery({
    queryKey: CLIENTS_QUERY_KEY,
    queryFn: () => clientManagementService.listClients()
  });

  const createMutation = useMutation({
    mutationFn: (values: ClientInput) => clientManagementService.createClient(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLIENTS_QUERY_KEY });
      toast({ title: t('clientManagement.clients.notifications.createSuccess') });
      setFormOpen(false);
    },
    onError: () => {
      toast({
        title: t('clientManagement.clients.notifications.createError'),
        variant: 'destructive'
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: number; values: ClientInput }) =>
      clientManagementService.updateClient(id, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLIENTS_QUERY_KEY });
      toast({ title: t('clientManagement.clients.notifications.updateSuccess') });
      setFormOpen(false);
    },
    onError: () => {
      toast({
        title: t('clientManagement.clients.notifications.updateError'),
        variant: 'destructive'
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => clientManagementService.deleteClient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLIENTS_QUERY_KEY });
      toast({ title: t('clientManagement.clients.notifications.deleteSuccess') });
      setDeleteTarget(null);
    },
    onError: () => {
      toast({
        title: t('clientManagement.clients.notifications.deleteError'),
        variant: 'destructive'
      });
    }
  });

  const handleAdd = () => {
    setEditingClient(null);
    setFormOpen(true);
  };

  const handleEdit = (id: string) => {
    const client = clientsQuery.data?.find(item => String(item.id) === id);
    if (!client) return;
    setEditingClient(client);
    setFormOpen(true);
  };

  const handleDelete = (id: string) => {
    const client = clientsQuery.data?.find(item => String(item.id) === id);
    if (!client) return;
    setDeleteTarget(client);
  };

  const handleSubmit = async (values: ClientFormValues) => {
    const payload: ClientInput = {
      ...values,
      email: values.email || undefined,
      phone_number: values.phone_number || undefined,
      address: values.address || undefined,
      nationality: values.nationality || undefined,
      work: values.work || undefined,
      emergency_number: values.emergency_number || undefined,
      date_of_birth: values.date_of_birth || undefined,
      identity_number: values.identity_number || undefined
    };

    if (editingClient) {
      await updateMutation.mutateAsync({ id: editingClient.id, values: payload });
    } else {
      await createMutation.mutateAsync(payload);
    }
  };

  const headers = useMemo<DataTableHeader<Client>[]>(
    () => [
      {
        key: 'name',
        label: 'clientManagement.clients.columns.name',
        render: row => (
          <div className="space-y-1">
            <p className="font-medium text-foreground">{row.name}</p>
            {row.email && (
              <p className="text-xs text-muted-foreground">{row.email}</p>
            )}
          </div>
        )
      },
      {
        key: 'phone_number',
        label: 'clientManagement.clients.columns.phone'
      },
      {
        key: 'identity_number',
        label: 'clientManagement.clients.columns.identity'
      },
      {
        key: 'status',
        label: 'clientManagement.clients.columns.status',
        render: row => (
          <Badge variant={row.status === 'active' ? 'secondary' : 'outline'}>
            {t(`status.${row.status}`)}
          </Badge>
        )
      },
      {
        key: 'created_at',
        label: 'clientManagement.clients.columns.createdAt',
        render: row => formatDate(row.created_at)
      }
    ],
    [formatDate, t]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {t('clientManagement.clients.title')}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t('clientManagement.clients.subtitle')}
          </p>
        </div>
        <Button onClick={handleAdd} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          {t('clientManagement.clients.actions.add')}
        </Button>
      </div>

      {clientsQuery.isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <DataTable
          data={clientsQuery.data ?? []}
          headers={headers}
          onView={id => navigate(id)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <ClientFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        initialData={editingClient ?? undefined}
        onSubmit={handleSubmit}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />

      <ConfirmDeleteDialog
        open={Boolean(deleteTarget)}
        onOpenChange={open => !open && setDeleteTarget(null)}
        title={t('clientManagement.clients.actions.confirmDeleteTitle')}
        description={t('clientManagement.clients.actions.confirmDeleteDescription', {
          name: deleteTarget?.name ?? ''
        })}
        onConfirm={() => deleteTarget && deleteMutation.mutate(deleteTarget.id)}
        loading={deleteMutation.isPending}
      />
    </div>
  );
};

export default ClientsList;
