import type { LucideIcon } from "lucide-react";
import {
  Archive,
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
} from "lucide-react";

export interface SidebarItem {
  key: string;
  icon: LucideIcon;
  to?: string;
  labelKey?: string;
  bottom?: boolean;
  children?: SidebarItem[];
}

export const sidebarItems: SidebarItem[] = [
  { key: "dashboard", icon: LayoutDashboard, to: "/dashboard", labelKey: "dashboard" },
  { key: "cases", icon: Gavel, to: "/dashboard/cases", labelKey: "cases" },
  { key: "services", icon: ClipboardList, to: "/dashboard/services", labelKey: "services" },
  {
    key: "work_tracking",
    icon: Briefcase,
    labelKey: "work_tracking",
    children: [
      { key: "sessions", icon: CalendarClock, to: "/dashboard/work_tracking/sessions", labelKey: "sessions" },
      { key: "procedures", icon: ClipboardList, to: "/dashboard/work_tracking/procedures", labelKey: "procedures" },
    ],
  },
  {
    key: "customer_service",
    icon: Users,
    labelKey: "customer_service",
    children: [
      { key: "clients", icon: UserCheck, to: "/dashboard/customer_service/clients", labelKey: "clients" },
      { key: "unClients", icon: UserX, to: "/dashboard/customer_service/unClients", labelKey: "unClients" },
    ],
  },
  { key: "archive", icon: Archive, to: "/dashboard/archive", labelKey: "archive", bottom: true },
  { key: "courts_search", icon: Search, to: "/dashboard/courts_search", labelKey: "courts_search", bottom: true },
  {
    key: "settings",
    icon: Settings,
    labelKey: "settings",
    children: [
      { key: "office_settings", icon: Building, to: "/dashboard/settings/office_settings", labelKey: "office_settings" },
      { key: "courts_settings", icon: Gavel, to: "/dashboard/settings/courts_settings", labelKey: "courts_settings" },
      { key: "lawyers", icon: Scale, to: "/dashboard/settings/lawyers", labelKey: "lawyers" },
      { key: "users_roles", icon: Shield, to: "/dashboard/settings/users_roles", labelKey: "users_roles" },
    ],
  },
];

export const translateKey = (key: string, lang: string) => {
  const labels: Record<string, { ar: string; en: string }> = {
    dashboard: { ar: "لوحة التحكم", en: "Dashboard" },
    cases: { ar: "القضايا", en: "Cases" },
    lawyers: { ar: "المحامون", en: "Lawyers" },
    customer_service: { ar: "خدمة العملاء", en: "Customer Service" },
    clients: { ar: "الوكلاء", en: "Clients" },
    unClients: { ar: "العملاء بدون وكالة", en: "Prospects" },
    services: { ar: "الخدمات", en: "Services" },
    work_tracking: { ar: "متابعة العمل", en: "Work Tracking" },
    sessions: { ar: "الجلسات", en: "Sessions" },
    procedures: { ar: "الإجراءات", en: "Procedures" },
    settings: { ar: "الإعدادات", en: "Settings" },
    courts_settings: { ar: "المحاكم", en: "Courts" },
    office_settings: { ar: "إعدادات المكتب", en: "Office Settings" },
    users_roles: { ar: "الأدوار والصلاحيات", en: "Users & Roles" },
    archive: { ar: "الأرشيف", en: "Archive" },
    courts_search: { ar: "البحث القضائي", en: "Courts Search" },
  };

  return labels[key]?.[lang] || key;
};
