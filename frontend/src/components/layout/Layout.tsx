import React from "react";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Header } from "./Header";
import Sidebar from "../sidebar/Sidebar";
import MobileDrawer from "./MobileDrawer";

interface AppShellProps {
  children?: React.ReactNode;
  title?: string;
}

const AppShell: React.FC<AppShellProps> = ({ children, title }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Desktop Layout */}
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header title={title} />

          <main className="flex-1 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              className="p-6"
            >
              {children ?? <Outlet />}
            </motion.div>
          </main>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer />
    </div>
  );
};

export default AppShell;
