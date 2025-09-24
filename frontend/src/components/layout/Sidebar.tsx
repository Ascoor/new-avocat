import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import BrandLogo from "../common/BrandLogo";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { sidebarItems, SidebarItem as SidebarItemType, translateKey } from "@/config/sidebar";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { language, isRTL } = useLanguage();
  const { logout } = useAuth();
  const { isCollapsed, isMobileOpen, toggleMobile } = useSidebar();

  const collapsed = isMobile ? false : isCollapsed;

  const isActive = (url: string) =>
    location.pathname === url || location.pathname.startsWith(`${url}/`);

  const handleLogout = () => logout();

  return (
    <motion.aside
      initial={{ width: collapsed ? 80 : 288 }}
      animate={{ width: collapsed ? 80 : 288 }}
      transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
      className={cn(
        "hidden md:flex flex-col h-screen border-r border-sidebar-border bg-sidebar-background"
      )}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-sidebar-border">
        {collapsed ? (
          <BrandLogo variant="icon" className="h-8 w-8" />
        ) : (
          <>
            <BrandLogo variant="full" className="h-8" />
            <p className="text-[11px] uppercase tracking-[0.28em] text-sidebar-text-muted">
              {language === "ar" ? "منصة إدارة قانونية" : "Legal Management"}
            </p>
          </>
        )}
      </div>

      {/* Links */}
      <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-6">
        {sidebarItems.map((item) => (
          <SidebarItem
            key={item.key}
            item={item}
            collapsed={collapsed}
            isActive={isActive}
            isRTL={isRTL}
            language={language}
          />
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-sidebar-border px-4 py-4">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-sidebar-text-muted hover:bg-destructive/10 hover:text-destructive"
        >
          ⏻ {!collapsed && (language === "ar" ? "تسجيل الخروج" : "Sign Out")}
        </Button>
      </div>
    </motion.aside>
  );
};

interface SidebarItemProps {
  item: SidebarItemType;
  parentKey?: string;
  collapsed: boolean;
  isActive: (url: string) => boolean;
  isRTL: boolean;
  language: string;
}

const buildPath = (key: string, parentKey?: string) =>
  key === "dashboard"
    ? "/dashboard"
    : parentKey
    ? `/dashboard/${parentKey}/${key}`
    : `/dashboard/${key}`;

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  parentKey,
  collapsed,
  isActive,
  isRTL,
  language,
}) => {
  const [open, setOpen] = useState(false);
  const url = buildPath(item.key, parentKey);
  const active =
    item.key === "dashboard"
      ? location.pathname === "/dashboard"
      : isActive(url);

  const hasChildren = item.children?.length > 0;

  return (
    <div>
      <div
        className={cn(
          "flex items-center justify-between rounded-xl px-3 py-2 cursor-pointer text-sm text-sidebar-text-muted hover:bg-sidebar-hover-glow hover:text-sidebar-hover-foreground",
          collapsed ? "justify-center" : "gap-3",
          active &&
            "bg-sidebar-active-glow text-sidebar-primary font-medium shadow-sidebar-active",
          isRTL
            ? "border-l-2 border-sidebar-primary"
            : "border-r-2 border-sidebar-primary"
        )}
        onClick={() => (hasChildren ? setOpen(!open) : null)}
      >
        <NavLink to={hasChildren ? "#" : url} className="flex items-center gap-3 flex-1">
          <item.icon className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>{translateKey(item.key, language)}</span>}
        </NavLink>
        {!collapsed && hasChildren && (
          open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
        )}
      </div>

      {!collapsed && hasChildren && open && (
        <div className="ml-6 mt-1 space-y-1">
          {item.children.map((child) => {
            const childUrl = buildPath(child.key, item.key);
            return (
              <NavLink
                key={child.key}
                to={childUrl}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-sidebar-text-muted hover:text-sidebar-hover-foreground",
                    isActive && "text-sidebar-primary font-medium"
                  )
                }
              >
                <child.icon className="h-4 w-4" />
                <span>{translateKey(child.key, language)}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
