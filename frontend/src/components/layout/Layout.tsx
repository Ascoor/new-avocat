import { ReactNode, useState } from "react";
import { Outlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import {Header} from "@/components/layout/Header";
import Sidebar from "@/components/sidebar/Sidebar";

interface AppLayoutProps {
  children?: ReactNode;
}

export default function AppShell({ children }: AppLayoutProps) {
  const { isRTL, direction } = useLanguage();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full" dir={direction}>
      {/* Sidebar - Desktop */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Sidebar - Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsMobileOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: isRTL ? "100%" : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? "100%" : "-100%" }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className={cn(
                "fixed top-0 bottom-0 z-50 w-64 bg-sidebar text-sidebar-foreground shadow-lg",
                isRTL ? "right-0" : "left-0"
              )}
            >
              <Sidebar onClose={() => setIsMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Header  />
        <main className="flex-1 overflow-auto bg-background p-6">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
}
