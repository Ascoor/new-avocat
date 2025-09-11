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
  {
    key: 'clients',
    icon: Users,
    path: '/clients',
    children: [
      { key: 'clients_with_authorization', icon: UserCheck, path: '/clients/authorized' },
      { key: 'clients_without_authorization', icon: UserX, path: '/clients/unauthorized' },
    ],
  },
  {
    key: 'cases',
    icon: Briefcase,
    path: '/cases',
    children: [
      { key: 'active_cases', icon: FolderOpen, path: '/cases/active' },
      { key: 'closed_cases', icon: FolderClosed, path: '/cases/closed' },
    ],
  },
  {
    key: 'services',
    icon: FileText,
    path: '/services',
    children: [
      { key: 'active_services', icon: Settings, path: '/services/active' },
      { key: 'completed_services', icon: Settings, path: '/services/completed' },
    ],
  },
  {
    key: 'reports',
    icon: BarChart3,
    path: '/reports',
    children: [
      { key: 'cases_reports', icon: Briefcase, path: '/reports/cases' },
      { key: 'services_reports', icon: FileText, path: '/reports/services' },
      { key: 'sessions_reports', icon: CalendarIcon, path: '/reports/sessions' },
      { key: 'procedures_reports', icon: ClipboardList, path: '/reports/procedures' },
      { key: 'ads_reports', icon: Megaphone, path: '/reports/ads' },
    ],
  },
];
