import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/contexts/SidebarContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BrandLogo from "../common/BrandLogo";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IconType } from "react-icons";
import {
  FaHome,
  FaFolder,
  FaUsers,
  FaCogs,
  FaFileInvoice,
  FaBalanceScale,
  FaMoneyBillWave,
  FaBriefcase,
  FaSearch,
} from "react-icons/fa";

interface SidebarLinkProps {
  to: string;
  icon: IconType;
  label: string;
  collapsed?: boolean;
}

const SidebarLink = ({ to, icon: Icon, label, collapsed = false }: SidebarLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-md w-full transition-all duration-200",
          isActive
            ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium glow"
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          collapsed && "justify-center"
        )
      }
    >
      <Icon size={20} />
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
};

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const { isCollapsed: collapsed, toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  const links = [
    { to: "/", icon: FaHome, label: t("sidebar.dashboard") },
    { to: "/legcases", icon: FaFolder, label: t("sidebar.cases") },
    { to: "/clients", icon: FaUsers, label: t("sidebar.clients") },
    { to: "/legcase-services", icon: FaCogs, label: t("sidebar.services") },
    { to: "/invoices", icon: FaFileInvoice, label: t("sidebar.invoices") },
    { to: "/consultations", icon: FaBalanceScale, label: t("sidebar.consultations") },
    { to: "/expenses", icon: FaMoneyBillWave, label: t("sidebar.expenses") },
    { to: "/contracts", icon: FaBriefcase, label: t("sidebar.contracts") },
    { to: "/search-courts-api", icon: FaSearch, label: t("sidebar.search_courts") },
  ];

  return (
    <>
      {isMobile && !collapsed && (
        <div
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={toggleSidebar}
        />
      )}
      <motion.aside
        initial={false}
        animate={
          isMobile
            ? { x: collapsed ? "-100%" : "0%" }
            : { width: collapsed ? "4rem" : "14rem" }
        }
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className={cn(
          "fixed top-0 left-0 z-40 h-screen bg-sidebar shadow-lg dark:shadow-glow border-r border-sidebar-border md:relative transition-all duration-300 ease-in-out",
          !isMobile && (collapsed ? "w-16" : "w-56"),
          className
        )}
      >
        {/* Sidebar Header with Logo and Collapse Toggle */}
        <div className="p-4">
          <div className={cn("flex items-center gap-2", collapsed && "justify-center")}> 
            {collapsed ? (
              <BrandLogo variant="icon" className="text-primary-foreground h-8 w-8" />
            ) : (
              <BrandLogo variant="full" className="text-primary-foreground ml-2 h-8 w-auto" />
            )}

            {/* Sidebar Collapse Toggle */}
            <div className="ml-auto">
              <button
                onClick={toggleSidebar}
                className="flex items-center justify-center h-6 w-6 rounded-full bg-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              >
                {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Links */}
        <div className="px-2 mt-6 space-y-1">
          {links.map((link) => (
            <SidebarLink
              key={link.to}
              to={link.to}
              icon={link.icon}
              label={link.label}
              collapsed={collapsed}
            />
          ))}
        </div>
      </motion.aside>
    </>
  );
}
