import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Dashboard Theme Colors
        dashboard: {
          1: {
            primary: "hsl(var(--dashboard-1-primary))",
            secondary: "hsl(var(--dashboard-1-secondary))",
            accent: "hsl(var(--dashboard-1-accent))",
          },
          2: {
            primary: "hsl(var(--dashboard-2-primary))",
            secondary: "hsl(var(--dashboard-2-secondary))",
            accent: "hsl(var(--dashboard-2-accent))",
          },
          3: {
            primary: "hsl(var(--dashboard-3-primary))",
            secondary: "hsl(var(--dashboard-3-secondary))",
            accent: "hsl(var(--dashboard-3-accent))",
          },
          4: {
            primary: "hsl(var(--dashboard-4-primary))",
            secondary: "hsl(var(--dashboard-4-secondary))",
            accent: "hsl(var(--dashboard-4-accent))",
          },
          5: {
            primary: "hsl(var(--dashboard-5-primary))",
            secondary: "hsl(var(--dashboard-5-secondary))",
            accent: "hsl(var(--dashboard-5-accent))",
          },
          6: {
            primary: "hsl(var(--dashboard-6-primary))",
            secondary: "hsl(var(--dashboard-6-secondary))",
            accent: "hsl(var(--dashboard-6-accent))",
          },
          7: {
            primary: "hsl(var(--dashboard-7-primary))",
            secondary: "hsl(var(--dashboard-7-secondary))",
            accent: "hsl(var(--dashboard-7-accent))",
          },
          8: {
            primary: "hsl(var(--dashboard-8-primary))",
            secondary: "hsl(var(--dashboard-8-secondary))",
            accent: "hsl(var(--dashboard-8-accent))",
          },
          9: {
            primary: "hsl(var(--dashboard-9-primary))",
            secondary: "hsl(var(--dashboard-9-secondary))",
            accent: "hsl(var(--dashboard-9-accent))",
          },
          10: {
            primary: "hsl(var(--dashboard-10-primary))",
            secondary: "hsl(var(--dashboard-10-secondary))",
            accent: "hsl(var(--dashboard-10-accent))",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "scale-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.9)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "bounce-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.3)",
          },
          "50%": {
            transform: "scale(1.1)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.6s ease-out",
        "scale-in": "scale-in 0.4s ease-out",
        "bounce-in": "bounce-in 0.6s ease-out",
      },
      backgroundImage: {
        "hero-gradient": "var(--gradient-hero)",
        "card-gradient": "var(--gradient-card)",
        "glass-gradient": "var(--gradient-glass)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        medium: "var(--shadow-medium)",
        strong: "var(--shadow-strong)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
