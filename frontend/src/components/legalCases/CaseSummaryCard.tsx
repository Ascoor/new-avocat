import React from 'react';
import {
  BadgeCheck,
  ClipboardList,
  Gavel,
  Hash,
  Layers,
  Phone,
  Scale,
  UserCircle2,
} from 'lucide-react';

import {
  EntitySummaryCard,
  type EntitySummaryBadge,
} from '@/components/entity/EntitySummaryCard';
import { InfoList, type InfoItem } from '@/components/entity/InfoList';
import { useLanguage } from '@/contexts/LanguageContext';
import type { LegalCase } from '@/types/legalCase';

interface CaseSummaryCardProps {
  legCase: LegalCase;
  expanded: boolean;
  onToggleExpanded: () => void;
}

export const CaseSummaryCard: React.FC<CaseSummaryCardProps> = ({
  legCase,
  expanded,
  onToggleExpanded,
}) => {
  const { t, isRTL } = useLanguage();

  const basicInfo: InfoItem[] = [
    {
      label: t('legalCaseDetails.fields.slug'),
      value: legCase.slug ?? '—',
      icon: Hash,
    },
    {
      label: t('legalCaseDetails.fields.title'),
      value: legCase.title ?? '—',
      icon: Layers,
    },
    {
      label: t('legalCaseDetails.fields.status'),
      value: legCase.status ?? '—',
      icon: BadgeCheck,
    },
    {
      label: t('legalCaseDetails.fields.caseType'),
      value: legCase.case_type?.name ?? '—',
      icon: Scale,
    },
    {
      label: t('legalCaseDetails.fields.caseSubType'),
      value: legCase.case_sub_type?.name ?? '—',
      icon: ClipboardList,
    },
    {
      label: t('legalCaseDetails.fields.clientCapacity'),
      value: legCase.client_capacity ?? '—',
      icon: UserCircle2,
    },
  ];

  const opponentInfo: InfoItem[] = [
    {
      label: t('legalCaseDetails.fields.litigantName'),
      value: legCase.litigants_name ?? '—',
      icon: UserCircle2,
    },
    {
      label: t('legalCaseDetails.fields.litigantPhone'),
      value: legCase.litigants_phone ?? '—',
      icon: Phone,
    },
    {
      label: t('legalCaseDetails.fields.lawyerName'),
      value: legCase.litigants_lawyer_name ?? '—',
      icon: Gavel,
    },
    {
      label: t('legalCaseDetails.fields.lawyerPhone'),
      value: legCase.litigants_lawyer_phone ?? '—',
      icon: Phone,
    },
  ];

  const secondaryBadges: EntitySummaryBadge[] = [
    legCase.status && {
      label: legCase.status,
      variant: 'secondary',
    },
    legCase.case_type?.name && {
      label: legCase.case_type.name,
      variant: 'outline',
    },
  ].filter((badge): badge is EntitySummaryBadge => Boolean(badge));

  return (
    <EntitySummaryCard
      icon={Scale}
      isRTL={isRTL}
      eyebrow={t('legalCaseDetails.sections.basicInfo')}
      title={legCase.title ?? t('legalCaseDetails.title')}
      subtitle={t('legalCaseDetails.subtitle')}
      primaryBadge={
        legCase.slug
          ? { label: `#${legCase.slug}`, variant: 'outline' }
          : undefined
      }
      secondaryBadges={secondaryBadges}
      expanded={expanded}
      onToggleExpanded={onToggleExpanded}
      overviewSections={[
        {
          content: (
            <InfoList
              title={t('legalCaseDetails.sections.basicInfo')}
              items={basicInfo}
              direction={isRTL ? 'rtl' : 'ltr'}
            />
          ),
        },
        {
          content: (
            <InfoList
              title={t('legalCaseDetails.sections.opponentInfo')}
              items={opponentInfo}
              direction={isRTL ? 'rtl' : 'ltr'}
            />
          ),
        },
      ]}
      descriptionTitle={t('legalCaseDetails.fields.description')}
      descriptionText={legCase.description}
    />
  );
};
