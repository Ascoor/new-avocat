import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import TableComponent, { TableHeader } from '@/components/common/TableComponent';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLegalCases, useDeleteLegalCase } from '@/hooks/useLegalCases';
import { LegalCase } from '@/types/legalCase';
import AddEditLegalCaseModal from './AddEditLegalCaseModal';

const statusClasses: Record<string, string> = {
  'جارى التنفيذ': 'text-yellow-500',
  'قيد التنفيذ': 'text-orange-500',
  منتهية: 'text-green-600',
  متداولة: 'text-blue-500',
  استيفاء: 'text-purple-500',
};

const LegalCases = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const { data: cases = [], isLoading, error } = useLegalCases();
  const deleteCase = useDeleteLegalCase();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<LegalCase | null>(null);

  const headers = useMemo<TableHeader<LegalCase>[]>(
    () => [
      { key: 'slug', text: t('legalCases.columns.fileNumber') },
      { key: 'clients', text: t('legalCases.columns.clients') },
      { key: 'client_capacity', text: t('legalCases.columns.clientCapacity') },
      { key: 'title', text: t('legalCases.columns.subject') },
      { key: 'case_sub_type', text: t('legalCases.columns.caseType') },
      { key: 'status', text: t('legalCases.columns.status') },
    ],
    [t],
  );

  const customRenderers = useMemo<Record<string, (row: LegalCase) => ReactNode>>(
    () => ({
      clients: (row: LegalCase) => {
        if (!row.clients || row.clients.length === 0) {
          return <span className="text-gray-500">{t('legalCases.noClient')}</span>;
        }
        const [firstClient, ...others] = row.clients;
        return (
          <div className="flex flex-col items-center gap-1">
            <span>{firstClient.name}</span>
            {others.length > 0 && (
              <span className="text-xs text-red-600">
                {t('legalCases.moreClients', { count: others.length })}
              </span>
            )}
          </div>
        );
      },
      case_sub_type: (row: LegalCase) => row.case_sub_type?.name ?? '—',
      status: (row: LegalCase) => (
        <span className={statusClasses[row.status] ?? 'text-gray-500'}>{row.status ?? '—'}</span>
      ),
    }),
    [t],
  );

  const handleAddCase = () => {
    setSelectedCase(null);
    setIsModalOpen(true);
  };

  const handleEditCase = (id: string) => {
    const target = cases.find((item) => String(item.id) === id);
    if (target) {
      setSelectedCase(target);
      setIsModalOpen(true);
    }
  };

  const handleDeleteCase = async (row: LegalCase) => {
    const confirmed = window.confirm(
      t('legalCases.confirmDelete', { title: row.title || row.slug }),
    );

    if (!confirmed) return;

    try {
      await deleteCase.mutateAsync(String(row.id));
      toast({ title: t('legalCases.deleteSuccess') });
    } catch (mutationError) {
      console.error('Failed to delete legal case', mutationError);
      toast({
        title: t('legalCases.deleteErrorTitle'),
        description: t('legalCases.deleteErrorDescription'),
        variant: 'destructive',
      });
    }
  };

  const handleViewCase = (id: string) => {
    navigate(`/dashboard/cases/${id}`);
  };

  let content: ReactNode;

  if (isLoading) {
    content = (
      <div className="rounded-md border border-border/40 bg-muted/40 p-4 text-sm text-muted-foreground">
        {t('common.loading')}
      </div>
    );
  } else if (error) {
    content = (
      <div className="rounded-md border border-destructive/40 bg-destructive/10 p-4 text-destructive">
        {t('legalCases.fetchError')}
      </div>
    );
  } else {
    content = (
      <TableComponent
        data={cases}
        headers={headers}
        customRenderers={customRenderers}
        onEdit={handleEditCase}
        onDelete={handleDeleteCase}
        onView={handleViewCase}
        renderAddButton={() => (
          <Button onClick={handleAddCase} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            {t('legalCases.addCase')}
          </Button>
        )}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('legalCases.title')}</h1>
          <p className="text-sm text-muted-foreground">{t('legalCases.subtitle')}</p>
        </div>
        <Button onClick={handleAddCase} className="flex items-center gap-2 self-start">
          <PlusCircle className="h-4 w-4" />
          {t('legalCases.addCase')}
        </Button>
      </div>

      {content}

      <AddEditLegalCaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedCase}
      />
    </div>
  );
};

export default LegalCases;
