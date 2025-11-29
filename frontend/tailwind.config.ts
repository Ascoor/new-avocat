import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
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
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        xs: "420px",
        "3xl": "1920px",
      },
      colors: {
        surface: {
          DEFAULT: "hsl(var(--surface))",
          raised: "hsl(var(--surface-raised))",
          overlay: "hsl(var(--surface-overlay))",
          elevated: "hsl(var(--card-elevated))",
          highlight: "hsl(var(--surface-highlight))",
        },
        brand: {
          primary: "hsl(var(--brand-primary))",
          on: "hsl(var(--brand-on))",
          subtle: "hsl(var(--brand-subtle))",
        },
        neutral: {
          50: "hsl(var(--neutral-50))",
          100: "hsl(var(--neutral-100))",
          700: "hsl(var(--neutral-700))",
          900: "hsl(var(--neutral-900))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        sidebar: {
          background: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          border: "hsl(var(--sidebar-border))",
          primary: "hsl(var(--sidebar-primary))",
          primaryForeground: "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          accentForeground: "hsl(var(--sidebar-accent-foreground))",
          ring: "hsl(var(--sidebar-ring))",
          textMuted: "hsl(var(--sidebar-text-muted))",
          hoverForeground: "hsl(var(--sidebar-hover-foreground))",
          hoverHighlight: "hsl(var(--sidebar-hover-highlight))",
          itemHoverBg: "hsl(var(--sidebar-item-hover-bg))",
          itemActiveBg: "hsl(var(--sidebar-item-active-bg))",
          subitemHoverBg: "hsl(var(--sidebar-subitem-hover-bg))",
          subitemActiveBg: "hsl(var(--sidebar-subitem-active-bg))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: "hsl(var(--legal-success-500))",
        warning: "hsl(var(--legal-warning-500))",
        info: "hsl(var(--legal-primary-500))",
        danger: "hsl(var(--legal-danger-500))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          mint: "hsl(var(--accent-mint))",
          amber: "hsl(var(--accent-amber))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        gold: {
          DEFAULT: "hsl(var(--gold))",
          muted: "hsl(var(--gold-muted))",
          light: "hsl(var(--gold-light))",
        },
        exclusive: {
          DEFAULT: "hsl(var(--exclusive))",
          muted: "hsl(var(--exclusive-muted))",
          foreground: "hsl(var(--exclusive-foreground))",
          glow: "hsl(var(--exclusive-glow))",
        },
        neon: {
          DEFAULT: "hsl(var(--neon))",
          glow: "hsl(var(--neon-glow))",
          muted: "hsl(var(--neon-muted))",
        },
        slate: {
          DEFAULT: "hsl(var(--slate))",
          light: "hsl(var(--slate-light))",
          bg: "hsl(var(--slate-bg))",
        },
        legal: {
          primary: {
            300: "hsl(var(--legal-primary-300))",
            500: "hsl(var(--legal-primary-500))",
            700: "hsl(var(--legal-primary-700))",
          },
          neutral: {
            100: "hsl(var(--legal-neutral-100))",
            300: "hsl(var(--legal-neutral-300))",
            500: "hsl(var(--legal-neutral-500))",
            700: "hsl(var(--legal-neutral-700))",
            900: "hsl(var(--legal-neutral-900))",
          },
          success: {
            500: "hsl(var(--legal-success-500))",
          },
          warning: {
            500: "hsl(var(--legal-warning-500))",
          },
          danger: {
            500: "hsl(var(--legal-danger-500))",
          },
        },
      },
      backgroundImage: {
        "gradient-hero": "var(--gradient-hero)",
        "gradient-gold": "var(--gradient-gold)",
        "gradient-card": "var(--gradient-card)",
        "gradient-exclusive": "var(--gradient-exclusive)",
        "gradient-neon": "var(--gradient-neon)",
        "gradient-header-surface": "var(--header-surface-gradient)",
        "gradient-primary": "var(--gradient-primary)",
        "gradient-subtle": "var(--gradient-subtle)",
        "gradient-secondary": "var(--gradient-secondary)",
        "gradient-success": "linear-gradient(135deg, hsl(var(--legal-success-500)) 0%, hsl(var(--accent-mint)) 100%)",
        "gradient-accent": "linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--accent-amber)) 100%)",
        "gradient-warning": "linear-gradient(135deg, hsl(var(--legal-warning-500)) 0%, hsl(var(--gold)) 100%)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
        gold: "var(--shadow-gold)",
        neon: "var(--shadow-neon)",
        card: "var(--shadow-card)",
        elegant: "var(--shadow-elegant)",
        luxury: "var(--shadow-luxury)",
        ambient: "0 18px 48px -18px hsl(var(--foreground) / 0.25)",
        glow: "0 15px 45px -12px hsl(var(--neon) / 0.45)",
        "glow-strong": "0 25px 60px -18px hsl(var(--neon) / 0.55)",
        "legal-icon-soft": "var(--legal-icon-shadow-soft)",
        "legal-icon-hero": "var(--legal-icon-shadow-hero)",
        "sidebar-item": "var(--sidebar-item-active-shadow)",
        "sidebar-subitem": "var(--sidebar-subitem-shadow)",
        "sidebar-glass": "var(--sidebar-glass-shadow)",
        "sidebar-shell": "var(--sidebar-shell-shadow)",
        "header-glass": "var(--header-glass-shadow)",
        "header-shell": "var(--header-shell-shadow)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        comfort: "cubic-bezier(0.32, 0.72, 0, 1)",
        elegant: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      transitionDuration: {
        base: "200ms",
        long: "320ms",
      },
      fontFamily: {
        cairo: ["Cairo", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "footer-glow": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.8" },
        },
        "footer-marquee": {
          "0%": { transform: "translateX(-35%)" },
          "100%": { transform: "translateX(35%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-in-right": "slide-in-right 0.5s ease-out",
        "scale-in": "scale-in 0.4s ease-out",
        float: "float 6s ease-in-out infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        bounce: "bounce 1s infinite",
        "footer-glow": "footer-glow 4.5s ease-in-out infinite",
        "footer-marquee": "footer-marquee 12s linear infinite",
      },
    },
  },
  plugins: [animate],
};

export default config;
