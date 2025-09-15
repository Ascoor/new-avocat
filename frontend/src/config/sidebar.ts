export interface MenuItem {
  key: string;
  icon: string;
  labelKey: string;
  to: string;
  bottom?: boolean;
}

export const menuItems: MenuItem[] = [
  { 
    key: "dashboard", 
    icon: "LayoutDashboard", 
    labelKey: "nav.dashboard", 
    to: "/" 
  },
  { 
    key: "cases", 
    icon: "Gavel", 
    labelKey: "nav.cases", 
    to: "/cases" 
  },
  { 
    key: "clients", 
    icon: "Users", 
    labelKey: "nav.clients", 
    to: "/clients" 
  },
  { 
    key: "documents", 
    icon: "FileText", 
    labelKey: "nav.documents", 
    to: "/documents" 
  },
  { 
    key: "reports", 
    icon: "BarChart3", 
    labelKey: "nav.reports", 
    to: "/reports" 
  },
  { 
    key: "settings", 
    icon: "Settings", 
    labelKey: "nav.settings", 
    to: "/settings", 
    bottom: true 
  },
];