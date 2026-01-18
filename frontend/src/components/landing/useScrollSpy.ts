import { useEffect, useState } from "react";

type ScrollSpyOptions = {
  offset?: number;
  rootMargin?: string;
};

export const useScrollSpy = (sectionIds: string[], options?: ScrollSpyOptions) => {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!elements.length) return;

    const offset = options?.offset ?? 80;
    const rootMargin = options?.rootMargin ?? `-${offset}px 0px -60% 0px`;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin,
        threshold: [0.15, 0.35, 0.6],
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [sectionIds, options?.offset, options?.rootMargin]);

  return activeId;
};
