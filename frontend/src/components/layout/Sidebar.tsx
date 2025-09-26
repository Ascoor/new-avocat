import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight, LogOut } from "lucide-react";

import BrandLogo from "../common/BrandLogo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { useIsMobile } from "@/hooks/use-mobile";
import LegalIcon from "@/components/common/LegalIcon";
import { getIconDesign } from "@/config/iconography";
import { sidebarGroups, type SidebarItem as SidebarItemType } from "@/config/sidebar";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { t, isRTL } = useLanguage();
  const { logout, user } = useAuth();
  const { isCollapsed } = useSidebar();

  const collapsed = isCollapsed;

  const isPathActive = useMemo(
    () =>
      (path?: string) =>
        !!path && (location.pathname === path || location.pathname.startsWith(`${path}/`)),
    [location.pathname],
  );

  if (isMobile) {
    return null;
  }

  const handleLogout = () => logout();

  return (
    <motion.aside
      initial={{ width: collapsed ? 64 : 256 }}
      animate={{ width: collapsed ? 64 : 256 }}
      transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
      className={cn(
        "hidden h-screen flex-shrink-0 flex-col border-r border-transparent md:sticky md:top-0 md:flex",
      )}
      style={{
        background:
          "linear-gradient(180deg, rgba(11, 18, 35, 0.95) 0%, rgba(14, 24, 45, 0.88) 55%, rgba(11, 18, 35, 0.95) 100%)",
        boxShadow: "0 28px 48px rgba(8, 15, 34, 0.55)",
        borderRight: "1px solid rgba(94, 122, 184, 0.28)",
        backdropFilter: "blur(18px)",
      }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="flex items-center gap-3 border-b border-sidebar-border px-6 py-4">
        <BrandLogo variant={collapsed ? "icon" : "full"} className={collapsed ? "h-8 w-8" : "h-8 w-auto"} />
      </div> 

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        {sidebarGroups.map((group) => (
          <div key={group.key} className="space-y-2">
            {!collapsed && (
              <p className="px-2 text-xs font-semibold uppercase tracking-wide text-white/60">
                {t(`sidebar.sections.${group.key}`)}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map((item) => (
                <SidebarItem
                  key={item.key}
                  item={item}
                  collapsed={collapsed}
                  isPathActive={isPathActive}
                  isRTL={isRTL}
                  t={t}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border px-3 py-4">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className={cn(
            "w-full justify-start text-sidebar-text-muted transition-colors hover:bg-destructive/10 hover:text-destructive",
            collapsed ? "px-2" : "px-3",
          )}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && (
            <span className={cn(isRTL ? "mr-2" : "ml-2")}>{t("auth.logout")}</span>
          )}
        </Button>
      </div>
    </motion.aside>
  );
};

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
  isPathActive: (path?: string) => boolean;
  isRTL: boolean;
  t: (key: string) => string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, collapsed, isPathActive, isRTL, t }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const childActive = hasChildren
    ? item.children!.some((child) => isPathActive(child.path))
    : false;
  const isActive = item.path ? isPathActive(item.path) : childActive;

  const design = getIconDesign(item.iconKey);
  const badgeStyle = {
    background: design.badgeGradient,
    boxShadow: design.shadow,
  } as const;
  const iconBadge = (
    <span
      className={cn(
        "flex items-center justify-center rounded-2xl transition-all duration-300",
        collapsed ? "h-12 w-12" : "h-11 w-11",
        design.badgeClass ?? "text-white",
      )}
      style={badgeStyle}
    >
      <LegalIcon
        iconKey={item.iconKey}
        width={collapsed ? 28 : 24}
        height={collapsed ? 28 : 24}
        aria-hidden
      />
    </span>
  );

  useEffect(() => {
    if (!hasChildren) return;
    if (childActive) {
      setOpen(true);
    }
  }, [childActive, hasChildren]);

  const handleToggle = () => {
    if (hasChildren) {
      setOpen((prev) => !prev);
    }
  };

  return (
    <div>
      <div
        className={cn(
          "group relative flex items-center rounded-2xl text-sm transition-all duration-300",
          collapsed ? "justify-center py-2" : "px-1 py-1.5",
          isActive
            ? "bg-white/10 text-white shadow-[0_18px_36px_rgba(6,13,30,0.45)]"
            : "text-sidebar-text-muted hover:bg-white/5 hover:text-white",
        )}
      >
        <NavLink
          to={item.path ?? (hasChildren ? item.children?.[0]?.path ?? "#" : "#")}
          end={!hasChildren}
          className={cn(
            "flex w-full items-center gap-3 rounded-2xl px-3 py-2 transition-all duration-300",
            collapsed && "justify-center px-0",
          )}
          onClick={(event) => {
            if (!item.path && hasChildren) {
              event.preventDefault();
              handleToggle();
            }
          }}
        >
          {iconBadge}
          {!collapsed && <span className="truncate">{t(`nav.${item.key}`)}</span>}
        </NavLink>
        {!collapsed && hasChildren && (
          <button
            type="button"
            className="ml-auto inline-flex h-6 w-6 items-center justify-center rounded-md text-sidebar-text-muted hover:text-sidebar-primary"
            onClick={(event) => {
              event.stopPropagation();
              handleToggle();
            }}
            aria-label={open ? t("sidebar.toggle.close") : t("sidebar.toggle.open")}
          >
            {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        )}
      </div>

      {!collapsed && hasChildren && open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className={cn("mt-1 space-y-1", isRTL ? "mr-6" : "ml-6")}
        >
          {item.children!.map((child) => {
            const childDesign = getIconDesign(child.iconKey);
            const childBadgeStyle = {
              background: childDesign.badgeGradient,
              boxShadow: childDesign.shadow,
            } as const;

            return (
              <NavLink
                key={child.key}
                to={child.path ?? "#"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-sidebar-text-muted transition-colors",
                    isActive
                      ? "bg-sidebar-active-glow text-sidebar-primary"
                      : "hover:bg-sidebar-hover-glow hover:text-sidebar-hover-foreground",
                  )
                }
                onClick={(event) => {
                  if (!child.path) {
                    event.preventDefault();
                  }
                }}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-xl",
                    childDesign.badgeClass ?? "text-white",
                  )}
                  style={childBadgeStyle}
                >
                  <LegalIcon iconKey={child.iconKey} width={20} height={20} aria-hidden />
                </span>
                <span>{t(`nav.${child.key}`)}</span>
              </NavLink>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default Sidebar;
