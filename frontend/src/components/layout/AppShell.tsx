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
}

const AppShell: React.FC<AppShellProps> = ({ children, title, className }) => {
  const { direction, isRTL } = useLanguage();

 
  // Keep a single grid definition and flip order based on reading direction
  const shellColumns = isRTL ? "md:grid-cols-[1fr_auto]" : "md:grid-cols-[auto_1fr]";
  const sidebarPlacement = isRTL ? "md:order-2" : "md:order-1";
 
  const contentPlacement = isRTL ? "md:order-1" : "md:order-2";

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
          "md:items-stretch md:grid",
          shellColumns
        )}
      >
        {/* Desktop sidebar stays docked; order flips automatically for RTL */}
        <div className={cn("hidden h-full md:flex", sidebarPlacement)}>
          <Sidebar />
        </div>

        {/* Header + main content */}
        <div className={cn("relative flex min-h-screen flex-col", contentPlacement)}>
          <Header title={title} />
          <main className={shellSectionSpacing}>
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
