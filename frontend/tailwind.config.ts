import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        text: {
          strong: "hsl(var(--text-strong))",
          body: "hsl(var(--text-body))",
          muted: "hsl(var(--text-muted))",
          subtle: "hsl(var(--text-subtle))",
          inverse: "hsl(var(--text-inverse))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          glow: "hsl(var(--accent-glow))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
        },
        header: {
          DEFAULT: "hsl(var(--header-background))",
          foreground: "hsl(var(--header-foreground))",
          muted: "hsl(var(--header-muted))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        layer: {
          base: "hsl(var(--layer-base))",
          subtle: "hsl(var(--layer-subtle))",
          card: "hsl(var(--layer-card))",
          popover: "hsl(var(--layer-popover))",
          overlay: "hsl(var(--layer-overlay))",
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
        bounce: "cubic-bezier(0.68,-0.55,0.265,1.55)",
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-hero": "var(--gradient-hero)",
        "gradient-card": "var(--gradient-card)",
        "gradient-header": "var(--gradient-header)",
        "gradient-sidebar": "var(--gradient-sidebar)",
        "gradient-glass": "var(--gradient-glass)",
      },
      scale: {
        sm: "var(--transform-scale-sm)",
        md: "var(--transform-scale-md)",
        tilt: "var(--transform-tilt)",
      },
    keyframes: {
  fadeInUp: {
    "0%": { opacity: "0", transform: "translateY(20px)" },
    "100%": { opacity: "1", transform: "translateY(0)" },
  },
  fadeInDown: {
    "0%": { opacity: "0", transform: "translateY(-20px)" },
    "100%": { opacity: "1", transform: "translateY(0)" },
  },
  tilt: {
    "0%, 100%": { transform: "rotate(0) scale(1)" },
    "50%": { transform: "var(--transform-tilt)" },
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
  fadeIn: "fadeIn 0.5s var(--transition-smooth)",
  fadeInUp: "fadeInUp 0.6s var(--transition-elegant)",
  fadeInDown: "fadeInDown 0.6s var(--transition-elegant)",
  float: "float 3s ease-in-out infinite",
  tilt: "tilt 4s var(--transition-bounce) infinite",
  pulseGlow: "pulseGlow 2s ease-in-out infinite",
},

    },
  },
  plugins: [animate],
} satisfies Config;
