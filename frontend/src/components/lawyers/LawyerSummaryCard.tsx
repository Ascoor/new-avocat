import React from 'react';
import { Mail, Phone, Scale, UserCircle2 } from 'lucide-react';

import { EntitySummaryCard } from '@/components/entity/EntitySummaryCard';
import { InfoList, type InfoItem } from '@/components/entity/InfoList';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Lawyer } from '@/types/legalCase';

type LawyerSummary = Lawyer & {
  bar_number?: string;
  specialization?: string;
  win_rate?: number;
  cases_count?: number;
};

interface LawyerSummaryCardProps {
  lawyer: LawyerSummary;
  expanded: boolean;
  onToggleExpanded: () => void;
}

export const LawyerSummaryCard: React.FC<LawyerSummaryCardProps> = ({
  lawyer,
  expanded,
  onToggleExpanded,
}) => {
  const { t, isRTL } = useLanguage();

  const basicInfo: InfoItem[] = [
    {
      label: t('lawyer.fields.name'),
      value: lawyer.name ?? '—',
      icon: UserCircle2,
    },
    {
      label: t('lawyer.fields.phone'),
      value: lawyer.phone ?? '—',
      icon: Phone,
    },
    {
      label: t('lawyer.fields.email'),
      value: lawyer.email ?? '—',
      icon: Mail,
    },
    {
      label: t('lawyer.fields.specialization'),
      value: lawyer.specialization ?? '—',
      icon: Scale,
    },
  ];

  const statsInfo: InfoItem[] = [
    {
      label: t('lawyer.fields.casesCount'),
      value: String(lawyer.cases_count ?? '0'),
    },
    {
      label: t('lawyer.fields.winRate'),
      value: lawyer.win_rate ? `${lawyer.win_rate}%` : '—',
    },
  ];

  return (
    <EntitySummaryCard
      icon={Scale}
      isRTL={isRTL}
      eyebrow={t('lawyer.sections.profile')}
      title={lawyer.name ?? t('lawyer.title')}
      subtitle={lawyer.bar_number ? `#${lawyer.bar_number}` : undefined}
      expanded={expanded}
      onToggleExpanded={onToggleExpanded}
      overviewSections={[
        {
          content: (
            <InfoList
              title={t('lawyer.sections.basicInfo')}
              items={basicInfo}
              direction={isRTL ? 'rtl' : 'ltr'}
            />
          ),
        },
        {
          content: (
            <InfoList
              title={t('lawyer.sections.stats')}
              items={statsInfo}
              direction={isRTL ? 'rtl' : 'ltr'}
              columns={1}
            />
          ),
        },
      ]}
    />
  );
};
