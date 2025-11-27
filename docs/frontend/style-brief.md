# Avocat / Elections360 dashboard style brief

Use this prompt as a system-level design guide for any UI component in the legal dashboard. It codifies the intended look-and-feel and ships ready-to-copy CSS/Tailwind snippets.

## Design prompt (ready to paste)
صمّم واجهة لوحة تحكم (Dashboard) لمكتب محاماة / نظام قانوني باسم Avocat أو Elections360، بأسلوب حديث، راقي، وهادئ.

استخدم نظام ألوان مبني على:

- الخلفية: درجات رمادي-أزرق هادئة (HSL tokens: --surface, --surface-raised, --surface-overlay).
- اللون الأساسي للعلامة: أزرق قانوني داكن (navy) --brand-primary، مع نص فاتح --brand-on.
- لون ذهبي فاخر للعناصر المميزة والـ badges (--gold, --gold-light, --gold-muted).
- ألوان حالة واضحة: success (--success)، warning (--warning), danger (--destructive), info (--info).

التعامل مع الحواف والظلال:

- حواف العناصر الصغيرة (أزرار، حقول): --radius (~0.75rem).
- الكروت والبانلز: --radius-xl و --radius-2xl.
- ظلال الكروت: --shadow-card.
- ظلال البنرات/hero: --shadow-elegant أو --shadow-luxury.

الشريط الجانبي:

- خلفية أغمق من الخلفية العامة: --surface-overlay.
- حدود رفيعة: --border.
- أيقونات داخل حاوية مربعة بحواف خفيفة، ألوانها من legal icon palette (--legal-primary-*، --legal-neutral-*), مع ظل --legal-icon-shadow-soft.

الشريط العلوي (Header):

- ثابت أعلى الصفحة، بخلفية نصف شفافة من --surface-raised مع backdrop-blur.
- يتناسق بصرياً مع الشريط الجانبي (نفس الـ border/shadow تقريباً).

الكروت (Cards / Panels):

- خلفية --card.
- حدود خفيفة من --border.
- ظل بسيط من --shadow-card.
- Spacing داخلي 16–24px على الأقل.

دعم RTL/LTR:

- عند `dir="rtl"` استخدم خط Cairo ثم Inter.
- عند `dir="ltr"` استخدم Inter ثم Cairo.
- احرص أن تكون اتجاهات الـ flex والـ alignment متوافقة مع isRTL.

الأنيميشن:

- حركات خفيفة على hover: translateY(-2px) وظل أقوى قليلاً.
- استخدم transitions مثل: --transition-elegant و --transition-smooth.

التصميم متجاوب:

- الموبايل: Sidebar يختفي ويظهر كـ MobileDrawer، والـ Header يبقى بسيط وخفيف.
- سطح المكتب: Sidebar ثابت مع عرض متغير (collapsed/expanded)، والمحتوى يتحرك من نفس الجانب فقط (margin-left أو margin-right حسب اللغة).

## CSS tokens (drop into `src/styles/theme-tokens.css`)
Include these tokens so Tailwind utility classes map to the design prompt:

```css
@layer base {
  :root {
    /* Surfaces (Light) */
    --surface: 220 26% 99%;
    --surface-raised: 220 24% 96%;
    --surface-overlay: 220 30% 95%;
    --card-elevated: 220 24% 98%;

    /* Brand (Light) */
    --brand-primary: 222 65% 22%;
    --brand-on: 210 100% 98%;
    --brand-subtle: 222 55% 32%;

    /* Accent tones */
    --accent-mint: 164 73% 55%;
    --accent-amber: 36 92% 58%;

    /* Neutrals */
    --neutral-50: 210 30% 98%;
    --neutral-100: 220 25% 94%;
    --neutral-700: 215 16% 35%;
    --neutral-900: 219 28% 12%;

    /* Radii */
    --radius: 0.75rem;
    --radius-xl: 1rem;
    --radius-2xl: 1.25rem;

    /* Semantic Colors (light) */
    --background: var(--surface);
    --foreground: 220 60% 15%;

    --card: var(--surface-raised);
    --card-foreground: 220 60% 15%;

    --popover: var(--surface-raised);
    --popover-foreground: 220 60% 15%;

    --secondary: 220 20% 96%;
    --secondary-foreground: 220 60% 15%;

    --muted: 220 20% 96%;
    --muted-foreground: 220 15% 40%;

    --accent: 45 100% 97%;
    --accent-foreground: 220 60% 15%;

    --border: 220 25% 88%;
    --input: 220 25% 92%;
    --ring: 222 65% 22%;

    --destructive: 0 72% 51%;
    --destructive-foreground: 0 0% 100%;

    --success: 142 71% 45%;
    --success-foreground: 0 0% 100%;

    --warning: 38 92% 50%;
    --warning-foreground: 0 0% 100%;

    --info: 199 89% 48%;
    --info-foreground: 0 0% 100%;

    /* Accent families */
    --primary: var(--brand-primary);
    --primary-foreground: var(--brand-on);
    --primary-glow: 222 55% 32%;

    --neon: 182 100% 72%;
    --neon-glow: 182 100% 78%;
    --neon-muted: 182 70% 90%;

    --gold: 45 100% 50%;
    --gold-muted: 45 65% 45%;
    --gold-light: 45 100% 97%;

    --exclusive: 265 83% 62%;
    --exclusive-muted: 265 70% 52%;
    --exclusive-foreground: 218 43% 12%;
    --exclusive-glow: 265 95% 72%;

    --slate: 220 15% 30%;
    --slate-light: 220 10% 55%;
    --slate-bg: 220 20% 98%;

    /* Generic shadows */
    --shadow-luxury: 0 25px 50px -12px hsl(var(--neutral-900) / 0.22);
    --shadow-gold: 0 10px 30px -10px hsl(var(--accent-amber) / 0.35);
    --shadow-card: 0 6px 18px -10px hsl(var(--neutral-900) / 0.12);
    --shadow-elegant: 0 12px 32px -12px hsl(var(--neutral-900) / 0.18);

    /* Transitions */
    --transition-elegant: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    --transition-smooth: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-bounce: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);

    /* Title glow helpers */
    --title-color-light: 215 80% 22%;
    --title-color-dark: 215 100% 88%;
    --title-glow-dark: 175 220 255;
    --glow-intensity: 0.65;
  }

  .dark {
    /* Surfaces (Dark) */
    --surface: 220 25% 10%;
    --surface-raised: 220 28% 14%;
    --surface-overlay: 220 35% 18%;
    --card-elevated: 220 32% 20%;

    /* Brand (Dark) */
    --brand-primary: 222 65% 72%;
    --brand-on: 220 35% 10%;
    --brand-subtle: 222 55% 62%;

    --accent-mint: 164 73% 55%;
    --accent-amber: 36 92% 58%;

    --neutral-50: 220 18% 16%;
    --neutral-100: 220 16% 22%;
    --neutral-700: 216 18% 70%;
    --neutral-900: 0 0% 0%;

    --background: var(--surface);
    --foreground: 200 20% 95%;

    --card: var(--surface-raised);
    --card-foreground: 200 20% 95%;

    --popover: var(--surface-raised);
    --popover-foreground: 200 20% 95%;

    --primary: var(--brand-primary);
    --primary-foreground: var(--brand-on);
    --primary-glow: 45 100% 65%;

    --neon: 182 100% 74%;
    --neon-glow: 182 100% 82%;
    --neon-muted: 182 60% 26%;

    --secondary: 220 30% 15%;
    --secondary-foreground: 200 20% 95%;

    --muted: 220 30% 15%;
    --muted-foreground: 200 15% 65%;

    --accent: 200 70% 50%;
    --accent-foreground: 220 60% 10%;

    --border: 220 30% 20%;
    --input: 220 30% 18%;
    --ring: 45 100% 55%;

    --destructive: 0 62% 50%;
    --destructive-foreground: 0 0% 100%;

    --success: 142 71% 45%;
    --success-foreground: 0 0% 100%;

    --warning: 38 92% 50%;
    --warning-foreground: 0 0% 100%;

    --info: 199 89% 48%;
    --info-foreground: 0 0% 100%;

    --gold: 45 100% 55%;
    --gold-muted: 45 80% 50%;
    --gold-light: 45 100% 15%;

    --exclusive: 265 85% 68%;
    --exclusive-muted: 265 65% 46%;
    --exclusive-foreground: 0 0% 100%;
    --exclusive-glow: 265 95% 78%;

    --slate: 220 15% 70%;
    --slate-light: 220 10% 55%;
    --slate-bg: 220 35% 12%;

    --shadow-luxury: 0 25px 50px -12px hsl(var(--neutral-900) / 0.5);
    --shadow-gold: 0 10px 30px -10px hsl(var(--accent-amber) / 0.4);
    --shadow-card: 0 6px 18px -10px hsl(var(--neutral-900) / 0.28);
    --shadow-elegant: 0 12px 32px -12px hsl(var(--neutral-900) / 0.32);
  }

  /* RTL & LTR fonts */
  [dir="rtl"] {
    font-family: "Cairo", "Inter", sans-serif;
  }

  [dir="ltr"] {
    font-family: "Inter", "Cairo", sans-serif;
  }

  html {
    transition: var(--transition-smooth);
  }
}

/* Legal icon palette */
:root {
  --legal-neutral-900: #0F1724;
  --legal-neutral-700: #1B2742;
  --legal-neutral-500: #314063;
  --legal-neutral-300: #A0AEC0;
  --legal-neutral-100: #F7F9FB;

  --legal-primary-700: #2C3E9F;
  --legal-primary-500: #4053B8;
  --legal-primary-300: #7D8EE0;

  --legal-success-500: #0F9D58;
  --legal-warning-500: #F59E0B;
  --legal-danger-500: #E04444;

  --legal-icon-stroke-24: 1.5px;
  --legal-icon-corner-inner: 2px;
  --legal-icon-corner-outer: 3px;
  --legal-icon-shadow-soft: 0 16px 32px rgba(17, 24, 39, 0.18);
  --legal-icon-shadow-hero: 0 24px 48px rgba(15, 23, 36, 0.28);
}

[data-theme="dark"] {
  --legal-neutral-900: #F7F9FB;
  --legal-neutral-700: #CBD5F0;
  --legal-neutral-500: #8EA0C5;
  --legal-neutral-300: #536282;
  --legal-neutral-100: #0B1220;

  --legal-primary-700: #9FB0FF;
  --legal-primary-500: #8192F5;
  --legal-primary-300: #5D6CE0;
}

/* Radix helper vars */
:root {
  --radix-toast-swipe-end-x: calc(100% + 24px);
  --radix-toast-swipe-move-x: calc(100% + 12px);
  --radix-navigation-menu-viewport-height: 320px;
  --radix-navigation-menu-viewport-width: 480px;
  --radix-select-trigger-height: 40px;
  --radix-select-trigger-width: 240px;
}

@media (max-width: 767px) {
  :root {
    --radix-navigation-menu-viewport-width: 320px;
    --radix-select-trigger-width: 100%;
  }
}
```

## Tailwind config snippet
Use this `tailwind.config.ts` baseline (or adapt to `tailwind.config.js` by dropping the types):

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        success: "hsl(var(--success))",
        "success-foreground": "hsl(var(--success-foreground))",
        warning: "hsl(var(--warning))",
        "warning-foreground": "hsl(var(--warning-foreground))",
        info: "hsl(var(--info))",
        "info-foreground": "hsl(var(--info-foreground))",
        surface: "hsl(var(--surface))",
        "surface-raised": "hsl(var(--surface-raised))",
        "surface-overlay": "hsl(var(--surface-overlay))",
        "card-elevated": "hsl(var(--card-elevated))",
        brand: {
          primary: "hsl(var(--brand-primary))",
          on: "hsl(var(--brand-on))",
          subtle: "hsl(var(--brand-subtle))",
        },
        accentMint: "hsl(var(--accent-mint))",
        accentAmber: "hsl(var(--accent-amber))",
        gold: "hsl(var(--gold))",
        "gold-muted": "hsl(var(--gold-muted))",
        "gold-light": "hsl(var(--gold-light))",
        exclusive: "hsl(var(--exclusive))",
        "exclusive-muted": "hsl(var(--exclusive-muted))",
        "exclusive-foreground": "hsl(var(--exclusive-foreground))",
        slateTone: "hsl(var(--slate))",
        "slate-light": "hsl(var(--slate-light))",
        "slate-bg": "hsl(var(--slate-bg))",
        legal: {
          neutral900: "var(--legal-neutral-900)",
          neutral700: "var(--legal-neutral-700)",
          neutral500: "var(--legal-neutral-500)",
          neutral300: "var(--legal-neutral-300)",
          neutral100: "var(--legal-neutral-100)",
          primary700: "var(--legal-primary-700)",
          primary500: "var(--legal-primary-500)",
          primary300: "var(--legal-primary-300)",
          success500: "var(--legal-success-500)",
          warning500: "var(--legal-warning-500)",
          danger500: "var(--legal-danger-500)",
        },
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        lg: "var(--radius)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        elegant: "var(--shadow-elegant)",
        luxury: "var(--shadow-luxury)",
        gold: "var(--shadow-gold)",
        "legal-soft": "var(--legal-icon-shadow-soft)",
        "legal-hero": "var(--legal-icon-shadow-hero)",
      },
      transitionTimingFunction: {
        elegant: "var(--transition-elegant)",
        smooth: "var(--transition-smooth)",
        bounce: "var(--transition-bounce)",
      },
    },
  },
  plugins: [],
};

export default config;
```

## Quick usage tips

- Replace inline HSL utility classes (e.g., `bg-[hsl(var(--background))]`) with the new semantic shorthands (`bg-background`, `bg-card`, `border-border`, `shadow-card`).
- Sidebar: `bg-surface-overlay/80 border border-border shadow-elegant backdrop-blur-xl` plus RTL-aware anchoring (`rtl:right-0 ltr:left-0`).
- Header: `sticky top-0 border-b border-border bg-surface-raised/80 shadow-card backdrop-blur-xl`.
- Cards: `rounded-2xl border border-border bg-card shadow-card p-6` with hover `-translate-y-[2px] shadow-elegant transition-[transform,box-shadow] duration-200 ease-[var(--transition-smooth)]`.
- Ensure `index.css` (or equivalent) imports the token sheet and sets `[dir="rtl"] { font-family: "Cairo", "Inter", sans-serif; }` and `[dir="ltr"] { font-family: "Inter", "Cairo", sans-serif; }`.
