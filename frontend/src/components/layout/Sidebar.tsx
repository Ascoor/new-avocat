import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import BrandLogo from "../common/BrandLogo";
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
  const { logout } = useAuth();
  const { isCollapsed } = useSidebar();

  const collapsed = isCollapsed;

  const isPathActive = useMemo(
    () =>
      (path?: string) =>
        !!path && (location.pathname === path || location.pathname.startsWith(`${path}/`)),
    [location.pathname]
  );

  if (isMobile) return null;

  return (
    <motion.aside
      initial={{ width: collapsed ? 64 : 256 }}
      animate={{ width: collapsed ? 64 : 256 }}
      transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
      className={cn(
        "sidebar-shell hidden h-screen flex-shrink-0  flex-col md:sticky md:top-0 md:flex"
      )}
      dir={isRTL ? "rtl" : "ltr"}
      data-collapsed={collapsed}
    >
      {/* Brand Section */}
      <div
        className={cn(
          "sidebar-brand flex items-center justify-center gap-3 transition-all duration-300",
          collapsed ? "px-4 py-3" : "px-6 py-5"
        )}
      >
        <BrandLogo
          variant={collapsed ? "icon" : "full"}
          className={collapsed ? "h-10 w-10" : "h-9 w-auto"}
        />
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4 sidebar-scroll">
        {sidebarGroups.map((group) => (
          <div key={group.key} className="space-y-2">
            {!collapsed && (
              <p className="sidebar-group-label px-2 text-xs font-semibold">
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

      {/* Logout Section */}
      <div className="sidebar-footer border-t border-transparent px-3 py-4">
        <Button
          onClick={logout}
          variant="hero"
          className={cn(
            "w-full justify-start text-sidebar-text-muted transition-colors hover:bg-destructive/10 hover:text-destructive",
            collapsed ? "px-2" : "px-3"
          )}
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

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  collapsed,
  isPathActive,
  isRTL,
  t
}) => {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const childActive = hasChildren
    ? item.children!.some((child) => isPathActive(child.path))
    : false;
  const isActive = item.path ? isPathActive(item.path) : childActive;

  const design = getIconDesign(item.iconKey);

  const iconBadge = (
    <span
      className={cn(
        "sidebar-icon-badge flex items-center justify-center rounded-xl transition-all duration-300",
        collapsed
          ? "w-[var(20px)] h-[var(20px)]"
          : "w-[var(24px)] h-[var(24px)]",
        design.badgeClass ?? "text-white"
      )}
      style={{
        background: design.badgeGradient,
        boxShadow: design.shadow ?? "var(--shadow-premium)"
      }}
    >
      <LegalIcon
        iconKey={item.iconKey}
        width={collapsed ? 20 : 18}
        height={collapsed ? 20 : 18}
      />
    </span>
  );

  useEffect(() => {
    if (childActive) setOpen(true);
  }, [childActive]);

  const handleToggle = () => {
    if (hasChildren) setOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Parent Item */}
      <div
        className={cn(
          "sidebar-nav-item group relative flex items-center rounded-2xl text-sm transition-all duration-300",
          collapsed ? "justify-center py-2" : "px-1 py-1.5",
          isActive ? "text-sidebar-primary" : "text-sidebar-text-muted"
        )}
        data-active={isActive}
        data-collapsed={collapsed}
      >
        <NavLink
          to={
            item.path ?? (hasChildren ? item.children?.[0]?.path ?? "#" : "#")
          }
          end={!hasChildren}
          className={cn(
            "sidebar-nav-link flex w-full items-center gap-3 rounded-2xl px-3 py-2",
            collapsed && "justify-center px-0"
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
            {open ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {/* Child Items */}
      {!collapsed && hasChildren && open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className={cn("mt-1 space-y-1", isRTL ? "mr-6" : "ml-6")}
        >
          {item.children!.map((child) => {
            const childDesign = getIconDesign(child.iconKey);

            return (
              <NavLink
                key={child.key}
                to={child.path ?? "#"}
                className={({ isActive }) =>
                  cn(
                    "sidebar-subitem flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm",
                    isActive ? "is-active" : "text-sidebar-text-muted"
                  )
                }
              >
                <span
                  className="sidebar-icon-badge flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{
                    background: childDesign.badgeGradient,
                    boxShadow: "var(var(--shadow-luxury))"
                  }}
                >
                  <LegalIcon iconKey={child.iconKey} width={16} height={16} />
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
