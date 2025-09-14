import React from 'react';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { TableColumn } from '@/lib/table-utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockLawyers, Lawyer } from '@/data/mock-data';

const Lawyers: React.FC = () => {
  const { t } = useLanguage();

  const columns: TableColumn<Lawyer>[] = [
    {
      key: 'name',
      title: t('lawyers.name'),
      sortable: true,
      render: (value) => <span className="font-medium">{value}</span>
    },
    {
      key: 'specialization',
      title: t('lawyers.specialization'),
      sortable: true
    },
    {
      key: 'experience',
      title: t('lawyers.experience'),
      sortable: true,
      render: (value) => `${value} ${t('lawyers.years')}`
    },
    {
      key: 'activeCases',
      title: t('lawyers.activeCases'),
      sortable: true
    },
    {
      key: 'status',
      title: t('lawyers.status'),
      sortable: true,
      render: (value) => (
        <Badge variant={value === 'active' ? 'default' : 'secondary'}>
          {t(`status.${value}`)}
        </Badge>
      )
    },
    {
      key: 'licenseNumber',
      title: t('lawyers.licenseNumber'),
      sortable: true
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {t('lawyers.title')}
        </h1>
        <p className="text-muted-foreground mt-2">
          إدارة المحامين والخبرات القانونية
        </p>
      </div>
      
      <DataTable
        data={mockLawyers}
        columns={columns}
        title={t('lawyers.title')}
        searchable={true}
        exportable={true}
      />
    </div>
  );
};

export default Lawyers;