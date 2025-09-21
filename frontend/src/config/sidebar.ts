import type { LucideIcon } from 'lucide-react';
import {
  Archive,
  BarChart3,
  Briefcase,
  Building,
  CalendarClock,
  ClipboardList,
  Gavel,
  LayoutDashboard,
  Scale,
  Search,
  Settings,
  Shield,
  UserCheck,
  Users,
  UserX,
} from 'lucide-react';

export interface SidebarItem {
  id: string;
  labelKey: string;
  icon: LucideIcon;
  path?: string;
  children?: SidebarItem[];
}

export const sidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    labelKey: 'nav.dashboard',
    icon: LayoutDashboard,
    path: '/dashboard',
  },
  {
    id: 'cases',
    labelKey: 'nav.cases',
    icon: Gavel,
    path: '/dashboard/cases',
  },
  {
    id: 'work_tracking',
    labelKey: 'nav.followUpWork',
    icon: Briefcase,
    children: [
      {
        id: 'sessions',
        labelKey: 'nav.sessions',
        icon: CalendarClock,
        path: '/dashboard/sessions',
      },
      {
        id: 'procedures',
        labelKey: 'nav.procedures',
        icon: ClipboardList,
        path: '/dashboard/procedures',
      },
    ],
  },
  {
    id: 'customer_service',
    labelKey: 'nav.customer_service',
    icon: Users,
    children: [
      {
        id: 'clients',
        labelKey: 'nav.clients',
        icon: UserCheck,
        path: '/dashboard/clients',
      },
      {
        id: 'unClients',
        labelKey: 'nav.unClients',
        icon: UserX,
        path: '/dashboard/unClients',
      },
    ],
  },
  {
    id: 'lawyers',
    labelKey: 'nav.lawyers',
    icon: Scale,
    path: '/dashboard/lawyers',
  },
  {
    id: 'services',
    labelKey: 'nav.services',
    icon: ClipboardList,
    path: '/dashboard/services',
  },
  {
    id: 'reports',
    labelKey: 'nav.reports',
    icon: BarChart3,
    path: '/dashboard/reports',
  },
  {
    id: 'settings',
    labelKey: 'nav.settings',
    icon: Settings,
    children: [
      {
        id: 'office_settings',
        labelKey: 'nav.office_settings',
        icon: Building,
        path: '/dashboard/office_settings',
      },
      {
  id: 'courts_settings',
  labelKey: 'nav.courts_settings',   // مفتاح الترجمة
  icon: Gavel,
  path: '/dashboard/courts_settings',
},

      {
        id: 'users_roles',
        labelKey: 'nav.users_roles',
        icon: Shield,
        path: '/dashboard/users_roles',
      },
    ],
  },
  {
    id: 'archive',
    labelKey: 'nav.archive',
    icon: Archive,
    path: '/dashboard/archive',
  },
  {
    id: 'courts_search',
    labelKey: 'nav.courts_search',
    icon: Search,
    path: '/dashboard/courts_search',
  },
];
