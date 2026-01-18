import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

const easeOut = [0.22, 1, 0.36, 1];

export const fadeRise = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: easeOut },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

type MotionSectionProps = HTMLAttributes<HTMLElement> & {
  as?: keyof JSX.IntrinsicElements;
};

export const MotionSection = ({
  as = "section",
  className,
  children,
  ...props
}: MotionSectionProps) => {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = (motion as Record<string, typeof motion.section>)[as] ?? motion.section;

  return (
    <MotionTag
      className={cn("relative scroll-mt-24", className)}
      initial={prefersReducedMotion ? false : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.35 }}
      variants={prefersReducedMotion ? undefined : fadeRise}
      {...props}
    >
      {children}
    </MotionTag>
  );
};

export const MotionList = motion.ul;
export const MotionItem = motion.li;
