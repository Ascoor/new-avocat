import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

const ClientsAndUnclients: React.FC = () => {
  const { t } = useTranslation()
  // Content is controlled by sidebar routing

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('sidebar.clients')}</h1>
        <Link to="/clients/authorized" className="sr-only">{t('sidebar.clients')}</Link>
      </div>

      {/* Content routed from sidebar (no local tabs) */}
      <Outlet />
    </div>
  )
}

export default ClientsAndUnclients
