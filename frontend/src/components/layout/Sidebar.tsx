import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import BrandLogo from "@/components/common/BrandLogo";
import LegalIcon, { IconKey } from "@/components/common/LegalIcon";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { sidebarGroups, translateKey } from "@/config/sidebar";
import { cn } from "@/lib/utils";

export const SIDEBAR_COLLAPSED_WIDTH = 76;
export const SIDEBAR_EXPANDED_WIDTH = 276;

const Sidebar: React.FC = () => {
  const { pathname } = useLocation();
  const { t, language, isRTL } = useLanguage();
  const { isCollapsed } = useSidebar(); // 👈 نستخدم الحالة فقط، بدون setCollapsed

  const sidebarWidth = isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH;

 

  return (
    <aside
      dir={isRTL ? "rtl" : "ltr"}
      className={cn(
        "hidden md:flex",
        "shrink-0 border-border/70 bg-sidebar-surface text-sidebar-text",
        "transition-[width] duration-300 ease-comfort",
        isRTL ? "border-l" : "border-r"
      )}
      style={{
        width: `${sidebarWidth}px`,
        ["--header-height" as string]: "64px",
      }}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden">
        {/* رأس الشريط */}
        <div className="flex items-center gap-3 border-b border-border/60 px-4 py-4">
          <BrandLogo
            variant={isCollapsed ? "icon" : "full"}
            className={cn(isCollapsed ? "h-8" : "h-9", "transition-all")}
          />
         
        </div>

        {/* الروابط */}
        <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
          {sidebarGroups.map((group) => (
            <SidebarSection
              key={group.key}
              label={t(`sidebar.sections.${group.key}`)}
              isCollapsed={isCollapsed}
              isRTL={isRTL}
            >
              {group.items.map((item) => (
                <SidebarLink
                  key={item.key}
                  itemKey={item.key}
                  iconKey={item.iconKey}
                  path={item.path}
                  childrenItems={item.children}
                  isCollapsed={isCollapsed}
                  isRTL={isRTL}
                  activePath={pathname}
                  language={language}
                />
              ))}
            </SidebarSection>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

// ===================
// SidebarSection
// ===================

interface SidebarSectionProps {
  label: string;
  children: React.ReactNode;
  isCollapsed: boolean;
  isRTL: boolean;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({
  label,
  children,
  isCollapsed,
  isRTL,
}) => (
  <div className="space-y-2">
    <div
      className={cn(
        "px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground/60 transition-opacity",
        isCollapsed ? "opacity-0" : "opacity-80",
        isRTL ? "text-right" : "text-left"
      )}
    >
      {label}
    </div>
    <ul className="space-y-1">{children}</ul>
  </div>
);

// ===================
// SidebarLink
// ===================

interface SidebarLinkProps {
  itemKey: string;
  iconKey: IconKey; // 👈 هنا استخدمنا IconKey بدل string
  path?: string;
  childrenItems?: (typeof sidebarGroups)[number]["items"][number]["children"];
  isCollapsed: boolean;
  isRTL: boolean;
  activePath: string;
  language: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  itemKey,
  iconKey,
  path,
  childrenItems,
  isCollapsed,
  isRTL,
  activePath,
  language,
}) => {
  const hasChildren = childrenItems && childrenItems.length > 0;
  const current = path && activePath.startsWith(path);

  const linkContent = (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-base ease-comfort",
        current
          ? "bg-brand-primary/10 text-brand-primary shadow-[0_10px_30px_-18px_rgba(16,133,109,0.65)]"
          : "text-foreground/80 hover:bg-brand-primary/5 hover:text-brand-primary",
        isCollapsed ? "justify-center px-2" : "justify-start",
        hasChildren && "border border-transparent hover:border-border/60"
      )}
    >
      <span
        className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-primary/15 via-brand-primary/10 to-brand-primary/5 text-brand-primary"
        aria-hidden
      >
        <LegalIcon iconKey={iconKey} width={22} height={22} />
      </span>
      {!isCollapsed && (
        <span className="truncate text-sm">
          {translateKey(itemKey, language)}
        </span>
      )}
    </div>
  );

  // لو عنده أطفال (قائمة فرعية)
  if (hasChildren) {
    return (
      <li className="space-y-1">
        {/* ✅ Tooltip فقط في حالة الشريط المصغّر */}
        {isCollapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <div>{linkContent}</div>
            </TooltipTrigger>
            <TooltipContent side={isRTL ? "left" : "right"}>
              {translateKey(itemKey, language)}
            </TooltipContent>
          </Tooltip>
        ) : (
          <div>{linkContent}</div>
        )}

        <ul
          className={cn(
            "space-y-1 pl-4",
            isRTL && "pr-4",
            isCollapsed && "hidden"
          )}
        >
          {childrenItems!.map((child) => {
            const childActive = child.path && activePath.startsWith(child.path);
            return (
              <li key={child.key}>
                <NavLink
                  to={child.path ?? "#"}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors duration-base ease-comfort",
                      isActive || childActive
                        ? "bg-brand-primary/10 text-brand-primary"
                        : "text-foreground/75 hover:bg-brand-primary/5 hover:text-brand-primary"
                    )
                  }
                  end
                >
                  <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-surface-muted/60 text-brand-primary">
                    <LegalIcon iconKey={child.iconKey as IconKey} width={18} height={18} />
                  </span>
                  <span className="truncate">
                    {translateKey(child.key, language)}
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </li>
    );
  }

  // عنصر عادي بدون قائمة فرعية
  return (
    <li>
      {isCollapsed ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <NavLink to={path ?? "#"}>{linkContent}</NavLink>
          </TooltipTrigger>
          <TooltipContent side={isRTL ? "left" : "right"}>
            {translateKey(itemKey, language)}
          </TooltipContent>
        </Tooltip>
      ) : (
        <NavLink to={path ?? "#"}>{linkContent}</NavLink>
      )}
    </li>
  );
};
