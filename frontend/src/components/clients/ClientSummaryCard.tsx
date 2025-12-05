import React from 'react';
import { Mail, MapPin, Phone, UserCircle2 } from 'lucide-react';

import {
  EntitySummaryCard,
  type EntitySummaryBadge,
} from '@/components/entity/EntitySummaryCard';
import { InfoList, type InfoItem } from '@/components/entity/InfoList';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Client } from '@/types/legalCase';

type ClientSummary = Client & {
  address?: string;
  code?: string;
  type?: 'company' | 'individual';
  cases_count?: number;
  active_cases?: number;
};

interface ClientSummaryCardProps {
  client: ClientSummary;
  expanded: boolean;
  onToggleExpanded: () => void;
}

export const ClientSummaryCard: React.FC<ClientSummaryCardProps> = ({
  client,
  expanded,
  onToggleExpanded,
}) => {
  const { t, isRTL } = useLanguage();

  const basicInfo: InfoItem[] = [
    {
      label: t('client.fields.name'),
      value: client.name ?? '—',
      icon: UserCircle2,
    },
    {
      label: t('client.fields.phone'),
      value: client.phone ?? '—',
      icon: Phone,
    },
    {
      label: t('client.fields.email'),
      value: client.email ?? '—',
      icon: Mail,
    },
    {
      label: t('client.fields.address'),
      value: client.address ?? '—',
      icon: MapPin,
    },
  ];

  const statsInfo: InfoItem[] = [
    {
      label: t('client.fields.casesCount'),
      value: String(client.cases_count ?? '0'),
    },
    {
      label: t('client.fields.activeCases'),
      value: String(client.active_cases ?? '0'),
    },
  ];

  const secondaryBadges: EntitySummaryBadge[] = [
    client.type && {
      label:
        client.type === 'company'
          ? t('client.company')
          : t('client.individual'),
      variant: 'outline',
    },
  ].filter(Boolean) as EntitySummaryBadge[];

  return (
    <EntitySummaryCard
      icon={UserCircle2}
      isRTL={isRTL}
      eyebrow={t('client.sections.basicInfo')}
      title={client.name ?? t('client.title')}
      subtitle={
        client.type === 'company' ? t('client.company') : t('client.individual')
      }
      primaryBadge=
        client.code
          ? { label: `#${client.code}`, variant: 'outline' }
          : undefined
      secondaryBadges={secondaryBadges}
      expanded={expanded}
      onToggleExpanded={onToggleExpanded}
      overviewSections={[
        {
          content: (
            <InfoList
              title={t('client.sections.basicInfo')}
              items={basicInfo}
              direction={isRTL ? 'rtl' : 'ltr'}
            />
          ),
        },
        {
          content: (
            <InfoList
              title={t('client.sections.stats')}
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
