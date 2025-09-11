import React from 'react';
import { useTranslation } from 'react-i18next';

const ProceduresPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('sidebar.procedures')}</h1>
    </div>
  );
};

export default ProceduresPage;
