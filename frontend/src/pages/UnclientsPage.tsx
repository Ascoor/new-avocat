import React from 'react'
import { useTranslation } from 'react-i18next'

const UnclientsPage: React.FC = () => {
  const { t } = useTranslation()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('sidebar.clients_without_authorization') || 'Unclients'}</h1>
      <p className="text-muted-foreground">{t('demo.description', { section: t('sidebar.clients_without_authorization') })}</p>
    </div>
  )
}

export default UnclientsPage

