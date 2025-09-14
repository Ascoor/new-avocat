import React from 'react';
import { useTranslation } from 'react-i18next';
import ClientsList from '@/components/clients/ClientsList';

const ClientsPage = () => {
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{t('sidebar.clients')}</h1>
      <ClientsList />
    </div>
  );
};

export default ClientsPage;
