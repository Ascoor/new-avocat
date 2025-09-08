import { Home, Users, Scale, Clock } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface SidebarItem {
  label: string;
  icon: LucideIcon;
  path: string;
}

export const sidebarItems: SidebarItem[] = [
  { label: 'Dashboard', icon: Home, path: '/dashboard' },
  { label: 'Clients', icon: Users, path: '/clients' },
  { label: 'Cases', icon: Scale, path: '/cases' },
  { label: 'Sessions', icon: Clock, path: '/sessions' },
];
