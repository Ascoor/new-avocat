import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { useToast } from '@/components/ui/use-toast';
import {
  getSessionsByLegCaseId,
  deleteSession,
} from '@/api/sessions.service';
import { LegalSession } from '@/types/legalCase';
import SessionModal from './SessionModal';
import { useLanguage } from '@/contexts/LanguageContext';
import { CalendarCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface SessionsSectionProps {
  caseId: string;
  onChanged: () => void;
}

const SessionsSection = ({ caseId, onChanged }: SessionsSectionProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [sessions, setSessions] = useState<LegalSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<LegalSession | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<LegalSession | null>(null);

  const fetchSessions = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getSessionsByLegCaseId(caseId);
      setSessions(data.data ?? []);
    } catch (error) {
      console.error('Failed to load sessions', error);
      toast({
        title: t('legalCaseDetails.sessions.loadErrorTitle'),
        description: t('legalCaseDetails.sessions.loadErrorDescription'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [caseId, toast, t]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const openCreateModal = () => {
    setEditingSession(null);
    setModalOpen(true);
  };

  const openEditModal = (session: LegalSession) => {
    setEditingSession(session);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      await deleteSession(confirmDelete.id);
      toast({ title: t('legalCaseDetails.sessions.deleteSuccess') });
      setConfirmDelete(null);
      fetchSessions();
      onChanged();
    } catch (error) {
      console.error('Failed to delete session', error);
      toast({
        title: t('legalCaseDetails.sessions.deleteErrorTitle'),
        description: t('legalCaseDetails.sessions.deleteErrorDescription'),
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="space-y-6 p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SectionHeading
          icon={CalendarCheck}
          title={t('legalCaseDetails.sessions.title')}
          subtitle={t('legalCaseDetails.sessions.subtitle')}
        />
        <Button onClick={openCreateModal} className="self-center sm:self-auto">
          {t('legalCaseDetails.sessions.addButton')}
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
                <th className="px-4 py-2 text-center">
                  {t('legalCaseDetails.sessions.columns.date')}
                </th>
                <th className="px-4 py-2 text-center">
                  {t('legalCaseDetails.sessions.columns.lawyer')}
                </th>
                <th className="px-4 py-2 text-center">
                  {t('legalCaseDetails.sessions.columns.roll')}
                </th>
                <th className="px-4 py-2 text-center">
                  {t('legalCaseDetails.sessions.columns.court')}
                </th>
                <th className="px-4 py-2 text-center">
                  {t('legalCaseDetails.sessions.columns.orders')}
                </th>
                <th className="px-4 py-2 text-center">
                  {t('legalCaseDetails.sessions.columns.result')}
                </th>
                <th className="px-4 py-2 text-center">
                  {t('legalCaseDetails.sessions.columns.status')}
                </th>
                <th className="px-4 py-2 text-center">
                  {t('legalCaseDetails.sessions.columns.actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              {sessions.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-center text-muted-foreground" colSpan={8}>
                    {t('legalCaseDetails.sessions.empty')}
                  </td>
                </tr>
              )}
              {sessions.map((session) => (
                <tr key={session.id} className="border-t border-border/40">
                  <td className="px-4 py-2 text-sm">{session.session_date ?? '—'}</td>
                  <td className="px-4 py-2 text-sm">{session.lawyer?.name ?? '—'}</td>
                  <td className="px-4 py-2 text-sm">{session.session_roll ?? '—'}</td>
                  <td className="px-4 py-2 text-sm">{session.court?.name ?? '—'}</td>
                  <td className="px-4 py-2 text-sm">{session.orders ?? '—'}</td>
                  <td className="px-4 py-2 text-sm">{session.result ?? '—'}</td>
                  <td className="px-4 py-2 text-sm">{session.status ?? '—'}</td>
                  <td className="px-4 py-2 text-center space-x-2 rtl:space-x-reverse">
                    <Button variant="outline" size="sm" onClick={() => openEditModal(session)}>
                      {t('legalCaseDetails.sessions.editButton')}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setConfirmDelete(session)}
                    >
                      {t('legalCaseDetails.sessions.deleteButton')}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <SessionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        caseId={caseId}
        initialData={editingSession ?? undefined}
        onSuccess={() => {
          fetchSessions();
          onChanged();
        }}
      />

      <ConfirmDialog
        open={!!confirmDelete}
        title={t('legalCaseDetails.sessions.deleteConfirmTitle')}
        description={t('legalCaseDetails.sessions.deleteConfirmDescription')}
        confirmLabel={t('legalCaseDetails.sessions.deleteButton')}
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

export default SessionsSection;
