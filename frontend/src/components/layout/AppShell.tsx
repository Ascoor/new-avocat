import React, { FC, ReactNode } from "react";
import Sidebar, {
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_EXPANDED_WIDTH,
} from "./Sidebar";
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

  const sidebarWidth = isCollapsed
    ? SIDEBAR_COLLAPSED_WIDTH
    : SIDEBAR_EXPANDED_WIDTH;
  const contentPadding =
    layoutVariant === "wide"
      ? "px-4 sm:px-6 lg:px-12"
      : "px-4 sm:px-6 lg:px-10 xl:px-14";

  return (
    <div
      dir={direction}
      className={cn("min-h-screen bg-background text-foreground", className)}
    >
      {/* == Top bar (clone of old <Navbar />) == */}
      <Header title={title} showSidebarToggle={showSidebarToggle} />

      {/* == Main row: Sidebar + Content (clone of old <div className=\"flex\">) == */}
      <div className={cn("flex", isRTL ? "flex-row-reverse" : "flex-row")}>
        {/* Sidebar column */}
        <div
          className={cn(
            "hidden md:block",
            "transition-[width] duration-200 ease-comfort will-change-[width]"
          )}
          style={{ width: `${sidebarWidth}px` }}
        >
          <Sidebar />
        </div>

        {/* Content column */}
        <main
          className={cn(
            "flex-1 overflow-x-hidden", // allows content to stretch naturally on all screens
            shellSectionSpacing,
            contentPadding
          )}
        >
          <div
            className={cn(
              shellContainer,
              "flex flex-col gap-6 p-4 sm:p-6 lg:p-8"
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
