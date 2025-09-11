import { Home, Users, Briefcase, FileText, BarChart3, ClipboardList, UserCheck, UserX, FolderOpen, FolderClosed, Settings, CalendarIcon, Megaphone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface MenuItem {
  key: string;
  icon: LucideIcon;
  path: string;
  children?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  { key: 'dashboard', icon: Home, path: '/dashboard' },

  // قسم العملاء
  {
    key: 'clients',
    icon: Users,
    path: '/clients',
    children: [
      { key: 'clients_with_authorization', icon: UserCheck, path: '/clients/authorized' },
      { key: 'clients_without_authorization', icon: UserX, path: '/clients/unauthorized' },
    ],
  },

  // قسم القضايا
  {
    key: 'cases',
    icon: Briefcase,
    path: '/cases',
    children: [
      { key: 'active_cases', icon: FolderOpen, path: '/cases/active' },
      { key: 'closed_cases', icon: FolderClosed, path: '/cases/closed' },
    ],
  },

  // قسم المحامين (جديد)
  {
    key: 'lawyers',
    icon: Users,
    path: '/lawyers',
  },

  // قسم الخدمات
  {
    key: 'services',
    icon: FileText,
    path: '/services',
    children: [
      { key: 'active_services', icon: Settings, path: '/services/active' },
      { key: 'completed_services', icon: Settings, path: '/services/completed' },
    ],
  },

  // قسم التقارير
  {
    key: 'reports',
    icon: BarChart3,
    path: '/reports',
    children: [
      { key: 'procedures_reports', icon: ClipboardList, path: '/reports/procedures' },
      { key: 'sessions_reports', icon: CalendarIcon, path: '/reports/sessions' },
      { key: 'cases_reports', icon: Briefcase, path: '/reports/cases' },
      { key: 'ads_reports', icon: Megaphone, path: '/reports/ads' },
    ],
  },

  // قسم الحسابات
  {
    key: 'accounts',
    icon: FileText,
    path: '/accounts',
    children: [
      { key: 'expenses', icon: FolderOpen, path: '/accounts/expenses' },
      { key: 'revenues', icon: FolderClosed, path: '/accounts/revenues' },
    ],
  },

  // قسم إعدادات التطبيق
  {
    key: 'settings',
    icon: Settings,
    path: '/settings',
    children: [
      { key: 'office_settings', icon: FolderOpen, path: '/settings/office' },
      { key: 'court_settings', icon: FolderClosed, path: '/settings/courts' },
      { key: 'app_settings', icon: Settings, path: '/settings/app' },
    ],
  },

  // قسم المستخدمين والأدوار والصلاحيات
  {
    key: 'users',
    icon: Users,
    path: '/users',
    children: [
      { key: 'roles_permissions', icon: UserCheck, path: '/users/roles' },
    ],
  },
];
 