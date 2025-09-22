import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        cairo: ["Cairo", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        background: "hsl(var(--color-background))",
        foreground: "hsl(var(--color-foreground))",
        surface: {
          DEFAULT: "hsl(var(--color-surface))",
          muted: "hsl(var(--color-surface-muted))",
          highlight: "hsl(var(--color-surface-highlight))",
        },
        text: {
          strong: "hsl(var(--color-text-strong))",
          body: "hsl(var(--color-text-body))",
          muted: "hsl(var(--color-text-muted))",
          subtle: "hsl(var(--color-text-subtle))",
          inverse: "hsl(var(--color-text-inverse))",
        },
        primary: {
          DEFAULT: "hsl(var(--color-primary))",
          hover: "hsl(var(--color-primary-hover))",
          foreground: "hsl(var(--color-primary-foreground))",
          soft: "hsl(var(--color-primary-soft))",
        },
        accent: {
          DEFAULT: "hsl(var(--color-accent))",
          foreground: "hsl(var(--color-accent-foreground))",
          soft: "hsl(var(--color-accent-soft))",
          glow: "hsl(var(--color-accent-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--color-secondary))",
          foreground: "hsl(var(--color-secondary-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--color-success))",
          foreground: "hsl(var(--color-success-foreground))",
          soft: "hsl(var(--color-success-soft))",
        },
        warning: {
          DEFAULT: "hsl(var(--color-warning))",
          foreground: "hsl(var(--color-warning-foreground))",
          soft: "hsl(var(--color-warning-soft))",
        },
        destructive: {
          DEFAULT: "hsl(var(--color-destructive))",
          foreground: "hsl(var(--color-destructive-foreground))",
          soft: "hsl(var(--color-destructive-soft))",
        },
        card: {
          DEFAULT: "hsl(var(--color-card))",
          foreground: "hsl(var(--color-card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--color-popover))",
          foreground: "hsl(var(--color-popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--color-surface-muted))",
          foreground: "hsl(var(--color-text-muted))",
        },
        border: "hsl(var(--color-border))",
        input: "hsl(var(--color-input))",
        ring: "hsl(var(--color-ring))",
        sidebar: {
          background: "hsl(var(--color-sidebar-background))",
          foreground: "hsl(var(--color-sidebar-foreground))",
          primary: "hsl(var(--color-sidebar-primary))",
          "primary-foreground": "hsl(var(--color-sidebar-primary-foreground))",
          accent: "hsl(var(--color-sidebar-accent))",
          "accent-foreground": "hsl(var(--color-sidebar-accent-foreground))",
          border: "hsl(var(--color-sidebar-border))",
          ring: "hsl(var(--color-sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        glow: "var(--shadow-glow)",
        ambient: "var(--shadow-ambient)",
        "inner-glow": "var(--shadow-inner)",
        "focus-ring": "var(--shadow-focus)",
        "glow-strong": "var(--shadow-glow-strong)",
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-hero": "var(--gradient-hero)",
        "gradient-card": "var(--gradient-card)",
        "gradient-glass": "var(--gradient-glass)",
        "gradient-success": "var(--gradient-success)",
        "gradient-accent": "var(--gradient-accent)",
        "gradient-warning": "var(--gradient-warning)",
        "hero-overlay-light": "var(--gradient-hero-overlay-light)",
        "hero-overlay-dark": "var(--gradient-hero-overlay-dark)",
        "card-highlight": "var(--gradient-card-highlight)",
        "gradient-aurora": "var(--gradient-aurora)",
        "gradient-ambient": "var(--gradient-ambient)",
        "gradient-midnight": "var(--gradient-midnight)",
      },
      backgroundSize: {
        aurora: "200% 200%",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translate3d(0, 18px, 0)" },
          to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
        fadeInDown: {
          from: { opacity: "0", transform: "translate3d(0, -16px, 0)" },
          to: { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 hsl(var(--color-accent-glow))" },
          "50%": { boxShadow: "0 0 35px 10px hsl(var(--color-accent-glow))" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        aurora: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.5", transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { opacity: "1", transform: "translate3d(0, -8px, 0) scale(1.02)" },
        },
        slowSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-out both",
        fadeInUp: "fadeInUp 0.6s cubic-bezier(0.33, 1, 0.68, 1) both",
        fadeInDown: "fadeInDown 0.6s cubic-bezier(0.33, 1, 0.68, 1) both",
        pulseGlow: "pulseGlow 2.4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        aurora: "aurora 16s ease-in-out infinite",
        glowPulse: "glowPulse 8s ease-in-out infinite",
        slowSpin: "slowSpin 28s linear infinite",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        elegant: "cubic-bezier(0.33, 1, 0.68, 1)",
      },
      scale: {
        102: "1.02",
        103: "1.03",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
