import type { IconKey } from "@/config/iconography";

export type SidebarGroupKey = "main" | "system";

export interface SidebarItem {
  key: string;
  iconKey: IconKey;
  path?: string;
  children?: SidebarItem[];
}

export interface SidebarGroup {
  key: SidebarGroupKey;
  items: SidebarItem[];
}

export const sidebarGroups: SidebarGroup[] = [
  {
    key: "main",
    items: [
      { key: "dashboard", iconKey: "dashboard", path: "/dashboard" },
      { key: "cases", iconKey: "cases", path: "/dashboard/cases" },
      { key: "services", iconKey: "services", path: "/dashboard/services" },
      {
        key: "work_tracking",
        iconKey: "workTracking",
        children: [
          { key: "sessions", iconKey: "sessions", path: "/dashboard/sessions" },
          { key: "procedures", iconKey: "procedures", path: "/dashboard/procedures" },
        ],
      },
      {
        key: "customer_service",
        iconKey: "customerService",
        children: [
          { key: "clients", iconKey: "clients", path: "/dashboard/clients" },
          { key: "unClients", iconKey: "prospects", path: "/dashboard/unClients" },
        ],
      },
      { key: "archive", iconKey: "archive", path: "/dashboard/archive" },
      { key: "courts_search", iconKey: "courtsSearch", path: "/dashboard/courts_search" },
    ],
  },
  {
    key: "system",
    items: [
      {
        key: "settings",
        iconKey: "settings",
        children: [
          { key: "office_settings", iconKey: "officeSettings", path: "/dashboard/office_settings" },
          { key: "courts_settings", iconKey: "courtsSettings", path: "/dashboard/courts_settings" },
          { key: "lawyers", iconKey: "lawyers", path: "/dashboard/lawyers" },
          { key: "users_roles", iconKey: "usersRoles", path: "/dashboard/users_roles" },
        ],
      },
    ],
  },
];
