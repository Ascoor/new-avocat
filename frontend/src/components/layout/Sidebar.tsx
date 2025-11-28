// src/layout/Sidebar.tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, LogOut } from "lucide-react";
import { motion, type Variants } from "framer-motion";

import BrandLogo from "@/components/common/BrandLogo";
import LegalIcon from "@/components/common/LegalIcon";
import type { IconKey } from "@/config/iconography";
import { Button } from "@/components/ui/button";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSidebar as useSidebarContext } from "@/contexts/SidebarContext";

import { getIconDesign } from "@/config/iconography";
import { sidebarGroups } from "@/config/sidebar";
import { cn } from "@/lib/utils";

export const collapsedWidth = 72;
export const expandedWidth = 272;

const sidebarVariants: Variants = {
  open: {
    width: expandedWidth,
    transition: { duration: 0.25, ease: [0.17, 0.55, 0.55, 1] },
  },
  closed: {
    width: collapsedWidth,
    transition: { duration: 0.22, ease: [0.42, 0, 0.58, 1] },
  },
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { t, isRTL } = useLanguage();
  const { logout } = useAuth();
  const { isCollapsed } = useSidebarContext();

  const collapsed = isCollapsed;
  const currentPath = location.pathname;

  const isActive = useCallback(
    (path?: string) =>
      !!path && (currentPath === path || currentPath.startsWith(`${path}/`)),
    [currentPath]
  );

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

  const [expandedGroups, setExpandedGroups] =
    useState<Record<string, boolean>>(initialExpanded);

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
    (key: string) =>
      setExpandedGroups((prev) => ({ ...prev, [key]: !prev[key] })),
    []
  );

  // 🔹 أيقونة متجاوبة + تستخدم توكنز التصميم
  const renderIcon = useCallback(
    (iconKey: IconKey, variant: "root" | "child" = "root") => {
      const design = getIconDesign(iconKey);
      const isRoot = variant === "root";

      const wrapperClass = cn(
        "flex items-center justify-center text-white",
        "shadow-[var(--legal-icon-shadow-soft)]",
        "rounded-[var(--legal-icon-corner-outer)]",
        design.badgeClass,
        collapsed
          ? "h-9 w-9 md:h-8 md:w-8"
          : isRoot
          ? "h-11 w-11 md:h-10 md:w-10" // مستوى أول
          : "h-9 w-9 md:h-8 md:w-8"      // عنصر فرعي
      );

      const iconClass = cn(
        "transition-transform duration-200",
        collapsed
          ? "h-4 w-4"
          : isRoot
          ? "h-5 w-5 md:h-4 md:w-4"
          : "h-4 w-4"
      );

      return (
        <span
          className={wrapperClass}
          style={{
            background: design.badgeGradient,
            boxShadow: design.shadow ?? "var(--legal-icon-shadow-soft)",
          }}
        >
          <LegalIcon
            iconKey={iconKey}
            className={iconClass}
            strokeWidth={1.5}
          />
        </span>
      );
    },
    [collapsed]
  );

  return (
    <motion.aside
      initial={false}
      animate={collapsed ? "closed" : "open"}
      variants={sidebarVariants}
      className={cn(
        "fixed inset-y-0 z-50 hidden h-screen flex-shrink-0 flex-col",
        "bg-surface-overlay/80 border border-border shadow-elegant backdrop-blur-xl",
        "md:flex",
        isRTL ? "right-0" : "left-0"
      )}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Brand */}
      
      {/* Brand */}
      <div
        className={cn(
          "flex items-center justify-center transition-all duration-base ease-smooth",
          collapsed ? "px-4 py-3" : "px-5 py-4"
        )}
      >
        <BrandLogo
          variant={collapsed ? "icon" : "full"}
          className={collapsed ? "h-10 w-10" : "h-9 w-auto"}
        />
      </div>
      {/* Navigation */}
      <SidebarContent className="sidebar-scroll flex-1 space-y-6 overflow-y-auto px-1 py-4">
        {sidebarGroups.map((group) => (
          <SidebarGroup key={group.key}>
            {!collapsed && (
              <SidebarGroupLabel className="px-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
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

                  // =========================
                  // عنصر بدون أطفال
                  // =========================
                  if (!hasChildren) {
                    const target = item.path ?? "#";
                    return (
                      <SidebarMenuItem key={item.key}>
                        <SidebarMenuButton
                          asChild
                          isActive={itemActive}
                          tooltip={collapsed ? t(`nav.${item.key}`) : undefined}
                          className={cn(
                            "group/nav rounded-2xl text-sm font-semibold leading-none transition-all duration-300 ease-smooth",
                            collapsed
                              ? "justify-center px-2 py-2.5"
                              : "gap-3 px-3 py-2.5",
                            itemActive
                              ? "bg-brand-primary/10 text-brand-primary"
                              : "text-foreground/80 hover:bg-brand-primary/8 hover:text-brand-primary dark:text-foreground"
                          )}
                        >
                          <NavLink
                            to={target}
                            className={cn(
                              "flex items-center",
                              collapsed ? "justify-center" : "w-full gap-3"
                            )}
                          >
                            {renderIcon(item.iconKey as IconKey, "root")}
                            {!collapsed && (
                              <span className="truncate text-sm font-semibold">
                                {t(`nav.${item.key}`)}
                              </span>
                            )}
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  }

                  // =========================
                  // عنصر بمستوى فرعي (Collapsible)
                  // =========================
                  const isExpanded = expandedGroups[item.key] ?? groupActive;
                  const childSpacing = collapsed ? "" : "ps-8";

                  return (
                    <SidebarMenuItem key={item.key}>
                      <Collapsible
                        open={isExpanded}
                        onOpenChange={() => toggleGroup(item.key)}
                      >
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            isActive={groupActive}
                            tooltip={collapsed ? t(`nav.${item.key}`) : undefined}
                            className={cn(
                              "group/nav rounded-2xl text-sm font-semibold leading-none transition-all duration-300 ease-smooth",
                              collapsed
                                ? "justify-center px-2 py-2.5"
                                : "gap-3 px-3 py-2.5",
                              groupActive
                                ? "bg-brand-primary/10 text-brand-primary"
                                : "text-foreground/80 hover:bg-brand-primary/8 hover:text-brand-primary dark:text-foreground"
                            )}
                          >
                            <div
                              className={cn(
                                "flex items-center",
                                collapsed ? "justify-center" : "gap-3"
                              )}
                            >
                              {renderIcon(item.iconKey as IconKey, "root")}
                              {!collapsed && (
                                <span className="truncate font-medium">
                                  {t(`nav.${item.key}`)}
                                </span>
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

                        <CollapsibleContent
                          className={cn("mt-1 space-y-1", collapsed && "hidden")}
                        >
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
                                    "rounded-xl px-3 py-2 text-sm transition-all duration-base ease-smooth",
                                    childSpacing,
                                    childActive
                                      ? "bg-brand-primary/10 text-brand-primary"
                                      : "text-foreground/80 hover:bg-brand-primary/8 hover:text-brand-primary dark:text-foreground"
                                  )}
                                >
                                  <NavLink
                                    to={childTarget}
                                    className="flex w-full items-center gap-3"
                                  >
                                    {renderIcon(child.iconKey as IconKey, "child")}
                                    <span className="truncate">
                                      {t(`nav.${child.key}`)}
                                    </span>
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

      {/* Footer / Logout */}
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
  