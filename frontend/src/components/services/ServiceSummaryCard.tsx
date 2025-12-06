import React from 'react';
import { Building2, Hash, MapPin, ShieldCheck, Tags, UserCheck } from 'lucide-react';

import {
  EntitySummaryCard,
  type EntitySummaryBadge,
} from '@/components/entity/EntitySummaryCard';
import { InfoList, type InfoItem } from '@/components/entity/InfoList';
import { useLanguage } from '@/contexts/LanguageContext';
import type { ServiceRecord } from './types';

interface ServiceSummaryCardProps {
  service: ServiceRecord;
  expanded: boolean;
  onToggleExpanded: () => void;
}

export const ServiceSummaryCard: React.FC<ServiceSummaryCardProps> = ({
  service,
  expanded,
  onToggleExpanded,
}) => {
  const { t, isRTL } = useLanguage();

  const basicInfo: InfoItem[] = [
    {
      label: t('serviceDetails.fields.slug'),
      value: service.slug ?? '—',
      icon: Hash,
    },
    {
      label: t('serviceDetails.fields.status'),
      value: service.status ?? '—',
      icon: ShieldCheck,
    },
    {
      label: t('serviceDetails.fields.serviceType'),
      value: service.service_type?.name ?? '—',
      icon: Tags,
    },
    {
      label: t('serviceDetails.fields.place'),
      value: service.service_place_name ?? '—',
      icon: MapPin,
    },
    {
      label: t('serviceDetails.fields.year'),
      value: service.service_year ?? '—',
      icon: Building2,
    },
  ];

  const ownershipInfo: InfoItem[] = [
    {
      label: t('serviceDetails.fields.createdBy'),
      value: service.createdBy?.name ?? '—',
      icon: UserCheck,
    },
    {
      label: t('serviceDetails.fields.updatedBy'),
      value: service.updatedBy?.name ?? '—',
      icon: UserCheck,
    },
  ];

  const secondaryBadges: EntitySummaryBadge[] = [];

  if (service.status) {
    secondaryBadges.push({
      label: service.status,
      variant: 'secondary',
    });
  }

  if (service.service_type?.name) {
    secondaryBadges.push({
      label: service.service_type.name,
      variant: 'outline',
    });
  }

  return (
    <EntitySummaryCard
      icon={Building2}
      isRTL={isRTL}
      eyebrow={t('serviceDetails.sections.overview')}
      title={service.slug ?? t('serviceDetails.title')}
      subtitle={t('serviceDetails.subtitle')}
      primaryBadge={
        service.slug ? { label: `#${service.slug}`, variant: 'outline' } : undefined
      }
      secondaryBadges={secondaryBadges}
      expanded={expanded}
      onToggleExpanded={onToggleExpanded}
      overviewSections={[
        {
          content: (
            <InfoList
              title={t('serviceDetails.sections.overview')}
              items={basicInfo}
              direction={isRTL ? 'rtl' : 'ltr'}
            />
          ),
        },
        {
          content: (
            <InfoList
              title={t('serviceDetails.sections.ownership')}
              items={ownershipInfo}
              direction={isRTL ? 'rtl' : 'ltr'}
            />
          ),
        },
      ]}
      descriptionTitle={t('serviceDetails.fields.description')}
      descriptionText={service.description}
    />
  );
};
