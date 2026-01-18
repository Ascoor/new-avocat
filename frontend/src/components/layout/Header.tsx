import React from "react";
import { Menu, UserCircle, Settings, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import BrandLogo from "@/components/common/BrandLogo";

interface HeaderProps {
  onMobileMenuOpen: () => void;
  sidebarCollapsed: boolean;
  title?: string;
  className?: string;
}

const SIDEBAR_W = 280;
const SIDEBAR_W_COLLAPSED = 80;

export function Header({ onMobileMenuOpen, sidebarCollapsed, title, className }: HeaderProps) {
  const { language, setLanguage, t, direction } = useLanguage();
  const { user, logout } = useAuth();

  const isRTL = direction === "rtl";
  const desktopOffset = sidebarCollapsed ? SIDEBAR_W_COLLAPSED : SIDEBAR_W;

  // header fixed مثل القديم: يتزحزح حسب sidebar + RTL
  const offsetClasses = isRTL
    ? `left-0 right-0 md:right-[${desktopOffset}px]`
    : `left-0 right-0 md:left-[${desktopOffset}px]`;

  const toggleLang = () => setLanguage(language === "ar" ? "en" : "ar");

  return (
    <header
      dir={direction}
      className={cn(
        "fixed top-0 z-40 h-16",
        offsetClasses,
        "border-b border-border bg-[hsl(var(--surface-raised)/0.78)] backdrop-blur-xl",
        "shadow-[var(--shadow-sm)] transition-all duration-300",
        className
      )}
    >
      <div className="flex h-full w-full items-center justify-between px-3 sm:px-4 lg:px-6">
        {/* Left */}
        <div className={cn("flex items-center gap-3", isRTL ? "flex-row-reverse" : "flex-row")}>
          {/* Mobile menu */}
          <Button
            variant="glass"
            size="icon"
            onClick={onMobileMenuOpen}
            className={cn(
              "h-9 w-9 rounded-full border border-border/80 md:hidden",
              "text-foreground/80 transition-all duration-200",
              "hover:-translate-y-0.5 hover:bg-[hsl(var(--brand-primary)/0.10)] hover:text-[hsl(var(--brand-primary))]"
            )}
            aria-label={t?.("common.menu") ?? "Menu"}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-3">
            <BrandLogo variant="icon" className="h-8 w-8 md:hidden" lang={language} />
            {title ? (
              <h1 className="hidden text-base font-semibold text-foreground sm:block">{title}</h1>
            ) : null}
          </div>
        </div>

        {/* Right */}
        <div className={cn("flex items-center gap-2 sm:gap-3", isRTL ? "flex-row-reverse" : "flex-row")}> 
          <ThemeToggle />

          <Button
            onClick={toggleLang}
            variant="outline"
            size="sm"
            className={cn(
              "rounded-full border border-border/70 px-3 py-2 text-sm font-medium",
              "transition-all duration-200",
              "hover:-translate-y-0.5 hover:bg-[hsl(var(--brand-primary)/0.10)] hover:text-[hsl(var(--brand-primary))]"
            )}
            aria-label={language === "ar" ? "Switch to English" : "التبديل إلى العربية"}
          >
            {language === "ar" ? "EN" : "عربي"}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="glass"
                  size="sm"
                  className={cn(
                    "flex items-center gap-2 rounded-full border border-border/80",
                    "text-foreground/80 transition-all duration-200",
                    "hover:-translate-y-0.5 hover:bg-[hsl(var(--brand-primary)/0.10)] hover:text-[hsl(var(--brand-primary))]"
                  )}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsl(var(--brand-primary)/0.10)] text-[hsl(var(--brand-primary))]">
                    <UserCircle className="h-5 w-5" />
                  </div>
                  <div className="hidden flex-col items-start md:flex">
                    <span className="text-sm font-medium text-foreground">
                      {user.name || (language === "ar" ? "مستخدم" : "User")}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {language === "ar"
                        ? user.role === "admin"
                          ? "مدير"
                          : user.role === "lawyer"
                          ? "محامٍ"
                          : "عميل"
                        : user.role}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name || "User"}</p>
                    <p className="text-xs text-muted-foreground">{user.email || "user@avocat.law"}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className={cn("h-4 w-4", isRTL ? "ml-2" : "mr-2")} />
                  {language === "ar" ? "الملف الشخصي" : "Profile"}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className={cn("h-4 w-4", isRTL ? "ml-2" : "mr-2")} />
                  {language === "ar" ? "الإعدادات" : "Settings"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={logout}>
                  <LogOut className={cn("h-4 w-4", isRTL ? "ml-2" : "mr-2")} />
                  {language === "ar" ? "تسجيل الخروج" : "Sign Out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
      </div>
    </header>
  );
}
