import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import type { MenuItem } from '@/config/sidebar';

interface SidebarLinkProps {
  item: MenuItem;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ item }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Link
        to={item.path}
        className={cn('flex items-center gap-3 px-3 py-2.5 rounded-md w-full transition-all duration-200 hover:bg-gray-700')}
      >
        <item.icon size={20} />
        <span>{t(`sidebar.${item.key}`)}</span>
      </Link>
      {item.children && (
        <div className="pl-6 space-y-1">
          {item.children.map(child => (
            <SidebarLink key={child.key} item={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarLink;
