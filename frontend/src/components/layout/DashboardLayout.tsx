import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { MobileNav } from "./MobileNav";

const SIDEBAR_W = 280;
const SIDEBAR_W_COLLAPSED = 80;

export default function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { direction } = useLanguage();

  const isRTL = direction === "rtl";
  const desktopOffset = sidebarCollapsed ? SIDEBAR_W_COLLAPSED : SIDEBAR_W;

  return (
    <div className="min-h-screen bg-background" dir={direction}>
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((prev) => !prev)}
        />
      </div>

      {/* Mobile Drawer */}
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      {/* Header */}
      <Header
        sidebarCollapsed={sidebarCollapsed}
        onMobileMenuOpen={() => setMobileNavOpen(true)}
      />

      {/* Content */}
      <motion.main
        initial={false}
        animate={{
          paddingLeft: isRTL ? 0 : desktopOffset,
          paddingRight: isRTL ? desktopOffset : 0,
        }}
        transition={{ duration: 0.22, ease: "easeInOut" }}
        className={cn("pt-16 min-h-screen")}
      >
        <div className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </motion.main>
    </div>
  );
}
