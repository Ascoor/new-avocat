import React, { FC, ReactNode } from "react";
import Sidebar, { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_EXPANDED_WIDTH } from "./Sidebar";
import MobileDrawer from "./MobileDrawer";
import { Header } from "./Header";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import { shellContainer, shellSectionSpacing } from "./layout-classes";

interface AppShellProps {
  children: ReactNode;
  title?: string;
  className?: string;
  layoutVariant?: "default" | "wide";
  showSidebarToggle?: boolean;
}

const AppShell: FC<AppShellProps> = ({
  children,
  title,
  className,
  layoutVariant = "default",
  showSidebarToggle = true,
}) => {
  const { direction, isRTL } = useLanguage();
  const { isCollapsed } = useSidebar();

  const headerHeight = 64;

  const sidebarWidth = isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_EXPANDED_WIDTH;
  const sidebarSide = isRTL ? "right" : "left";
  const contentPadding =
    layoutVariant === "wide"
      ? "px-4 sm:px-6 lg:px-12"
      : "px-4 sm:px-6 lg:px-10 xl:px-14";

  const layoutVars = {
    ["--sidebar-width" as string]: `${sidebarWidth}px`,
    ["--header-height" as string]: `${headerHeight}px`,
  } as React.CSSProperties;

  return (
    <div
      dir={direction}
      className={cn("min-h-screen bg-background text-foreground", className)}
      style={layoutVars}
    >
      {/* == Top bar (clone of old <Navbar />) == */}
      <Header
        title={title}
        showSidebarToggle={showSidebarToggle}
        sidebarWidth={sidebarWidth}
        sidebarSide={sidebarSide}
      />

      {/* == Sidebar + Content == */}
      <div className="relative flex w-full">
        <Sidebar />

        <main
          dir={direction}
          style={{ minHeight: "calc(100vh - var(--header-height, 64px))" }}
          className={cn(
            "relative flex-1 min-w-0 overflow-x-hidden",
            "transition-[margin,transform] duration-300 ease-comfort",
            sidebarSide === "left"
              ? "md:ms-[var(--sidebar-width)] md:me-0"
              : "md:me-[var(--sidebar-width)] md:ms-0",
            shellSectionSpacing,
            contentPadding
          )}
        >
          <div
            className={cn(
              "mx-auto w-full p-4 sm:p-6",
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
