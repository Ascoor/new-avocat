import {
  Home, Users, Briefcase, FileText, BarChart3, ClipboardList,
  UserCheck, UserX, FolderOpen, FolderClosed, Settings,
  CalendarIcon, Megaphone
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface MenuItem {
  key: string;
  icon: LucideIcon;
  path: string;
  labelKey?: string;   // مفتاح الترجمة
  bottom?: boolean;    // هل يظهر في أسفل القائمة
  children?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  { key: 'dashboard', icon: Home, path: '/dashboard', labelKey: 'sidebar.dashboard' },

  {
    key: 'clients',
    icon: Users,
    path: '/clients',
    labelKey: 'sidebar.clients',
    children: [
      { key: 'clients_with_authorization', icon: UserCheck, path: '/clients/authorized', labelKey: 'sidebar.clients_with_authorization' },
      { key: 'clients_without_authorization', icon: UserX, path: '/clients/unauthorized', labelKey: 'sidebar.clients_without_authorization' },
    ],
  },

  {
    key: 'cases',
    icon: Briefcase,
    path: '/cases',
    labelKey: 'sidebar.cases',
    children: [
      { key: 'active_cases', icon: FolderOpen, path: '/cases/active', labelKey: 'sidebar.active_cases' },
      { key: 'closed_cases', icon: FolderClosed, path: '/cases/closed', labelKey: 'sidebar.closed_cases' },
    ],
  },

  { key: 'lawyers', icon: Users, path: '/lawyers', labelKey: 'sidebar.lawyers' },

  {
    key: 'services',
    icon: FileText,
    path: '/services',
    labelKey: 'sidebar.services',
    children: [
      { key: 'active_services', icon: Settings, path: '/services/active', labelKey: 'sidebar.active_services' },
      { key: 'completed_services', icon: Settings, path: '/services/completed', labelKey: 'sidebar.completed_services' },
    ],
  },

  {
    key: 'reports',
    icon: BarChart3,
    path: '/reports',
    labelKey: 'sidebar.reports',
    children: [
      { key: 'procedures_reports', icon: ClipboardList, path: '/reports/procedures', labelKey: 'sidebar.procedures_reports' },
      { key: 'sessions_reports', icon: CalendarIcon, path: '/reports/sessions', labelKey: 'sidebar.sessions_reports' },
      { key: 'cases_reports', icon: Briefcase, path: '/reports/cases', labelKey: 'sidebar.cases_reports' },
      { key: 'ads_reports', icon: Megaphone, path: '/reports/ads', labelKey: 'sidebar.ads_reports' },
    ],
  },

  {
    key: 'accounts',
    icon: FileText,
    path: '/accounts',
    labelKey: 'sidebar.accounts',
    children: [
      { key: 'expenses', icon: FolderOpen, path: '/accounts/expenses', labelKey: 'sidebar.expenses' },
      { key: 'revenues', icon: FolderClosed, path: '/accounts/revenues', labelKey: 'sidebar.revenues' },
    ],
  },

  {
    key: 'settings',
    icon: Settings,
    path: '/settings',
    labelKey: 'sidebar.settings',
    children: [
      { key: 'office_settings', icon: FolderOpen, path: '/settings/office', labelKey: 'sidebar.office_data' },
      { key: 'court_settings', icon: FolderClosed, path: '/settings/courts', labelKey: 'sidebar.courts' },
      { key: 'app_settings', icon: Settings, path: '/settings/app', labelKey: 'sidebar.account_settings' },
    ],
  },

  {
    key: 'users',
    icon: Users,
    path: '/users',
    labelKey: 'sidebar.users',
    children: [
      { key: 'roles_permissions', icon: UserCheck, path: '/users/roles', labelKey: 'sidebar.roles_permissions' },
    ],
  },
];
