import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const withOpacityValue = (variable: string) => {
  return ({ opacityValue }: { opacityValue?: string }) => {
    if (opacityValue === undefined) {
      return `hsl(var(${variable}))`;
    }
    return `hsl(var(${variable}) / ${opacityValue})`;
  };
};

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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: withOpacityValue("--border"),
        input: withOpacityValue("--input"),
        ring: withOpacityValue("--ring"),
        background: withOpacityValue("--background"),
        foreground: withOpacityValue("--foreground"),
        primary: {
          DEFAULT: withOpacityValue("--primary"),
          foreground: withOpacityValue("--primary-foreground"),
          light: withOpacityValue("--primary-light"),
          glow: withOpacityValue("--primary-glow"),
          hover: withOpacityValue("--primary-hover"),
        },
        secondary: {
          DEFAULT: withOpacityValue("--secondary"),
          foreground: withOpacityValue("--secondary-foreground"),
          dark: withOpacityValue("--secondary-dark"),
        },
        destructive: {
          DEFAULT: withOpacityValue("--destructive"),
          foreground: withOpacityValue("--destructive-foreground"),
        },
        muted: {
          DEFAULT: withOpacityValue("--muted"),
          foreground: withOpacityValue("--muted-foreground"),
          dark: withOpacityValue("--muted-dark"),
        },
        accent: {
          DEFAULT: withOpacityValue("--accent"),
          foreground: withOpacityValue("--accent-foreground"),
          soft: withOpacityValue("--accent-soft"),
          glow: withOpacityValue("--accent-glow"),
        },
        popover: {
          DEFAULT: withOpacityValue("--popover"),
          foreground: withOpacityValue("--popover-foreground"),
        },
        card: {
          DEFAULT: withOpacityValue("--card"),
          foreground: withOpacityValue("--card-foreground"),
          elevated: withOpacityValue("--card-elevated"),
        },
        text: {
          strong: withOpacityValue("--text-strong"),
          muted: withOpacityValue("--text-muted"),
          body: withOpacityValue("--text-body"),
          inverse: withOpacityValue("--text-inverse"),
        },
        surface: {
          muted: withOpacityValue("--surface-muted"),
          highlight: withOpacityValue("--surface-highlight"),
        },
        success: {
          DEFAULT: withOpacityValue("--success"),
          foreground: withOpacityValue("--success-foreground"),
          soft: withOpacityValue("--success-soft"),
        },
        warning: {
          DEFAULT: withOpacityValue("--warning"),
          foreground: withOpacityValue("--warning-foreground"),
          soft: withOpacityValue("--warning-soft"),
        },
        sidebar: {
          DEFAULT: withOpacityValue("--sidebar-background"),
          foreground: withOpacityValue("--sidebar-foreground"),
          primary: {
            DEFAULT: withOpacityValue("--sidebar-primary"),
            foreground: withOpacityValue("--sidebar-primary-foreground"),
          },
          accent: {
            DEFAULT: withOpacityValue("--sidebar-accent"),
            foreground: withOpacityValue("--sidebar-accent-foreground"),
          },
          muted: {
            DEFAULT: withOpacityValue("--sidebar-muted"),
            foreground: withOpacityValue("--sidebar-muted-foreground"),
          },
          border: withOpacityValue("--sidebar-border"),
          ring: withOpacityValue("--sidebar-ring"),
          item: "var(--sidebar-item-bg)",
          surface: "var(--sidebar-surface)",
          highlight: "var(--sidebar-hover-highlight)",
          text: {
            strong: "var(--sidebar-text-strong)",
            muted: "var(--sidebar-text-muted)",
          },
          icon: {
            active: "var(--sidebar-icon-active)",
            muted: "var(--sidebar-icon-muted)",
          },
        },
        chart: {
          datasetA: "var(--color-datasetA)",
          datasetB: "var(--color-datasetB)",
          datasetC: "var(--color-datasetC)",
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Amiri', 'serif'],
        display: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-secondary': 'var(--gradient-secondary)',
        'gradient-gold': 'var(--gradient-gold)',
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-success': 'var(--gradient-success)',
        'gradient-card': 'var(--gradient-card)',
        'gradient-aurora': 'var(--gradient-aurora)',
      },
      boxShadow: {
        'premium': 'var(--shadow-premium)',
        'gold': 'var(--shadow-gold)',
        'elevated': 'var(--shadow-elevated)',
        'ambient': 'var(--shadow-ambient)',
        'glow': 'var(--shadow-glow)',
        'glow-strong': 'var(--shadow-glow-strong)',
        'inner-glow': 'var(--shadow-inner-glow)',
        'sidebar-active': 'var(--sidebar-active-glow)',
        'sidebar-hover': 'var(--sidebar-hover-glow)',
        'sidebar-shell': 'var(--sidebar-shell-shadow)',
      },
      transitionDuration: {
        premium: '400ms',
        smooth: '300ms',
        elegant: '450ms',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        elegant: 'cubic-bezier(0.23, 1, 0.32, 1)',
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
            transform: "translateY(20px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "slide-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(40px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "scale-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)"
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)"
          }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        "glow": {
          "0%": { 
            boxShadow: "0 0 20px hsl(var(--accent) / 0.3)"
          },
          "100%": { 
            boxShadow: "0 0 30px hsl(var(--accent) / 0.5), 0 0 40px hsl(var(--accent) / 0.2)"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-up": "slide-up 0.6s ease-out",
        "scale-in": "scale-in 0.4s ease-out",
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [animate],
};

export default config;
