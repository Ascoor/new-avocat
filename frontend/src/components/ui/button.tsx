import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
    variant: {
  default: "bg-primary text-primary-foreground shadow-card hover:bg-primary-hover hover:shadow-glow",
  accent: "bg-accent text-accent-foreground shadow-card hover:bg-accent/90 hover:shadow-glow",
  secondary: "bg-secondary text-secondary-foreground shadow-card hover:bg-secondary/85",
  outline: "border border-border bg-transparent text-text-strong shadow-ambient hover:border-accent hover:bg-accent-soft hover:text-accent-foreground hover:shadow-glow",
  ghost: "text-text-muted hover:bg-surface-muted hover:text-text-strong",
  link: "text-primary underline-offset-4 hover:text-primary/80 hover:underline",
  destructive: "bg-destructive text-destructive-foreground shadow-card hover:bg-destructive/90 hover:shadow-glow",
  success: "bg-success text-success-foreground shadow-card hover:bg-success/90 hover:shadow-glow",
  warning: "bg-warning text-warning-foreground shadow-card hover:bg-warning/90 hover:shadow-glow",
  
  // جديد ↓↓↓
  premium: "bg-gradient-primary text-text-inverse font-semibold shadow-premium hover:scale-[1.02] hover:shadow-glow transition-premium",
  gold: "bg-gradient-gold text-accent-foreground font-semibold shadow-gold hover:shadow-glow-strong hover:scale-[1.02] transition-premium",
  glass: "bg-surface-glass border border-white/20 text-white backdrop-blur-md shadow-ambient hover:shadow-glow hover:border-accent transition-elegant",
  chromatic: "relative overflow-hidden rounded-full border border-border/60 bg-transparent px-4 py-2 text-text-strong shadow-ambient transition-all duration-500 hover:border-accent/70 hover:shadow-glow before:pointer-events-none before:absolute before:inset-0 before:-translate-y-full before:bg-[var(var(--gradient-gold))] before:opacity-0 before:transition-all before:duration-500 before:content-[''] hover:before:translate-y-0 hover:before:opacity-100 hover:text-text-inverse",
  hero: "bg-gradient-hero text-text-inverse shadow-glow-strong font-semibold hover:scale-105 hover:shadow-glow-strong transition-premium",
},
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
