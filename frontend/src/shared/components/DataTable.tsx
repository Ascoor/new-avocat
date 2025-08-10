import React, { useMemo, useState, useEffect } from 'react'
import { useTheme } from '../../context/theme-context'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { exportToCSV, exportToXLSX } from '../utils/exporters'
import { isNew } from '../utils/date'
import { saveTableState, loadTableState } from '../utils/persist'

export type ColumnDef<T> = {
  id: string
  header: string
  accessorKey?: keyof T
  cell?: (value: unknown, row: T) => React.ReactNode
  enableSorting?: boolean
}

export type DataTableProps<T> = {
  columns: ColumnDef<T>[]
  data: T[]
  onSelectionChange?: (rows: T[]) => void
  exportFileName?: string
  highlightNewerThanDays?: number
  persistenceKey?: string
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  onSelectionChange,
  exportFileName = 'table',
  highlightNewerThanDays,
  persistenceKey,
}: DataTableProps<T>) {
  const { theme } = useTheme()
  const { t } = useTranslation()
  const [sortKey, setSortKey] = useState<keyof T | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [selected, setSelected] = useState<Record<string | number, boolean>>({})
  const [showNewOnly, setShowNewOnly] = useState(false)

  useEffect(() => {
    if (persistenceKey) {
      const stored = loadTableState<{ sortKey: keyof T | null; sortDir: 'asc' | 'desc' }>(
        persistenceKey,
        { sortKey: null, sortDir: 'asc' }
      )
      setSortKey(stored.sortKey)
      setSortDir(stored.sortDir)
    }
  }, [persistenceKey])

  useEffect(() => {
    if (persistenceKey) {
      saveTableState(persistenceKey, { sortKey, sortDir })
    }
  }, [sortKey, sortDir, persistenceKey])

  const allSelected = data.length > 0 && data.every(r => selected[r.id])
  const someSelected = !allSelected && data.some(r => selected[r.id])

  const sorted = useMemo(() => {
    if (!sortKey) return data
    const sortedData = [...data].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      if (av === bv) return 0
      if (av === undefined) return -1
      if (bv === undefined) return 1
      return av < bv ? -1 : 1
    })
    return sortDir === 'asc' ? sortedData : sortedData.reverse()
  }, [data, sortKey, sortDir])

  const filtered = useMemo(() => {
    if (!showNewOnly || !highlightNewerThanDays) return sorted
    return sorted.filter(row =>
      isNew((row as any)['createdAt'], highlightNewerThanDays)
    )
  }, [sorted, showNewOnly, highlightNewerThanDays])

  const toggleAll = () => {
    if (allSelected) {
      setSelected({})
      onSelectionChange?.([])
    } else {
      const next: Record<string | number, boolean> = {}
      data.forEach(r => (next[r.id] = true))
      setSelected(next)
      onSelectionChange?.(data)
    }
  }

  const toggleOne = (row: T) => {
    const next = { ...selected, [row.id]: !selected[row.id] }
    setSelected(next)
    const selectedRows = data.filter(r => next[r.id])
    onSelectionChange?.(selectedRows)
  }

  const handleSort = (col: ColumnDef<T>) => {
    if (!col.accessorKey) return
    const key = col.accessorKey
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const currentSelectedRows = data.filter(r => selected[r.id])

  const handleExportCSV = () => {
    const rows = currentSelectedRows.length > 0 ? currentSelectedRows : data
    exportToCSV(rows, columns, exportFileName)
  }

  const handleExportXLSX = () => {
    const rows = currentSelectedRows.length > 0 ? currentSelectedRows : data
    exportToXLSX(rows, columns, exportFileName)
  }

  const handleQuickNewest = () => {
    setSortKey('createdAt' as keyof T)
    setSortDir('desc')
    setShowNewOnly(false)
  }

  const handleQuickOldest = () => {
    setSortKey('createdAt' as keyof T)
    setSortDir('asc')
    setShowNewOnly(false)
  }

  const handleQuickNew = () => {
    setSortKey('createdAt' as keyof T)
    setSortDir('desc')
    setShowNewOnly(true)
  }

  return (
    <div className={clsx('rounded-2xl shadow-sm p-4', theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900')}>
      <div className="flex justify-between items-center mb-2">
        <div>
          {currentSelectedRows.length > 0 && (
            <span className="text-sm">{currentSelectedRows.length} {t('selected')}</span>
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={handleQuickNewest} className="px-2 py-1 border rounded">Newest</button>
          <button onClick={handleQuickOldest} className="px-2 py-1 border rounded">Oldest</button>
          {highlightNewerThanDays && (
            <button onClick={handleQuickNew} className="px-2 py-1 border rounded">Newly Added</button>
          )}
          <button onClick={handleExportCSV} className="px-2 py-1 border rounded">CSV</button>
          <button onClick={handleExportXLSX} className="px-2 py-1 border rounded">Excel</button>
        </div>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                aria-label={t('selectAll')}
                checked={allSelected}
                ref={el => el && (el.indeterminate = someSelected)}
                onChange={toggleAll}
              />
            </th>
            {columns.map(col => (
              <th
                key={col.id}
                onClick={() => col.enableSorting && handleSort(col)}
                className={clsx('text-left px-2 py-1 select-none', col.enableSorting && 'cursor-pointer')}
              >
                {t(col.header)}
                {sortKey === col.accessorKey && (sortDir === 'asc' ? ' ▲' : ' ▼')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map(row => (
            <tr key={row.id} className="border-t">
              <td className="px-2 py-1">
                <input
                  type="checkbox"
                  checked={!!selected[row.id]}
                  onChange={() => toggleOne(row)}
                  aria-label={t('selectRow')}
                />
              </td>
              {columns.map(col => (
                <td key={col.id} className="px-2 py-1">
                  {col.cell ? col.cell((row as any)[col.accessorKey as keyof T], row) : String((row as any)[col.accessorKey as keyof T] ?? '')}
                  {col.accessorKey === 'createdAt' &&
                    highlightNewerThanDays &&
                    isNew((row as any)['createdAt'], highlightNewerThanDays) && (
                      <span className="ml-2 text-xs text-green-600">{t('new', { defaultValue: 'New' })}</span>
                    )}
                </td>
              ))}
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-4">
                {t('noData')}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
