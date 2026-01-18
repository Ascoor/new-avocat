import React from "react";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

import type { ButtonProps } from "./button";
import { Button } from "./button";

export type ThemeToggleTone = "hero" | "dark" | "light";

export const themeToggleToneVariantMap: Record<ThemeToggleTone, ButtonProps["variant"]> = {
  hero: "glass",
  dark: "glass",
  light: "outline",
};

export const themeToggleToneClassMap: Record<ThemeToggleTone, string> = {
  hero: "border-[hsl(var(--nav-border))] text-[hsl(var(--navbar-link-hero))] hover:bg-[hsl(var(--nav-bg-top))] shadow-[var(--shadow-lg)] ring-1 ring-[hsl(var(--nav-border))]",
  dark: "border-[hsl(var(--nav-border))] text-[hsl(var(--navbar-link-hero))] hover:bg-[hsl(var(--nav-bg-top))]",
  light: "border-border text-foreground hover:bg-[hsl(var(--muted))]",
};

interface ThemeToggleProps {
  tone?: ThemeToggleTone;
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ tone, className }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const resolvedTone: ThemeToggleTone = tone ?? (isDark ? "dark" : "light");
  const variant = themeToggleToneVariantMap[resolvedTone];
  const toneClasses = themeToggleToneClassMap[resolvedTone];

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to Light" : "Switch to Dark"}
      className={cn(
        "rounded-full transition-all duration-300",
        toneClasses,
        className,
      )}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-[hsl(var(--gold))]" />
      ) : (
        <Moon className="h-4 w-4 text-[hsl(var(--primary))]" />
      )}
    </Button>
  );
};

export default ThemeToggle;
