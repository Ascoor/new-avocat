import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { ArrowUp } from "lucide-react";
import { smoothScrollTo } from "@/utils/smoothScroll";
import { useLanguage } from "@/contexts/LanguageContext";

const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const { language, direction } = useLanguage();

  useEffect(() => {
    const updateState = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScrollable =
        (document.documentElement.scrollHeight || 0) - (window.innerHeight || 0);

      setVisible(scrollY > (window.innerHeight || 0) * 0.35);
      setProgress(maxScrollable > 0 ? Math.min(scrollY / maxScrollable, 1) : 0);
    };

    updateState();
    window.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);

    return () => {
      window.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, []);

  const handleScrollTop = () => {
    smoothScrollTo(0, { duration: 1100, easing: "easeInOutExpo" });
  };

  const label = language === "ar" ? "العودة للأعلى" : "Back to top";
  const horizontalPosition = direction === "rtl" ? "left-6" : "right-6";

  const progressRingStyle: CSSProperties = useMemo(() => {
    const angle = Math.round(progress * 360);
    return {
      background: `conic-gradient(hsla(var(--primary) / 0.9) ${angle}deg, hsla(var(--primary) / 0.15) ${angle}deg 360deg)`,
    };
  }, [progress]);

  return (
    <button
      type="button"
      onClick={handleScrollTop}
      aria-label={label}
      className={`group fixed ${horizontalPosition} bottom-8 z-50 flex size-14 items-center justify-center transition-all duration-500 ease-hero ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span
        aria-hidden
        className="absolute inset-0 -z-10 rounded-full bg-gradient-aurora opacity-0 blur-xl transition-opacity duration-500 ease-hero group-hover:opacity-80"
      />
      <span
        aria-hidden
        className="absolute inset-0 rounded-full p-[2px] shadow-floating transition-transform duration-500 ease-hero group-hover:scale-[1.03]"
        style={progressRingStyle}
      >
        <span className="block h-full w-full rounded-full bg-background/90 backdrop-blur-md" />
      </span>
      <span className="relative flex size-12 items-center justify-center rounded-full bg-gradient-sunrise text-primary-foreground shadow-elegant transition-transform duration-500 ease-hero group-active:scale-95 group-hover:-translate-y-1">
        <ArrowUp className="h-5 w-5 drop-shadow" aria-hidden />
      </span>
    </button>
  );
};

export default ScrollToTopButton;
