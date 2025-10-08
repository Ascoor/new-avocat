const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const easeInOutQuint = (t: number) =>
  t < 0.5 ? 16 * t ** 5 : 1 - Math.pow(-2 * t + 2, 5) / 2;

const easeInOutExpo = (t: number) =>
  t === 0
    ? 0
    : t === 1
      ? 1
      : t < 0.5
        ? Math.pow(2, 20 * t - 10) / 2
        : (2 - Math.pow(2, -20 * t + 10)) / 2;

const easingPresets = {
  easeInOutCubic,
  easeInOutQuint,
  easeInOutExpo,
};

type EasingName = keyof typeof easingPresets;

type ScrollOptions = {
  duration?: number;
  easing?: EasingName | ((t: number) => number);
};

type ScrollToElementOptions = ScrollOptions & {
  offset?: number;
};

const resolveEasing = (easing?: ScrollOptions['easing']) => {
  if (typeof easing === 'function') return easing;
  if (easing && easingPresets[easing]) return easingPresets[easing];
  return easeInOutQuint;
};

export const smoothScrollTo = (targetY: number, options?: ScrollOptions) => {
  if (typeof window === "undefined") return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo({ top: targetY });
    return;
  }

  const startY = window.scrollY || window.pageYOffset;
  const distance = targetY - startY;
  const duration = options?.duration ?? 800;
  const startTime = performance.now();
  const easing = resolveEasing(options?.easing);

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easing(progress);
    window.scrollTo(0, startY + distance * easedProgress);

    if (elapsed < duration) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

export const smoothScrollToElement = (
  element: Element,
  options?: ScrollToElementOptions,
) => {
  const rect = element.getBoundingClientRect();
  const offset = options?.offset ?? 0;
  const targetY = rect.top + (window.scrollY || window.pageYOffset) - offset;
  smoothScrollTo(targetY, { duration: options?.duration, easing: options?.easing });
};
