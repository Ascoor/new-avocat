import React from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  variant?: "full" | "icon" | "static-ar" | "static-en"; 
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ variant = "full", className }) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { t } = useTranslation();

  const isDark = theme === "dark";
  const isArabic = language === "ar";

  let src: string;

  switch (variant) {
    case "icon":
      src = isDark ? "/images/logo-icon-dark.png" : "/images/logo-icon-light.png";
      break;

    case "static-ar":
      src = "/images/logo-arabic-dark.png"; // ثابت عربي (نهاري فقط)
      break;

    case "static-en":
      src = "/images/logo-full-en-dark.png"; // ثابت إنجليزي (نهاري فقط)
      break;

    case "full":
    default:
      if (isArabic) {
        src = isDark ? "/images/logo-full-arabic-dark.png" : "/images/logo-full-arabic-light.png";
      } else {
        src = isDark ? "/images/logo-full-en-dark.png" : "/images/logo-full-en-light.png";
      }
      break;
  }

  return (
    <img
      src={src}
      alt={t("brand.name")}
      className={cn("h-auto w-auto select-none", className)}
    />
  );
};

export default BrandLogo;
