import React from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

const ClientsAndUnclients: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const isAuthorized = location.pathname.startsWith('/clients/authorized') || location.pathname === '/clients'
  const isUnauthorized = location.pathname.startsWith('/clients/unauthorized')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('sidebar.clients')}</h1>
        <Link to="/clients/authorized" className="sr-only">{t('sidebar.clients')}</Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-card border border-border rounded-lg p-1 w-full sm:w-auto">
        <NavLink
          to="/clients/authorized"
          className={({ isActive }) => cn(
            'px-4 py-2 rounded-md text-sm font-medium',
            (isActive || isAuthorized) ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
          )}
          end
        >
          {t('sidebar.clients_with_authorization')}
        </NavLink>
        <NavLink
          to="/clients/unauthorized"
          className={({ isActive }) => cn(
            'px-4 py-2 rounded-md text-sm font-medium',
            (isActive || isUnauthorized) ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
          )}
        >
          {t('sidebar.clients_without_authorization')}
        </NavLink>
      </div>

      {/* Nested content */}
      <Outlet />
    </div>
  )
}

export default ClientsAndUnclients

