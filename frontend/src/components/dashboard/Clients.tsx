import React from 'react';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { TableColumn } from '@/lib/table-utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockClients, Client } from '@/data/mock-data';

const Clients: React.FC = () => {
  const { t } = useLanguage();

  const columns: TableColumn<Client>[] = [
    {
      key: 'name',
      title: t('clients.name'),
      sortable: true,
      render: (value) => <span className="font-medium">{value}</span>
    },
    {
      key: 'email',
      title: t('clients.email'),
      sortable: true
    },
    {
      key: 'phone',
      title: t('clients.phone'),
      sortable: true
    },
    {
      key: 'agent',
      title: t('clients.agent'),
      sortable: true,
      render: (value) => value || '-'
    },
    {
      key: 'status',
      title: t('clients.status'),
      sortable: true,
      render: (value) => (
        <Badge variant={value === 'active' ? 'default' : 'secondary'}>
          {t(`status.${value}`)}
        </Badge>
      )
    },
    {
      key: 'totalCases',
      title: t('clients.totalCases'),
      sortable: true
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {t('clients.title')}
        </h1>
        <p className="text-muted-foreground mt-2">
          إدارة العملاء ومعلومات الاتصال
        </p>
      </div>
      
      <DataTable
        data={mockClients}
        columns={columns}
        title={t('clients.title')}
        searchable={true}
        exportable={true}
      />
    </div>
  );
};

export default Clients;