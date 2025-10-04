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
    <div className="dashboard-shell" dir={isRTL ? "rtl" : "ltr"}>
      <div className="dashboard-layout">
        {/* Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Mobile Drawer trigger */}
        <MobileDrawer />

        {/* Content */}
        <div className="dashboard-content">
          <Header title={title} />
          <main className="dashboard-scroll">
            <div className="dashboard-inner">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppShell;
