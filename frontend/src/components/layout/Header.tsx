import React from "react";
import { Menu, X, UserCircle, Settings, User, LogOut, PanelLeft, SunDim, MoonStar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from "@/components/ui/theme-toggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import BrandLogo from "../common/BrandLogo";
import NotificationBell from "../common/NotificationBell";
import { useTheme } from "@/contexts/ThemeContext";

interface HeaderProps {
  title?: string;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, className }) => {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const { user, logout } = useAuth();
  const { isMobileOpen, toggleMobile, isCollapsed, toggleCollapsed } = useSidebar();
  const { theme } = useTheme();

  const toggleLang = () => setLanguage(language === "ar" ? "en" : "ar");

  return (
    <header
      className={cn(
        "header-shell sticky top-0 z-50 h-16 transition-all duration-500 backdrop-blur",
        className
      )}
    >
      <div className="relative z-[1] flex h-full items-center justify-between px-4">
        {/* Left side */}
        <div
          className={cn(
            "flex items-center gap-3",
            isRTL ? "flex-row-reverse" : "flex-row"
          )}
        >
          {/* Mobile menu button */}
          <Button
            variant="glass"
            size="icon"
            onClick={toggleMobile}
            className="md:hidden h-9 w-9"
            aria-label={isMobileOpen ? t("common.close") : t("common.menu")}
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Desktop collapse toggle */}
          <Button
            variant="glass"
            size="icon"
            onClick={toggleCollapsed}
            className="hidden md:flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-muted-foreground transition hover:border-border hover:bg-muted"
            aria-label={isCollapsed ? t("common.expand") : t("common.collapse")}
          >
            <PanelLeft
              className={cn("h-4 w-4 transition-transform", !isCollapsed && "rotate-180")}
            />
          </Button>

          <div className="flex items-center gap-3">
            <BrandLogo variant="icon" className="h-8 w-8 md:hidden" />
            {/* Page title */}
            {title && (
              <h1 className="hidden sm:block text-lg font-semibold text-foreground">
                {title}
              </h1>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
        
          <ThemeToggle />
       
          <Button onClick={toggleLang} variant="outline" size="sm">
            {language === "ar" ? "EN" : "عربي"}
          </Button>

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="glass"
                  size="sm"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserCircle className="h-5 w-5" />
                  </div>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-medium">{user.name || "Demo User"}</span>
                    <span className="text-xs text-muted-foreground">
                      {language === "ar"
                        ? user.role === "admin"
                          ? "مدير"
                          : user.role === "lawyer"
                          ? "محامٍ"
                          : "عميل"
                        : user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name || "Demo User"}</p>
                    <p className="text-xs text-muted-foreground">
                      {user?.email || "demo@avocat.law"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                  {language === "ar" ? "الملف الشخصي" : "Profile"}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                  {language === "ar" ? "الإعدادات" : "Settings"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                  {language === "ar" ? "تسجيل الخروج" : "Sign Out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};
