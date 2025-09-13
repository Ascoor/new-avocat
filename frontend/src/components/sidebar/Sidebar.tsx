import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import BrandLogo from "../common/BrandLogo";
import SidebarMenu from "./SidebarMenu";
import { menuItems } from "@/config/sidebar";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const { isRTL } = useLanguage();

  return (
    <div
      className={cn(
        "relative h-full bg-sidebar border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-56",
        isRTL ? "border-l" : "border-r"
      )}
    >
      <div className="p-4 flex items-center justify-between">
        {collapsed ? (
          <BrandLogo variant="icon" className="h-8" />
        ) : (
          <BrandLogo variant="full" className="h-8" />
        )}
        {/* Collapse toggle - only for desktop */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center justify-center h-6 w-6 rounded-full bg-sidebar-border hover:bg-sidebar-accent"
        >
          {collapsed
            ? isRTL
              ? <ChevronLeft size={14} />
              : <ChevronRight size={14} />
            : isRTL
              ? <ChevronRight size={14} />
              : <ChevronLeft size={14} />}
        </button>
        {/* Close button - only for mobile drawer */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden text-sidebar-foreground ml-2"
          >
            ✕
          </button>
        )}
      </div>

      <SidebarMenu items={menuItems} collapsed={collapsed} />
    </div>
  );
}
