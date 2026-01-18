import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export const useCountUp = (target: number, duration = 2000, start = true) => {
  const prefersReducedMotion = useReducedMotion();
  const [value, setValue] = useState(start ? 0 : target);

  useEffect(() => {
    if (!start || prefersReducedMotion) {
      setValue(target);
      return;
    }

    let frame: number;
    const startTime = performance.now();
    const from = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setValue(Math.floor(from + (target - from) * progress));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      if (frame) cancelAnimationFrame(frame);
    };
  }, [target, duration, start, prefersReducedMotion]);

  return value;
};
