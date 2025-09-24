import React from "react";
import { useTranslation } from "react-i18next";

import Sidebar from "./Sidebar";
import { Header } from "./Header";
import { useSidebar } from "@/contexts/SidebarContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
}

const AppShell: React.FC<AppShellProps> = ({ children, title }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const isMobile = useIsMobile();
  const { isCollapsed, isMobileOpen } = useSidebar();

  const collapsed = isMobile ? !isMobileOpen : isCollapsed;

  return (
    <div className="flex min-h-screen bg-[hsl(var(--background))]" dir={isRTL ? "rtl" : "ltr"}>
      <Sidebar />
      <div
        className={cn(
          "flex min-h-screen flex-1 flex-col bg-[hsl(var(--background))] transition-all duration-300",
          !isMobile && (collapsed ? (isRTL ? "pr-16" : "pl-16") : (isRTL ? "pr-72" : "pl-72")),
        )}
      >
        <Header title={title} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppShell;
