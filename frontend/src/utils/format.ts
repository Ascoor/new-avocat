import i18n from '@/i18n/i18n';

export const fmtNumber = (value: number, lng: string = i18n.language) =>
  new Intl.NumberFormat(lng).format(value);

export const fmtDate = (
  date: Date | number | string,
  opts: Intl.DateTimeFormatOptions = {},
  lng: string = i18n.language
) => new Intl.DateTimeFormat(lng, { year: 'numeric', month: 'short', day: 'numeric', ...opts }).format(new Date(date));
