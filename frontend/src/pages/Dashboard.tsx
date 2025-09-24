import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { useSidebar } from "@/contexts/SidebarContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const Dashboard: React.FC = () => {
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
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
