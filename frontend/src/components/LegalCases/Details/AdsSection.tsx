import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { useToast } from '@/components/ui/use-toast';
import {
  getLegalAdsByLegCaseId,
  deleteLegalAd,
} from '@/api/legalAds.service';
import { LegalAd } from '@/types/legalCase';
import LegalAdModal from './LegalAdModal';
import { useLanguage } from '@/contexts/LanguageContext';
import { Megaphone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface AdsSectionProps {
  caseId: string;
  onChanged: () => void;
}

const AdsSection = ({ caseId, onChanged }: AdsSectionProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [ads, setAds] = useState<LegalAd[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<LegalAd | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<LegalAd | null>(null);

  const fetchAds = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getLegalAdsByLegCaseId(caseId);
      setAds(data);
    } catch (error) {
      console.error('Failed to load legal ads', error);
      toast({
        title: t('legalCaseDetails.ads.loadErrorTitle'),
        description: t('legalCaseDetails.ads.loadErrorDescription'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [caseId, toast, t]);

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  const openCreateModal = () => {
    setEditingAd(null);
    setModalOpen(true);
  };

  const openEditModal = (ad: LegalAd) => {
    setEditingAd(ad);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    try {
      await deleteLegalAd(confirmDelete.id);
      toast({ title: t('legalCaseDetails.ads.deleteSuccess') });
      setConfirmDelete(null);
      fetchAds();
      onChanged();
    } catch (error) {
      console.error('Failed to delete legal ad', error);
      toast({
        title: t('legalCaseDetails.ads.deleteErrorTitle'),
        description: t('legalCaseDetails.ads.deleteErrorDescription'),
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="space-y-6 p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SectionHeading
          icon={Megaphone}
          title={t('legalCaseDetails.ads.title')}
          subtitle={t('legalCaseDetails.ads.subtitle')}
        />
        <Button onClick={openCreateModal} className="self-start sm:self-auto">
          {t('legalCaseDetails.ads.addButton')}
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
                  {t('legalCaseDetails.ads.columns.type')}
                </th>
                <th className="px-4 py-2 text-start">
                  {t('legalCaseDetails.ads.columns.number')}
                </th>
                <th className="px-4 py-2 text-start">
                  {t('legalCaseDetails.ads.columns.date')}
                </th>
                <th className="px-4 py-2 text-start">
                  {t('legalCaseDetails.ads.columns.status')}
                </th>
                <th className="px-4 py-2 text-start">
                  {t('legalCaseDetails.ads.columns.details')}
                </th>
                <th className="px-4 py-2 text-center">
                  {t('legalCaseDetails.ads.columns.actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              {ads.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-center text-muted-foreground" colSpan={6}>
                    {t('legalCaseDetails.ads.empty')}
                  </td>
                </tr>
              )}
              {ads.map((ad) => (
                <tr key={ad.id} className="border-t border-border/40">
                  <td className="px-4 py-2 text-sm">{ad.legal_ad_type?.name ?? '—'}</td>
                  <td className="px-4 py-2 text-sm">{ad.number ?? '—'}</td>
                  <td className="px-4 py-2 text-sm">{ad.date ?? '—'}</td>
                  <td className="px-4 py-2 text-sm">{ad.status ?? '—'}</td>
                  <td className="px-4 py-2 text-sm">{ad.details ?? ad.description ?? '—'}</td>
                  <td className="px-4 py-2 text-center space-x-2 rtl:space-x-reverse">
                    <Button variant="outline" size="sm" onClick={() => openEditModal(ad)}>
                      {t('legalCaseDetails.ads.editButton')}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setConfirmDelete(ad)}
                    >
                      {t('legalCaseDetails.ads.deleteButton')}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <LegalAdModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        caseId={caseId}
        initialData={editingAd ?? undefined}
        onSuccess={() => {
          fetchAds();
          onChanged();
        }}
      />

      <ConfirmDialog
        open={!!confirmDelete}
        title={t('legalCaseDetails.ads.deleteConfirmTitle')}
        description={t('legalCaseDetails.ads.deleteConfirmDescription')}
        confirmLabel={t('legalCaseDetails.ads.deleteButton')}
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

export default AdsSection;
