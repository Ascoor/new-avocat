import React from "react";
import Sidebar from "./Sidebar";
import MobileDrawer from "./MobileDrawer";
import { Header } from "./Header";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
}

const AppShell: React.FC<AppShellProps> = ({ children, title }) => {
  const { direction, isRTL } = useLanguage();

  return (
    <div
      dir={direction}
      className="min-h-screen bg-surface text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50"
    >
      <div
        className={cn(
          "min-h-screen bg-gradient-to-br from-surface via-surface-raised to-surface-overlay",
          "md:grid md:items-stretch",
          isRTL ? "md:[grid-template-columns:1fr_auto]" : "md:[grid-template-columns:auto_1fr]"
        )}
      >
        <div className={cn("hidden md:flex", isRTL ? "md:order-2" : "md:order-1")}> 
          <Sidebar />
        </div>

        <div className={cn("relative flex min-h-screen flex-col", isRTL ? "md:order-1" : "md:order-2")}> 
          <Header title={title} />
          <main className="flex-1 overflow-y-auto bg-gradient-to-b from-transparent via-surface/40 to-surface-overlay/60 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">{children}</div>
          </main>
        </div>
      </div>

      <MobileDrawer />
    </div>
  );
};

export default AppShell;
