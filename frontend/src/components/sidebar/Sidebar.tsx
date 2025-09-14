import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import BrandLogo from "../common/BrandLogo";
import SidebarMenu from "./SidebarMenu";
import { menuItems } from "@/config/menuItems";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const { isRTL } = useLanguage();

  const handleLinkClick = () => {
    if (onClose) onClose(); // إغلاق عند الضغط على أي لينك
  };

  return (
    <div
      className={cn(
        "h-full bg-background border-sidebar-border transition-all duration-300",
        // ✅ في الموبايل w-full ، في الديسكتوب w-56 / w-16
        onClose ? "w-full" : collapsed ? "w-16" : "w-56",
        isRTL ? "border-l" : "border-r"
      )}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        {collapsed && !onClose ? (
          <BrandLogo variant="icon" className="h-8" />
        ) : (
          <BrandLogo variant="full" className="h-8" />
        )}

        {/* Collapse toggle - Desktop only */}
        {!onClose && (
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
        )}

        {/* Close - Mobile only */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden text-sidebar-foreground ml-2"
          >
            ✕
          </button>
        )}
      </div>

      {/* Menu */}
      <SidebarMenu
        items={menuItems}
        collapsed={collapsed && !onClose}
        onItemClick={handleLinkClick}
      />
    </div>
  );
}
