import { useEffect, useMemo, useRef, useState } from 'react';

interface CountUpOptions {
  duration?: number;
  start?: number;
}

export const useCountUp = (end: number, options: CountUpOptions = {}) => {
  const { duration = 1600, start = 0 } = options;
  const [value, setValue] = useState(start);
  const ref = useRef<HTMLElement | null>(null);

  const observerOptions = useMemo(
    () => ({ rootMargin: '0px 0px -10% 0px', threshold: 0.2 }),
    [],
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frameId: number | null = null;
    let startTime: number | null = null;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const currentValue = Math.floor(start + (end - start) * progress);
      setValue(currentValue);
      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          frameId = window.requestAnimationFrame(animate);
          observer.disconnect();
        }
      });
    }, observerOptions);

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [duration, end, observerOptions, start]);

  return { ref, value };
};
