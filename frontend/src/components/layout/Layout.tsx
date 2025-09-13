import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { DashboardLayout } from '@/layouts/DashboardLayout';

export default function Layout({ children }: { children?: ReactNode }) {
  return <DashboardLayout>{children ?? <Outlet />}</DashboardLayout>;
}
