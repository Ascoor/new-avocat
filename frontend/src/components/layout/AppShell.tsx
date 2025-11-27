import React from "react";
import Sidebar from "./Sidebar";
import MobileDrawer from "./MobileDrawer";
import { Header } from "./Header";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const AppShell: React.FC<AppShellProps> = ({ children, title, className }) => {
  const { direction, isRTL } = useLanguage();

  const shellColumns = isRTL
    ? "md:[grid-template-columns:1fr_auto]"
    : "md:[grid-template-columns:auto_1fr]";
  const sidebarPlacement = isRTL ? "md:col-start-2" : "md:col-start-1";
  const contentPlacement = isRTL ? "md:col-start-1" : "md:col-start-2";

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
          "relative grid min-h-screen bg-gradient-to-br from-surface via-surface-raised to-surface-overlay",
          "md:items-stretch",
          shellColumns
        )}
      >
        {/* Desktop sidebar stays docked; order flips automatically for RTL */}
        <div className={cn("hidden md:flex", sidebarPlacement)}>
          <Sidebar />
        </div>

        {/* Header + main content */}
        <div className={cn("relative flex min-h-screen flex-col", contentPlacement)}>
          <Header title={title} />
          <main className="flex-1 overflow-y-auto px-4 pb-8 pt-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">{children}</div>
          </main>
        </div>
      </div>

      {/* Mobile drawer mounts once so it can animate above the shell */}
      <MobileDrawer />
    </div>
  );
};

export default AppShell;
