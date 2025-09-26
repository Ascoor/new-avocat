import React from "react";
import { useTranslation } from "react-i18next";

import Sidebar from "./Sidebar";
import MobileDrawer from "./MobileDrawer";
import { Header } from "./Header";

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
}

const AppShell: React.FC<AppShellProps> = ({ children, title }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div
      className="relative flex min-h-screen w-full min-w-0 bg-background"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Sidebar (Desktop only) */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex min-h-screen w-full min-w-0 flex-1 flex-col transition-all duration-300 ease-in-out">
        <Header title={title} />
        <main className="flex-1 overflow-y-auto">
          <div className="min-w-0 px-4 py-6 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>

      {/* Drawer (Mobile only) */}
      <MobileDrawer />
    </div>
  );
};

export default AppShell;
