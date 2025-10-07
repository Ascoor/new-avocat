import React, { useCallback, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, LogOut } from "lucide-react";
import { motion } from "framer-motion";

import BrandLogo from "@/components/common/BrandLogo";
import LegalIcon from "@/components/common/LegalIcon";
import type { IconKey } from "@/config/iconography";
import { Button } from "@/components/ui/button";
import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSidebar as useSidebarContext } from "@/contexts/SidebarContext";

import { getIconDesign } from "@/config/iconography";
import { sidebarGroups } from "@/config/sidebar";
import { cn } from "@/lib/utils";

// ==============================================
// Sidebar Component
// ==============================================
const Sidebar: React.FC = () => {
  const location = useLocation();
  const { t, isRTL } = useLanguage();
  const { logout } = useAuth();
  const { isCollapsed } = useSidebarContext();

  const collapsed = isCollapsed;
  const currentPath = location.pathname;

  // Helper: Check if a path is active
  const isActive = useCallback(
    (path?: string) => !!path && (currentPath === path || currentPath.startsWith(`${path}/`)),
    [currentPath]
  );

  // Initial expanded groups
  const initialExpanded = useMemo(() => {
    const defaults: Record<string, boolean> = {};
    sidebarGroups.forEach((group) => {
      group.items.forEach((item) => {
        if (item.children?.length) {
          defaults[item.key] = item.children.some((child) => isActive(child.path));
        }
      });
    });
    return defaults;
  }, [isActive]);

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(initialExpanded);

  // Sync expansion when route changes
  useEffect(() => {
    setExpandedGroups((prev) => {
      const next = { ...prev };
      sidebarGroups.forEach((group) => {
        group.items.forEach((item) => {
          if (item.children?.some((child) => isActive(child.path))) {
            next[item.key] = true;
          }
        });
      });
      return next;
    });
  }, [currentPath, isActive]);

  const toggleGroup = useCallback(
    (key: string) => setExpandedGroups((prev) => ({ ...prev, [key]: !prev[key] })),
    []
  );

  // Render icon badge safely with IconKey type
  const renderIcon = useCallback(
    (iconKey: IconKey, size: "default" | "sm" = "default") => {
      const design = getIconDesign(iconKey);
      const sizeClasses =
        size === "sm"
          ? "h-7 w-7 rounded-lg"
          : collapsed
          ? "h-9 w-9 rounded-xl"
          : "h-10 w-10 rounded-2xl";
      const iconSize = size === "sm" ? 16 : collapsed ? 20 : 18;

      return (
        <span
          className={cn(
            "flex items-center justify-center text-white shadow-sm",
            design.badgeClass,
            sizeClasses
          )}
          style={{
            background: design.badgeGradient,
            boxShadow: design.shadow ?? "var(--shadow-premium)",
          }}
        >
          <LegalIcon iconKey={iconKey} width={iconSize} height={iconSize} />
        </span>
      );
    },
    [collapsed]
  );

  // ==============================================
  // RENDER
  // ==============================================
  return (
    <motion.aside
      initial={{ width: collapsed ? 64 : 256 }}
      animate={{ width: collapsed ? 64 : 256 }}
      transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
      className={cn(
        "sidebar-shell hidden h-screen flex-shrink-0 flex-col border-r border-border bg-background md:sticky md:top-0 md:flex"
      )}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Brand */}
      <div
        className={cn(
          "flex items-center justify-center transition-all duration-300",
          collapsed ? "px-4 py-3" : "px-6 py-5"
        )}
      >
        <BrandLogo
          variant={collapsed ? "icon" : "full"}
          className={collapsed ? "h-10 w-10" : "h-9 w-auto"}
        />
      </div>

      {/* Navigation */}
      <SidebarContent className="flex-1 overflow-y-auto px-2 py-4 space-y-6 sidebar-scroll">
        {sidebarGroups.map((group) => (
          <SidebarGroup key={group.key}>
            {!collapsed && (
              <SidebarGroupLabel className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                {t(`sidebar.sections.${group.key}`)}
              </SidebarGroupLabel>
            )}

            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {group.items.map((item) => {
                  const hasChildren = !!item.children?.length;
                  const groupActive = hasChildren
                    ? item.children!.some((child) => isActive(child.path))
                    : false;
                  const itemActive = item.path ? isActive(item.path) : groupActive;

                  // ---- Single Item ----
                  if (!hasChildren) {
                    const target = item.path ?? "#";
                    return (
                      <SidebarMenuItem key={item.key}>
                        <SidebarMenuButton
                          asChild
                          isActive={itemActive}
                          tooltip={collapsed ? t(`nav.${item.key}`) : undefined}
                          className={cn(
                            "rounded-lg transition-all duration-200",
                            collapsed ? "justify-center" : "gap-3 px-3",
                            itemActive
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                          )}
                        >
                          <NavLink to={target} className="flex w-full items-center gap-3">
                            {renderIcon(item.iconKey as IconKey)}
                            {!collapsed && <span className="truncate">{t(`nav.${item.key}`)}</span>}
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  }

                  // ---- Collapsible Group ----
                  const isExpanded = expandedGroups[item.key] ?? groupActive;
                  const childSpacing = collapsed ? "" : isRTL ? "mr-8" : "ml-8";

                  return (
                    <SidebarMenuItem key={item.key}>
                      <Collapsible open={isExpanded} onOpenChange={() => toggleGroup(item.key)}>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            isActive={groupActive}
                            tooltip={collapsed ? t(`nav.${item.key}`) : undefined}
                            className={cn(
                              "rounded-lg transition-all duration-200",
                              collapsed ? "justify-center" : "gap-3 px-3",
                              groupActive
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              {renderIcon(item.iconKey as IconKey)}
                              {!collapsed && (
                                <span className="truncate font-medium">{t(`nav.${item.key}`)}</span>
                              )}
                            </div>
                            {!collapsed && (
                              <span className="ml-auto">
                                {isExpanded ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </span>
                            )}
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        {/* Sub-items */}
                        <CollapsibleContent className={cn("mt-1 space-y-1", collapsed && "hidden")}>
                          {!collapsed &&
                            item.children?.map((child) => {
                              const childActive = isActive(child.path);
                              const childTarget = child.path ?? "#";
                              return (
                                <SidebarMenuButton
                                  key={child.key}
                                  asChild
                                  isActive={childActive}
                                  className={cn(
                                    "rounded-lg px-3 py-2 text-sm transition-all duration-200",
                                    childSpacing,
                                    childActive
                                      ? "bg-primary/10 text-primary font-medium"
                                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                  )}
                                >
                                  <NavLink
                                    to={childTarget}
                                    className="flex w-full items-center gap-3"
                                  >
                                    {renderIcon(child.iconKey as IconKey, "sm")}
                                    <span className="truncate">{t(`nav.${child.key}`)}</span>
                                  </NavLink>
                                </SidebarMenuButton>
                              );
                            })}
                        </CollapsibleContent>
                      </Collapsible>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Logout */}
      <SidebarFooter className="border-t border-border px-3 py-4">
        <Button
          onClick={logout}
          variant="hero"
          className={cn(
            "w-full items-center justify-start gap-3 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive",
            collapsed && "justify-center gap-0"
          )}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>{t("auth.logout")}</span>}
        </Button>
      </SidebarFooter>
    </motion.aside>
  );
};

export default Sidebar;
