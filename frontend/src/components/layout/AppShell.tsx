// src/layout/AppShell.tsx
import React, { CSSProperties } from "react";
import Sidebar from "./Sidebar";
import MobileDrawer from "./MobileDrawer";
import { Header } from "./Header";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import { shellContainer, shellSectionSpacing } from "./layout-classes";

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  layoutVariant?: "default" | "wide";
  showSidebarToggle?: boolean;
}

// نفس القيم المستخدمة في Sidebar
const COLLAPSED_WIDTH = 72;
const EXPANDED_WIDTH = 272;

const AppShell: React.FC<AppShellProps> = ({
  children,
  title,
  className,
  layoutVariant = "default",
  showSidebarToggle = true,
}) => {
  const { direction } = useLanguage();
  const { isCollapsed } = useSidebar();

  const sidebarWidth = isCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;
  const contentPadding = layoutVariant === "wide" ? "lg:px-12" : "lg:px-20";

  const contentStyle: CSSProperties = {
    ["--sidebar-width" as any]: `${sidebarWidth}px`,
  };

  return (
    <div
      dir={direction}
      className={cn(
        "dashboard-shell min-h-screen bg-background text-foreground",
        "[--shell-background:theme(colors.background)] [--shell-overlay:transparent]",
        className
      )}
    >
      <div className="relative min-h-screen">
        {/* الشريط الجانبي الثابت يمين/يسار حسب اللغة */}
        <Sidebar />

        {/* الهيدر + المحتوى: في الديسكتوب يتحرك من جهة الشريط فقط */}
        <div
          style={contentStyle}
          className={cn(
            "relative flex min-h-screen flex-col",
            "md:transition-[margin] md:duration-300 md:ease-comfort",
            "ltr:md:ml-[var(--sidebar-width)] rtl:md:mr-[var(--sidebar-width)]"
          )}
        >
          <Header title={title} showSidebarToggle={showSidebarToggle} />

          <main className={cn(shellSectionSpacing, contentPadding, "md:pt-6")}>
            <div className={cn(shellContainer, "px-4 sm:px-6 lg:px-14 flex flex-col gap-6")}>
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* للموبايل: القائمة الجانبية تغطي الشاشة بالكامل */}
      <MobileDrawer />
    </div>
  );
};

export default AppShell;
