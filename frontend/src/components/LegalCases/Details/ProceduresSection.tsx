import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { useToast } from '@/components/ui/use-toast';
import {
  getProceduresByLegCaseId,
  deleteProcedure,
} from '@/api/procedures.service';
import { Procedure } from '@/types/legalCase';
import ProcedureModal from './ProcedureModal';
import { useLanguage } from '@/contexts/LanguageContext';
import { ClipboardList } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface ProceduresSectionProps {
  caseId: string;
  onChanged: () => void;
}

const ProceduresSection = ({ caseId, onChanged }: ProceduresSectionProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProcedure, setEditingProcedure] = useState<Procedure | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Procedure | null>(null);

  const fetchProcedures = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getProceduresByLegCaseId(caseId);
      setProcedures(data);
    } catch (error) {
      console.error('Failed to load procedures', error);
      toast({
        title: t('legalCaseDetails.procedures.loadErrorTitle'),
        description: t('legalCaseDetails.procedures.loadErrorDescription'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [caseId, toast, t]);

  useEffect(() => {
    fetchProcedures();
  }, [fetchProcedures]);

  const openCreateModal = () => {
    setEditingProcedure(null);
    setModalOpen(true);
  };

  const openEditModal = (procedure: Procedure) => {
    setEditingProcedure(procedure);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      await deleteProcedure(confirmDelete.id);
      toast({ title: t('legalCaseDetails.procedures.deleteSuccess') });
      setConfirmDelete(null);
      fetchProcedures();
      onChanged();
    } catch (error) {
      console.error('Failed to delete procedure', error);
      toast({
        title: t('legalCaseDetails.procedures.deleteErrorTitle'),
        description: t('legalCaseDetails.procedures.deleteErrorDescription'),
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="space-y-6 p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SectionHeading
          icon={ClipboardList}
          title={t('legalCaseDetails.procedures.title')}
          subtitle={t('legalCaseDetails.procedures.subtitle')}
        />
        <Button onClick={openCreateModal} className="self-start sm:self-auto">
          {t('legalCaseDetails.procedures.addButton')}
        </Button>
      </div>

      {loading ? (
        <div className="py-8 text-center text-muted-foreground">
          {t('common.loading')}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-border/60 text-sm">
            <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-2 text-start">
                  {t('legalCaseDetails.procedures.columns.type')}
                </th>
                <th className="px-4 py-2 text-start">
                  {t('legalCaseDetails.procedures.columns.lawyer')}
                </th>
                <th className="px-4 py-2 text-start">
                  {t('legalCaseDetails.procedures.columns.endDate')}
                </th>
                <th className="px-4 py-2 text-start">
                  {t('legalCaseDetails.procedures.columns.job')}
                </th>
                <th className="px-4 py-2 text-start">
                  {t('legalCaseDetails.procedures.columns.result')}
                </th>
                <th className="px-4 py-2 text-start">
                  {t('legalCaseDetails.procedures.columns.status')}
                </th>
                <th className="px-4 py-2 text-center">
                  {t('legalCaseDetails.procedures.columns.actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              {procedures.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-center text-muted-foreground" colSpan={7}>
                    {t('legalCaseDetails.procedures.empty')}
                  </td>
                </tr>
              )}
              {procedures.map((procedure) => (
                <tr key={procedure.id} className="border-t border-border/40">
                  <td className="px-4 py-2 text-sm">
                    {procedure.procedure_type?.name ?? '—'}
                  </td>
                  <td className="px-4 py-2 text-sm">{procedure.lawyer?.name ?? '—'}</td>
                  <td className="px-4 py-2 text-sm">{procedure.date_end ?? '—'}</td>
                  <td className="px-4 py-2 text-sm">{procedure.job}</td>
                  <td className="px-4 py-2 text-sm">{procedure.result ?? '—'}</td>
                  <td className="px-4 py-2 text-sm">{procedure.status ?? '—'}</td>
                  <td className="px-4 py-2 text-center space-x-2 rtl:space-x-reverse">
                    <Button variant="outline" size="sm" onClick={() => openEditModal(procedure)}>
                      {t('legalCaseDetails.procedures.editButton')}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setConfirmDelete(procedure)}
                    >
                      {t('legalCaseDetails.procedures.deleteButton')}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ProcedureModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        caseId={caseId}
        initialData={editingProcedure ?? undefined}
        onSuccess={() => {
          fetchProcedures();
          onChanged();
        }}
      />

      <ConfirmDialog
        open={!!confirmDelete}
        title={t('legalCaseDetails.procedures.deleteConfirmTitle')}
        description={t('legalCaseDetails.procedures.deleteConfirmDescription')}
        confirmLabel={t('legalCaseDetails.procedures.deleteButton')}
        cancelLabel={t('common.cancel')}
        onConfirm={handleDelete}
        onClose={() => setConfirmDelete(null)}
      />
    </Card>
  );
};

const SectionHeading = ({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}) => (
  <div className="flex items-center gap-3">
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
      <Icon className="h-5 w-5" />
    </span>
    <div>
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  </div>
);

export default ProceduresSection;
