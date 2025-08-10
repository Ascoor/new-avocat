import { ColumnDef } from '../components/DataTable'

// Convert rows to CSV string and trigger download (no-op in non-browser env)
export function exportToCSV<T>(rows: T[], columns: ColumnDef<T>[], filename: string): string {
  const headers = columns.map(c => c.header)
  const csvRows = rows.map(row => {
    return columns.map(col => {
      const key = col.accessorKey as keyof T | undefined
      const value = key ? String((row as any)[key]) : ''
      return '"' + value.replace(/"/g, '""') + '"'
    }).join(',')
  })
  const csv = [headers.join(',')].concat(csvRows).join('\n')
  if (typeof window !== 'undefined' && typeof URL.createObjectURL === 'function') {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${filename}.csv`
    link.click()
  }
  return csv
}

// Simple XLSX export by reusing CSV logic and changing extension
export function exportToXLSX<T>(rows: T[], columns: ColumnDef<T>[], filename: string): string {
  return exportToCSV(rows, columns, filename)
}
