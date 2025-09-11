import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { SidebarProvider } from "@/contexts/SidebarContext";

interface AppShellProps {
  isRTL?: boolean;
  isLoading?: boolean;
  onRefresh?: () => void;
  children?: ReactNode; // optional, can also render <Outlet />
}

const AppShell = ({ isRTL = false, isLoading = false, onRefresh, children }: AppShellProps) => {
  return (
    <div className="flex min-h-screen w-full" dir={isRTL ? "rtl" : "ltr"}>
      {/* Sidebar */}
      <Sidebar className="flex-shrink-0" />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Header / topbar */}
        <Header onRefresh={onRefresh} isLoading={isLoading} />

        {/* Page content */}
        <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 overflow-auto">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
};

// Layout wrapper with SidebarProvider
export default function LayoutWrapper() {
  return (
    <SidebarProvider>
      <AppShell />
    </SidebarProvider>
  );
}
