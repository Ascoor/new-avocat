import React, { FC, ReactNode } from "react";

import Sidebar from "./Sidebar";
import MobileDrawer from "./MobileDrawer";
import { Header } from "./Header";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import { shellContainer, shellSectionSpacing } from "./layout-classes";

interface AppShellProps {
  // ✅ خليناه اختياري عشان يختفي خطأ "children is missing in type {}"
  children?: ReactNode;
  title?: string;
  className?: string;
  layoutVariant?: "default" | "wide";
  showSidebarToggle?: boolean;
}

// نفس القيم المستخدمة في الهيدر/Sidebar
const COLLAPSED_WIDTH = 72;
const EXPANDED_WIDTH = 272;

const AppShell: FC<AppShellProps> = ({
  children,
  title,
  className,
  layoutVariant = "default",
  showSidebarToggle = true,
}) => {
  const { direction } = useLanguage();
  const { isCollapsed } = useSidebar();

  const sidebarWidth = isCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH;

  const contentPadding =
    layoutVariant === "wide"
      ? "px-4 sm:px-6 lg:px-12"
      : "px-4 sm:px-6 lg:px-10 xl:px-14";

  const sidebarInlineSize = `${sidebarWidth}px`;

  // margin-inline-start تشتغل RTL/LTR تلقائي حسب dir
  const contentOffsetStyle = {
    marginInlineStart: sidebarInlineSize,
  } as const;

  return (
    <div
      dir={direction}
      className={cn("min-h-screen bg-background text-foreground", className)}
      style={{ ["--sidebar-width" as string]: sidebarInlineSize }}
    >
      {/* الهيدر بعرض كامل */}
      <Header title={title} showSidebarToggle={showSidebarToggle} />

      {/* الصف الرئيسي: سايدبار + محتوى */}
      <div className="flex">
        {/* عمود السايدبار */}
        <div
          className={cn(
            "hidden md:block",
            "transition-[width] duration-300 ease-comfort"
          )}
          style={{ width: sidebarInlineSize }}
        >
          <Sidebar />
        </div>

        {/* عمود المحتوى */}
        <main
          className={cn(
            "flex-1 overflow-x-hidden",
            "transition-[margin-inline-start] duration-300 ease-comfort",
            shellSectionSpacing,
            contentPadding
          )}
          style={contentOffsetStyle}
        >
          <div
            className={cn(
              "mx-auto w-full min-h-[calc(100vh-4rem)] min-w-0 p-4 sm:p-6",
              shellContainer,
              "flex flex-col gap-6"
            )}
          >
            {children}
          </div>
        </main>
      </div>

      {/* Drawer للموبايل */}
      <MobileDrawer />
    </div>
  );
};

export default AppShell;

interface DashboardLayoutProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({
  children,
  className,
  title,
}) => {
  return (
    <div className={cn("flex flex-col gap-8", className)}>
      {title && (
        <h1 className="mb-4 text-3xl font-bold text-foreground">
          {title}
        </h1>
      )}
      {children}
    </div>
  );
};
