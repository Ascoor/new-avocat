import React, { FC, ReactNode } from "react";
import { PanelLeft } from "lucide-react";

import Sidebar from "./Sidebar";
import MobileDrawer from "./MobileDrawer";
import { Header } from "./Header";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import { shellContainer, shellSectionSpacing } from "./layout-classes";
import { Button } from "../ui/button";

interface AppShellProps {
  children: ReactNode;
  title?: string;
  className?: string;
  layoutVariant?: "default" | "wide";
  showSidebarToggle?: boolean;
}

// نفس القيم المستخدمة في Sidebar
const COLLAPSED_WIDTH = 72;
const EXPANDED_WIDTH = 272;

const AppShell: FC<AppShellProps> = ({
  children,
  title,
  className,
  layoutVariant = "default",
  showSidebarToggle = true,
}) => {
  const { direction, isRTL, t } = useLanguage();
  const { isCollapsed, toggleCollapsed } = useSidebar();

  const sidebarWidth = isCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;
  const contentPadding =
    layoutVariant === "wide"
      ? "px-4 sm:px-6 lg:px-12"
      : "px-4 sm:px-6 lg:px-10 xl:px-14";

  const sidebarInlineSize = `${sidebarWidth}px`;

  return (
    <div
      dir={direction}
      className={cn("min-h-screen bg-background text-foreground", className)}
      style={{ ["--sidebar-width" as string]: sidebarInlineSize }}
    >
      {/* == Top bar (clone of old <Navbar />) == */}
      <Header title={title} showSidebarToggle={showSidebarToggle} />

      {showSidebarToggle && (
        <div
          className="pointer-events-none fixed top-24 z-30 hidden md:block"
          style=
            isRTL
              ? { right: `calc(${sidebarInlineSize} - 28px)` }
              : { left: `calc(${sidebarInlineSize} - 28px)` }
        >
          <Button
            size="icon"
            variant="secondary"
            className="pointer-events-auto h-10 w-10 rounded-full shadow-elegant"
            onClick={toggleCollapsed}
            aria-label={isCollapsed ? t("common.expand") : t("common.collapse")}
          >
            <PanelLeft
              className={cn(
                "h-4 w-4 transition-transform",
                isCollapsed ? "rotate-0" : isRTL ? "-rotate-180" : "rotate-180"
              )}
            />
          </Button>
        </div>
      )}

      {/* == Main row: Sidebar + Content (clone of old <div className=\"flex\">) == */}
      <div
        className={cn(
          "md:grid",
          isRTL ? "md:grid-cols-[1fr_var(--sidebar-width)]" : "md:grid-cols-[var(--sidebar-width)_1fr]"
        )}
      >
        {/* Sidebar column */}
        <div
          className={cn(
            "hidden md:block",
            "transition-[width] duration-300 ease-comfort",
            isRTL ? "order-last" : "order-first"
          )}
          style={{ width: `${sidebarWidth}px` }}
        >
          <Sidebar />
        </div>

        {/* Content column */}
        <main
          className={cn(
            "flex-1 overflow-x-hidden transition-[padding] duration-300 ease-comfort", // allows content to stretch naturally on all screens
            shellSectionSpacing,
            contentPadding,
            isRTL ? "order-first" : "order-last"
          )}
        >
          <div
            className={cn(
              "mx-auto w-full min-h-[calc(100vh-4rem)] min-w-0 p-4 sm:p-6", // keeps content aligned with the header container
              shellContainer,
              "flex flex-col gap-6"
            )}
          >
            {children}
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      <MobileDrawer />
    </div>
  );
};

export default AppShell;
interface DashboardLayoutProps {
  children: ReactNode;
  className?: string;
  title?: string; // ← هذا الجديد
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({
  children,
  className,
  title,
}) => {
  return (
    <div className={cn("flex flex-col gap-8", className)}>
      
      {/* العنوان (اختياري) */}
      {title && (
        <h1 className="text-3xl font-bold text-foreground mb-4">
          {title}
        </h1>
      )}

      {/* المحتوى */}
      {children}
    </div>
  );
};
