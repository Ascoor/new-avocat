import React, { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  Briefcase,
  CalendarClock,
  FileText,
  Home,
  LogOut,
  PanelLeft,
  Scale,
  Search,
  Settings,
  Shield,
  UserCheck,
  UserX,
  Database,
  Bell,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useSidebar } from "@/contexts/SidebarContext";

type SidebarLink = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { language } = useLanguage();
  const { logout, user } = useAuth();
  const { isCollapsed, isMobileOpen, toggleCollapsed, toggleMobile, closeMobile } = useSidebar();

  const collapsed = isMobile ? !isMobileOpen : isCollapsed;

  const mainLinks: SidebarLink[] = useMemo(
    () => [
      { title: language === "ar" ? "لوحة التحكم" : "Dashboard", url: "/dashboard", icon: Home },
      { title: language === "ar" ? "القضايا" : "Cases", url: "/dashboard/cases", icon: Briefcase },
      {
        title: language === "ar" ? "الجلسات" : "Sessions",
        url: "/dashboard/sessions",
        icon: CalendarClock,
      },
      {
        title: language === "ar" ? "الإجراءات" : "Procedures",
        url: "/dashboard/procedures",
        icon: FileText,
      },
      {
        title: language === "ar" ? "العملاء" : "Clients",
        url: "/dashboard/clients",
        icon: UserCheck,
      },
      {
        title: language === "ar" ? "عملاء محتملون" : "Prospects",
        url: "/dashboard/unClients",
        icon: UserX,
      },
      {
        title: language === "ar" ? "المحامون" : "Lawyers",
        url: "/dashboard/lawyers",
        icon: Scale,
      },
      {
        title: language === "ar" ? "الخدمات" : "Services",
        url: "/dashboard/services",
        icon: Briefcase,
      },
      {
        title: language === "ar" ? "التقارير" : "Reports",
        url: "/dashboard/reports",
        icon: BarChart3,
      },
    ],
    [language],
  );

  const managementLinks: SidebarLink[] = useMemo(
    () => [
      {
        title: language === "ar" ? "إعدادات المكتب" : "Office Settings",
        url: "/dashboard/office_settings",
        icon: Settings,
      },
      {
        title: language === "ar" ? "محاكم" : "Courts",
        url: "/dashboard/courts_settings",
        icon: Scale,
      },
      {
        title: language === "ar" ? "الأدوار والصلاحيات" : "Users & Roles",
        url: "/dashboard/users_roles",
        icon: Shield,
      },
      {
        title: language === "ar" ? "الأرشيف" : "Archive",
        url: "/dashboard/archive",
        icon: BookOpen,
      },
      {
        title: language === "ar" ? "البحث القضائي" : "Courts Search",
        url: "/dashboard/courts_search",
        icon: Search,
      },
    ],
    [language],
  );

  const secondaryLinks: SidebarLink[] = useMemo(
    () => [
      {
        title: language === "ar" ? "قواعد البيانات" : "Database",
        url: "/dashboard/database",
        icon: Database,
      },
      {
        title: language === "ar" ? "التنبيهات" : "Notifications",
        url: "/dashboard/notifications",
        icon: Bell,
      },
    ],
    [language],
  );

  const isActive = (url: string) => {
    if (url === "/dashboard") {
      return location.pathname === url;
    }
    return location.pathname === url || location.pathname.startsWith(`${url}/`);
  };

  const handleLinkClick = () => {
    if (isMobile && isMobileOpen) {
      toggleMobile();
    }
  };

  const handleToggle = () => {
    if (isMobile) {
      toggleMobile();
    } else {
      toggleCollapsed();
    }
  };

  const menuButton = (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className="h-8 w-8 rounded-full border border-transparent text-sidebar-foreground transition-all duration-300 hover:border-sidebar-border hover:bg-sidebar-item"
      aria-label={collapsed ? (language === "ar" ? "توسيع" : "Expand") : language === "ar" ? "تصغير" : "Collapse"}
    >
      {collapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeft className="h-4 w-4 rotate-180" />}
    </Button>
  );

  return (
    <>
      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          role="presentation"
          onClick={closeMobile}
        />
      )}

      <aside
        className={cn(
          "sidebar-shell-shadow fixed top-0 h-full border-r border-sidebar-border bg-sidebar-background transition-all duration-300 ease-in-out lg:static",
          collapsed ? "w-16" : "w-72",
          isMobile ? (isMobileOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0",
        )}
        dir={language === "ar" ? "rtl" : "ltr"}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-3 border-b border-sidebar-border px-4 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sidebar-primary/10 text-sidebar-primary">
              <Scale className="h-6 w-6" />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <h1 className="truncate text-lg font-semibold text-sidebar-text-strong">
                  {language === "ar" ? "أفوكات" : "Avocat"}
                </h1>
                <p className="truncate text-xs text-sidebar-text-muted">
                  {language === "ar" ? "منصة إدارة قانونية" : "Legal Management Platform"}
                </p>
              </div>
            )}
            {menuButton}
          </div>

          {!collapsed && user?.email && (
            <div className="mx-4 mt-3 rounded-xl border border-sidebar-border bg-sidebar-surface px-3 py-2">
              <p className="truncate text-xs text-sidebar-text-muted">{user.email}</p>
            </div>
          )}

          <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
            <SidebarSection
              title={collapsed ? undefined : language === "ar" ? "الرئيسية" : "Main"}
              links={mainLinks}
              collapsed={collapsed}
              onNavigate={handleLinkClick}
              isActive={isActive}
            />

            <SidebarSection
              title={collapsed ? undefined : language === "ar" ? "الإدارة" : "Management"}
              links={managementLinks}
              collapsed={collapsed}
              onNavigate={handleLinkClick}
              isActive={isActive}
            />

            <SidebarSection
              title={collapsed ? undefined : language === "ar" ? "النظام" : "System"}
              links={secondaryLinks}
              collapsed={collapsed}
              onNavigate={handleLinkClick}
              isActive={isActive}
            />
          </nav>

          <div className="border-t border-sidebar-border px-4 py-4">
            <Button
              onClick={logout}
              variant="ghost"
              className={cn(
                "w-full justify-start text-sidebar-text-muted transition-colors hover:bg-destructive/10 hover:text-destructive",
                collapsed ? "px-0" : "px-3",
              )}
            >
              <LogOut className="h-5 w-5" />
              {!collapsed && <span className="ml-2">{language === "ar" ? "تسجيل الخروج" : "Sign Out"}</span>}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

interface SectionProps {
  title?: string;
  links: SidebarLink[];
  collapsed: boolean;
  onNavigate: () => void;
  isActive: (url: string) => boolean;
}

const SidebarSection: React.FC<SectionProps> = ({ title, links, collapsed, onNavigate, isActive }) => {
  return (
    <div className="space-y-3">
      {title ? <p className="text-xs font-semibold uppercase text-sidebar-text-muted">{title}</p> : null}
      <div className="space-y-1">
        {links.map((link) => {
          const active = isActive(link.url);
          return (
            <NavLink
              key={link.url}
              to={link.url}
              end={link.url === "/dashboard"}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-xl border border-transparent px-3 py-2 text-sm font-medium text-sidebar-text-muted transition-all",
                  "hover:-translate-y-px hover:bg-sidebar-item hover:text-sidebar-text-strong hover:shadow-sidebar-hover",
                  collapsed ? "justify-center px-2" : "justify-start",
                  (isActive || active) &&
                    "border-sidebar-border bg-sidebar-item text-sidebar-text-strong shadow-sidebar-active",
                )
              }
            >
              <link.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span className="truncate">{link.title}</span>}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
