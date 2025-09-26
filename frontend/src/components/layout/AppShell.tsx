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
    <div className="flex min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer />

      {/* Content */}
      <div className="flex flex-1 flex-col min-h-screen transition-all duration-300">
        <Header title={title} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>

      {/* Drawer (Mobile only) */}
      <MobileDrawer />
    </div>
  );
};

export default AppShell;
