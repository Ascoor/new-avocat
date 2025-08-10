import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import DataTable, { ColumnDef } from './DataTable'
import * as exporters from '../utils/exporters'
import "../../i18n"

type Row = { id: string; name: string; createdAt: string }
const data: Row[] = [
  { id: '1', name: 'B', createdAt: '2024-01-01' },
  { id: '2', name: 'A', createdAt: '2024-01-02' },
]
const columns: ColumnDef<Row>[] = [
  { id: 'name', header: 'name', accessorKey: 'name', enableSorting: true },
  { id: 'createdAt', header: 'createdAt', accessorKey: 'createdAt', enableSorting: true },
]

describe('DataTable', () => {
  it('selects all rows', () => {
    const cb = vi.fn()
    render(<DataTable columns={columns} data={data} onSelectionChange={cb} />)
    const selectAll = screen.getByLabelText('selectAll') as HTMLInputElement
    fireEvent.click(selectAll)
    expect(cb).toHaveBeenCalledWith(data)
  })

  it('selects a single row', () => {
    const cb = vi.fn()
    render(<DataTable columns={columns} data={data} onSelectionChange={cb} />)
    const rowCheck = screen.getAllByLabelText('selectRow')[0]
    fireEvent.click(rowCheck)
    expect(cb).toHaveBeenCalledWith([data[0]])
  })

  it('exports selected rows as CSV', () => {
    const spy = vi.spyOn(exporters, 'exportToCSV')
    render(<DataTable columns={columns} data={data} exportFileName="test" />)
    const rowCheck = screen.getAllByLabelText('selectRow')[0]
    fireEvent.click(rowCheck)
    const btn = screen.getByText('CSV')
    fireEvent.click(btn)
    expect(spy).toHaveBeenCalledWith([data[0]], columns, 'test')
  })

  it('quick sorts by newest and oldest', () => {
    render(<DataTable columns={columns} data={data} />)
    fireEvent.click(screen.getByText('Newest'))
    let rows = screen.getAllByRole('row')
    expect(rows[1]).toHaveTextContent('A')
    fireEvent.click(screen.getByText('Oldest'))
    rows = screen.getAllByRole('row')
    expect(rows[1]).toHaveTextContent('B')
  })

  it('persists sorting state', () => {
    const { unmount } = render(<DataTable columns={columns} data={data} persistenceKey="test-table" />)
    fireEvent.click(screen.getByText('Newest'))
    unmount()
    render(<DataTable columns={columns} data={data} persistenceKey="test-table" />)
    const rows = screen.getAllByRole('row')
    expect(rows[1]).toHaveTextContent('A')
    localStorage.clear()
  })
})
