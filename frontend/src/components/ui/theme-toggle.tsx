import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "./button";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      variant={isDark ? "glass" : "outline"}
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to Light" : "Switch to Dark"}
      className={`transition-all duration-300 rounded-full ${
        isDark
          ? "border-white/40 text-white hover:bg-white/10"
          : "border-border text-foreground hover:bg-muted/40"
      }`}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
};

export default ThemeToggle;
