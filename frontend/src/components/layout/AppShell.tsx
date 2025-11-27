import React from "react";
import Sidebar from "./Sidebar";
import MobileDrawer from "./MobileDrawer";
import { Header } from "./Header";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { shellContainer, shellSectionSpacing } from "./layout-classes";

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  layoutVariant?: "default" | "wide";
  showSidebarToggle?: boolean;
}

const AppShell: React.FC<AppShellProps> = ({
  children,
  title,
  className,
  layoutVariant = "default",
  showSidebarToggle = true,
}) => {
  const { direction, isRTL } = useLanguage();

  // Flip the flex flow instead of duplicating markup for RTL/LTR
  const desktopFlow = isRTL ? "md:flex-row-reverse" : "md:flex-row";
  const contentPadding = layoutVariant === "wide" ? "lg:px-12" : "lg:px-10";

  return (
    <div
      dir={direction}
      className={cn(
        "dashboard-shell min-h-screen bg-background text-foreground",
        "[--shell-background:theme(colors.surface)] [--shell-overlay:transparent]",
        className
      )}
    >
      <div
        className={cn(
          "relative flex min-h-screen flex-col bg-gradient-to-br from-surface via-surface-raised to-surface-overlay",
          desktopFlow
        )}
      >
        {/* Desktop sidebar: docks to the start edge but order flips with direction */}
        <div className="hidden md:flex">
          <Sidebar />
        </div>

        {/* Header + main content */}
        <div className="relative flex min-h-screen flex-1 flex-col overflow-hidden">
          <Header title={title} showSidebarToggle={showSidebarToggle} />
          <main className={cn(shellSectionSpacing, contentPadding)}>
            <div className={cn(shellContainer, "flex flex-col gap-6")}>{children}</div>
          </main>
        </div>
      </div>

      {/* Mobile drawer mounts once so it can animate above the shell */}
      <MobileDrawer />
    </div>
  );
};

export default AppShell;
