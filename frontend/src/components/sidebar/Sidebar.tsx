import React from 'react';
import { menuItems } from '@/config/sidebar';
import SidebarMenu from './SidebarMenu';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const { t, i18n } = useTranslation();

  return (
    <aside className="w-64 h-full bg-gray-800 text-white" dir={i18n.dir()}>
      <div className="p-4">
        <h2 className="text-lg font-semibold">{t('sidebar.dashboard')}</h2>
      </div>
      <SidebarMenu items={menuItems} />
    </aside>
  );
};

export default Sidebar;
