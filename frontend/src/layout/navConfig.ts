import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  Search,
  Users,
  Briefcase,
  Gavel,
} from 'lucide-react';

export type NavItem = {
  label: string;
  path: string;
  icon: LucideIcon;
};

export const dashboardV2Nav: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard-v2', icon: LayoutDashboard },
  { label: 'Search Hub', path: '/dashboard-v2/search', icon: Search },
  { label: 'Clients', path: '/dashboard-v2/clients', icon: Users },
  { label: 'Cases', path: '/dashboard-v2/cases', icon: Gavel },
  { label: 'Services', path: '/dashboard-v2/services', icon: Briefcase },
];
