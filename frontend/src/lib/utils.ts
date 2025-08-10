import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Convert a hex color code to an RGB or RGBA string. */
export function hexToRGB(hex: string): string {
  let r = 0
  let g = 0
  let b = 0
  let a = 1

  const normalized = hex.replace(/^#/, "")

  if (normalized.length === 3) {
    r = parseInt(normalized[0] + normalized[0], 16)
    g = parseInt(normalized[1] + normalized[1], 16)
    b = parseInt(normalized[2] + normalized[2], 16)
  } else if (normalized.length === 6 || normalized.length === 8) {
    r = parseInt(normalized.slice(0, 2), 16)
    g = parseInt(normalized.slice(2, 4), 16)
    b = parseInt(normalized.slice(4, 6), 16)
    if (normalized.length === 8) {
      a = parseInt(normalized.slice(6, 8), 16) / 255
    }
  }

  return normalized.length === 8
    ? `${r},${g},${b},${a}`
    : `${r},${g},${b}`
}

/** Format a value as SAR currency. */
export function formatValue(value: number) {
  return Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "SAR",
    maximumSignificantDigits: 3,
    notation: "compact",
  }).format(value)
}

/** Format a number using compact notation in Arabic. */
export function formatThousands(value: number) {
  return Intl.NumberFormat("ar-SA", {
    maximumSignificantDigits: 3,
    notation: "compact",
  }).format(value)
}

/** Format date as DD-MM-YYYY. */
export function formatDate(date: string | number | Date) {
  const d = new Date(date)
  const day = d.getDate().toString().padStart(2, "0")
  const month = (d.getMonth() + 1).toString().padStart(2, "0")
  const year = d.getFullYear()
  return `${day}-${month}-${year}`
}

/** Convert Latin digits to Arabic Hindi numerals. */
export function arabicToHindiNumbers(num: string | number) {
  const hindiNumerals = "٠١٢٣٤٥٦٧٨٩"
  return num
    .toString()
    .replace(/\d/g, (digit) => hindiNumerals[Number(digit)])
}
