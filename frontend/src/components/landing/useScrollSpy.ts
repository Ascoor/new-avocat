import { useEffect, useState } from 'react';

interface ScrollSpyOptions {
  offset?: number;
  rootMargin?: string;
}

export const useScrollSpy = (sectionIds: string[], options: ScrollSpyOptions = {}) => {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '');
  const { offset = 120 } = options;

  useEffect(() => {
    if (sectionIds.length === 0) {
      return;
    }

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + offset;
        let currentId = sectionIds[0];

        sectionIds.forEach((id) => {
          const element = document.getElementById(id);
          if (!element) return;
          const { top } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          if (scrollPosition >= elementTop) {
            currentId = id;
          }
        });

        setActiveId(currentId);
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [offset, sectionIds]);

  return activeId;
};
