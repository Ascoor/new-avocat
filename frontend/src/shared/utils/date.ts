import { format, differenceInCalendarDays } from 'date-fns'

export function formatDate(value: string | Date, pattern = 'yyyy-MM-dd HH:mm') {
  const date = typeof value === 'string' ? new Date(value) : value
  return format(date, pattern)
}

export function isNew(value: string | Date, days = 7) {
  const date = typeof value === 'string' ? new Date(value) : value
  return differenceInCalendarDays(new Date(), date) <= days
}
