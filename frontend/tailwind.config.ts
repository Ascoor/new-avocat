import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
        border: "hsl(var(--color-border))",
        input: "hsl(var(--color-input))",
        ring: "hsl(var(--color-ring))",
        background: "hsl(var(--color-background))",
        foreground: "hsl(var(--color-foreground))",
        text: {
          strong: "hsl(var(--color-text-strong))",
          body: "hsl(var(--color-text-body))",
          muted: "hsl(var(--color-text-muted))",
          subtle: "hsl(var(--color-text-subtle))",
          inverse: "hsl(var(--color-text-inverse))",
        },
        primary: {
          DEFAULT: "hsl(var(--color-primary))",
          foreground: "hsl(var(--color-primary-foreground))",
          hover: "hsl(var(--color-primary-hover))",
        },
        secondary: {
          DEFAULT: "hsl(var(--color-secondary))",
          foreground: "hsl(var(--color-secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--color-accent))",
          foreground: "hsl(var(--color-accent-foreground))",
          glow: "hsl(var(--color-accent-glow))",
        },
        muted: {
          DEFAULT: "hsl(var(--color-muted))",
          foreground: "hsl(var(--color-muted-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--color-success))",
          foreground: "hsl(var(--color-success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--color-warning))",
          foreground: "hsl(var(--color-warning-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--color-destructive))",
          foreground: "hsl(var(--color-destructive-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--color-sidebar-background))",
          foreground: "hsl(var(--color-sidebar-foreground))",
          accent: "hsl(var(--color-sidebar-accent))",
          "accent-foreground": "hsl(var(--color-sidebar-accent-foreground))",
          primary: "hsl(var(--color-sidebar-primary))",
          "primary-foreground": "hsl(var(--color-sidebar-primary-foreground))",
          border: "hsl(var(--color-sidebar-border))",
          ring: "hsl(var(--color-sidebar-ring))",
        },
        header: {
          DEFAULT: "hsl(var(--color-header-background))",
          foreground: "hsl(var(--color-header-foreground))",
          muted: "hsl(var(--color-header-muted))",
          border: "hsl(var(--color-header-border))",
          ring: "hsl(var(--color-header-ring))",
          "ring-offset": "hsl(var(--color-header-ring-offset))",
          button: "hsl(var(--color-header-button))",
          "button-foreground": "hsl(var(--color-header-button-foreground))",
          "button-hover": "hsl(var(--color-header-button-hover))",
          "button-hover-foreground": "hsl(var(--color-header-button-hover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--color-card))",
          foreground: "hsl(var(--color-card-foreground))",
        },
        layer: {
          base: "hsl(var(--surface-layer-base))",
          subtle: "hsl(var(--surface-layer-subtle))",
          card: "hsl(var(--surface-layer-card))",
          popover: "hsl(var(--surface-layer-popover))",
          overlay: "hsl(var(--surface-layer-overlay))",
        },
        hero: {
          overlay: {
            light: "var(--color-hero-overlay-light)",
            dark: "var(--color-hero-overlay-dark)",
          },
        },
        glass: {
          DEFAULT: "var(--surface-glass)",
          border: "var(--border-glass)",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        elegant: "var(--shadow-elegant)",
        glow: "var(--shadow-glow)",
        glass: "var(--shadow-glass)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        elegant: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-hero": "var(--gradient-hero)",
        "gradient-accent": "var(--gradient-accent)",
        "gradient-success": "var(--gradient-success)",
        "gradient-warning": "var(--gradient-warning)",
        "gradient-card": "var(--gradient-card)",
        "gradient-header": "var(--gradient-header)",
        "gradient-sidebar": "var(--gradient-sidebar)",
        "gradient-glass": "var(--gradient-glass)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        tilt: {
          "0%, 100%": { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(-1deg) scale(1.02)" },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 0px hsl(var(--accent) / 0)",
          },
          "50%": {
            boxShadow: "0 0 25px hsl(var(--accent-glow))",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-smooth both",
        fadeInUp: "fadeInUp 0.6s ease-elegant both",
        fadeInDown: "fadeInDown 0.6s ease-elegant both",
        float: "float 3s ease-in-out infinite",
        tilt: "tilt 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 2s ease-in-out infinite",
      },
      scale: {
        98: "0.98",
        102: "1.02",
        103: "1.03",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
