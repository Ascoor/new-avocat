import React from 'react'
import { useTranslation } from 'react-i18next'
import UnclientsList from '@/components/clients/UnclientsList'

const UnclientsPage: React.FC = () => {
  const { t } = useTranslation()
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{t('sidebar.clients_without_authorization') || 'Unclients'}</h1>
      <UnclientsList />
    </div>
  )
}

export default UnclientsPage
