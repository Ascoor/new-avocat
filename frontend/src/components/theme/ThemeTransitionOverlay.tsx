import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type Theme = "light" | "dark";

interface ThemeTransitionOverlayProps {
  isActive: boolean;
  origin: { x: number; y: number };
  nextTheme: Theme;
  onMidpoint: () => void;
  onComplete: () => void;
}

const ThemeTransitionOverlay: React.FC<ThemeTransitionOverlayProps> = ({
  isActive,
  origin,
  nextTheme,
  onMidpoint,
  onComplete,
}) => {
  const reduceMotion = useReducedMotion();
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const hasTriggeredMidpoint = useRef(false);

  useEffect(() => {
    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    if (!isActive) {
      hasTriggeredMidpoint.current = false;
    }
  }, [isActive]);

  const radius = useMemo(() => {
    const maxX = Math.max(origin.x, viewport.width - origin.x);
    const maxY = Math.max(origin.y, viewport.height - origin.y);
    return Math.hypot(maxX, maxY);
  }, [origin.x, origin.y, viewport.height, viewport.width]);

  const clipStart = `circle(0px at ${origin.x}px ${origin.y}px)`;
  const clipEnd = `circle(${radius}px at ${origin.x}px ${origin.y}px)`;

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const durationMs = reduceMotion ? 260 : 900;
    const midpointMs = reduceMotion ? 0 : Math.round(durationMs * 0.45);

    const midpointTimer = window.setTimeout(() => {
      if (!hasTriggeredMidpoint.current) {
        onMidpoint();
        hasTriggeredMidpoint.current = true;
      }
    }, midpointMs);

    const completeTimer = window.setTimeout(() => {
      onComplete();
    }, durationMs);

    return () => {
      window.clearTimeout(midpointTimer);
      window.clearTimeout(completeTimer);
    };
  }, [isActive, onComplete, onMidpoint, reduceMotion]);

  return (
    <AnimatePresence>
      {isActive ? (
        <motion.div
          key={`theme-transition-${nextTheme}`}
          className="pointer-events-none fixed inset-0 z-[9999]"
          style={{ backgroundColor: `hsl(var(--theme-transition-${nextTheme}))` }}
          initial={reduceMotion ? { opacity: 0 } : { clipPath: clipStart }}
          animate={reduceMotion ? { opacity: 1 } : { clipPath: clipEnd }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reduceMotion ? 0.26 : 0.9,
            ease: reduceMotion ? "easeOut" : [0.22, 1, 0.36, 1],
          }}
        />
      ) : null}
    </AnimatePresence>
  );
};

export default ThemeTransitionOverlay;
