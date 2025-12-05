import type { ReactNode } from 'react';
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  FileDown,
  Info,
  Plus,
  Search,
  Sparkles,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const DEFAULT_PAGE_SIZE = 10;

type Alignment = 'start' | 'center' | 'end';

export interface DetailsTableColumn<T> {
  key: string;
  header: string;
  /** Optional secondary label to display under the header (e.g., bilingual hint). */
  secondaryHeader?: string;
  render: (row: T) => ReactNode;
  accessor?: (row: T) => string | number | Date | null | undefined;
  sortable?: boolean;
  align?: Alignment;
  className?: string;
}

export interface DetailsTableDetailItem {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
}

export interface DetailsTableProps<T> {
  data: T[];
  columns: DetailsTableColumn<T>[];
  actionsHeader?: string;
  renderActions?: (row: T) => ReactNode;
  emptyMessage: string;
  enableSearch?: boolean;
  enableSorting?: boolean;
  enablePagination?: boolean;
  enableExport?: boolean;
  exportFileName?: string;
  pageSize?: number;
  onSortChange?: (sort: { key: string | null; direction: 'asc' | 'desc' }) => void;
  addButtonLabel?: string;
  onAdd?: () => void;
  toolbarExtras?: ReactNode;
  isLoading?: boolean;
  showSecondaryHeaders?: boolean;
  enableRowSelection?: boolean;
  getRowId?: (row: T) => string | number;
  selectedRowIds?: Array<string | number>;
  onSelectionChange?: (selectedRows: T[], selectedRowIds: string[]) => void;
  /** Enables a rich details card per row with an animated toggle. */
  enableDetailsCard?: boolean;
  /** Label shown above the details card; defaults to a translated value. */
  detailsCardLabel?: string;
  /** Optional function to create a human friendly title for the row. */
  getRowDisplayName?: (row: T) => string;
  /** Custom renderer for details card items. Defaults to using visible columns. */
  renderDetailsItems?: (row: T) => DetailsTableDetailItem[];
}

const alignClass: Record<Alignment, string> = {
  start: 'text-left rtl:text-right',
  center: 'text-center',
  end: 'text-right rtl:text-left',
};

const normaliseValue = (value: unknown): string => {
  if (value === null || value === undefined) return '';
  if (value instanceof Date) return value.toISOString();
  if (typeof value === 'number') return Number.isFinite(value) ? value.toString() : '';
  if (Array.isArray(value)) return value.map((item) => normaliseValue(item)).join(' ');
  if (typeof value === 'object')
    return Object.values(value as Record<string, unknown>)
      .map((item) => normaliseValue(item))
      .join(' ');
  return String(value);
};

const compareValues = (a: unknown, b: unknown): number => {
  if (a === b) return 0;
  if (a === null || a === undefined) return -1;
  if (b === null || b === undefined) return 1;

  if (a instanceof Date || b instanceof Date) {
    const aTime = a instanceof Date ? a.getTime() : new Date(String(a)).getTime();
    const bTime = b instanceof Date ? b.getTime() : new Date(String(b)).getTime();
    return aTime - bTime;
  }

  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }

  const aStr = String(a);
  const bStr = String(b);
  return aStr.localeCompare(bStr, undefined, { numeric: true, sensitivity: 'base' });
};

const escapeCsvValue = (value: string): string => {
  const needsQuotes = /[",\n]/.test(value);
  const escaped = value.replace(/"/g, '""');
  return needsQuotes ? `"${escaped}"` : escaped;
};

const escapeHtml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const formatExportValue = (value: unknown): string => {
  if (value === null || value === undefined) return '';
  if (value instanceof Date) return value.toISOString();
  return Array.isArray(value) ? value.join(', ') : String(value);
};

const DetailsTable = <T,>({
  data,
  columns,
  actionsHeader,
  renderActions,
  emptyMessage,
  enableSearch = true,
  enableSorting = true,
  enablePagination = true,
  enableExport = false,
  exportFileName = 'table-data',
  pageSize = DEFAULT_PAGE_SIZE,
  onSortChange,
  addButtonLabel,
  onAdd,
  toolbarExtras,
  isLoading = false,
  showSecondaryHeaders = false,
  enableRowSelection = false,
  getRowId,
  selectedRowIds,
  onSelectionChange,
  enableDetailsCard = false,
  detailsCardLabel,
  getRowDisplayName,
  renderDetailsItems,
}: DetailsTableProps<T>) => {
  const { isRTL, t } = useLanguage();
  const hasActions = typeof renderActions === 'function';
  const selectionEnabled = enableRowSelection;
  const detailCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resolveRowId = useCallback(
    (row: T, fallbackIndex: number) => {
      if (getRowId) return String(getRowId(row));
      if (typeof (row as { id?: string | number }).id !== 'undefined') {
        const idValue = (row as { id?: string | number }).id;
        if (typeof idValue === 'string' || typeof idValue === 'number') return String(idValue);
      }
      return String(fallbackIndex);
    },
    [getRowId],
  );

  const [internalSelectedIds, setInternalSelectedIds] = useState<Set<string>>(
    () => new Set(selectedRowIds?.map(String) ?? []),
  );

  const sortableColumns = useMemo(
    () =>
      enableSorting
        ? columns.filter((column) => column.sortable && typeof column.accessor === 'function')
        : [],
    [columns, enableSorting],
  );

  const exportableColumns = useMemo(
    () => columns.filter((column) => typeof column.accessor === 'function'),
    [columns],
  );

  const searchableColumns = useMemo(
    () => columns.filter((column) => typeof column.accessor === 'function'),
    [columns],
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [closingRowId, setClosingRowId] = useState<string | null>(null);

  const detailsHeader = detailsCardLabel ?? t('table.detailsCard.header');

  useEffect(() => {
    if (!selectionEnabled || !selectedRowIds) return;
    setInternalSelectedIds(new Set(selectedRowIds.map(String)));
  }, [selectionEnabled, selectedRowIds]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, sortKey, sortDirection, data.length, pageSize]);

  useEffect(() => {
    return () => {
      if (detailCloseTimer.current) clearTimeout(detailCloseTimer.current);
    };
  }, []);

  const filteredData = useMemo(() => {
    if (!enableSearch || !searchTerm.trim()) return data;
    const query = searchTerm.trim().toLowerCase();

    return data.filter((row) =>
      searchableColumns.some((column) => {
        if (!column.accessor) return false;
        const value = column.accessor(row);
        return normaliseValue(value).toLowerCase().includes(query);
      }),
    );
  }, [data, enableSearch, searchTerm, searchableColumns]);

  const sortedData = useMemo(() => {
    if (!enableSorting || !sortKey) return filteredData;
    const column = columns.find((col) => col.key === sortKey && typeof col.accessor === 'function');
    if (!column || !column.accessor) return filteredData;

    const accessor = column.accessor;
    const cloned = [...filteredData];
    cloned.sort((a, b) => {
      const result = compareValues(accessor(a), accessor(b));
      return sortDirection === 'asc' ? result : -result;
    });
    return cloned;
  }, [columns, enableSorting, filteredData, sortDirection, sortKey]);

  const totalItems = sortedData.length;
  const totalPages = enablePagination ? Math.max(1, Math.ceil(totalItems / pageSize)) : 1;

  useEffect(() => {
    if (enablePagination && page > totalPages) {
      setPage(totalPages);
    }
  }, [enablePagination, page, totalPages]);

  const paginatedData = useMemo(() => {
    if (!enablePagination) return sortedData;
    const start = (page - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [enablePagination, page, pageSize, sortedData]);

  useEffect(() => {
    if (!selectionEnabled) return;
    setInternalSelectedIds((previous) => {
      const validIds = new Set(
        sortedData.map((row, index) => resolveRowId(row, index)),
      );
      const next = new Set<string>();
      previous.forEach((id) => {
        if (validIds.has(id)) next.add(id);
      });
      return next;
    });
  }, [resolveRowId, selectionEnabled, sortedData]);

  useEffect(() => {
    if (!selectionEnabled || !onSelectionChange) return;
    const selectedRows = sortedData.filter((row, index) =>
      internalSelectedIds.has(resolveRowId(row, index)),
    );
    onSelectionChange(selectedRows, Array.from(internalSelectedIds));
  }, [internalSelectedIds, onSelectionChange, resolveRowId, selectionEnabled, sortedData]);

  const visibleRowIds = useMemo(
    () => paginatedData.map((row, index) => resolveRowId(row, (page - 1) * pageSize + index)),
    [page, pageSize, paginatedData, resolveRowId],
  );

  const allVisibleSelected =
    selectionEnabled && visibleRowIds.length > 0 && visibleRowIds.every((id) => internalSelectedIds.has(id));
  const someVisibleSelected =
    selectionEnabled && visibleRowIds.some((id) => internalSelectedIds.has(id) && !allVisibleSelected);

  const toggleSelectAllVisible = () => {
    if (!selectionEnabled) return;
    setInternalSelectedIds((previous) => {
      const next = new Set(previous);
      if (allVisibleSelected) {
        visibleRowIds.forEach((id) => next.delete(id));
      } else {
        visibleRowIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  const toggleSelectRow = (rowId: string) => {
    if (!selectionEnabled) return;
    setInternalSelectedIds((previous) => {
      const next = new Set(previous);
      if (next.has(rowId)) {
        next.delete(rowId);
      } else {
        next.add(rowId);
      }
      return next;
    });
  };

  const clearSelection = () => {
    if (!selectionEnabled) return;
    setInternalSelectedIds(new Set());
  };

  const toggleDetails = (rowId: string) => {
    setExpandedRowId((previous) => {
      if (previous === rowId) {
        setClosingRowId(rowId);
        if (detailCloseTimer.current) clearTimeout(detailCloseTimer.current);
        detailCloseTimer.current = setTimeout(() => {
          setClosingRowId((current) => (current === rowId ? null : current));
        }, 200);
        return null;
      }
      if (detailCloseTimer.current) clearTimeout(detailCloseTimer.current);
      setClosingRowId(null);
      return rowId;
    });
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    if (typeof window === 'undefined') return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportCsv = () => {
    if (exportableColumns.length === 0) return;

    const headers = exportableColumns.map((column) => escapeCsvValue(column.header));
    const rows = sortedData.map((row) =>
      exportableColumns.map((column) => escapeCsvValue(formatExportValue(column.accessor?.(row)))),
    );

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    downloadBlob(blob, `${exportFileName}.csv`);
  };

  const handleExportExcel = () => {
    if (exportableColumns.length === 0) return;

    const headerRow = exportableColumns
      .map((column) => `<th>${escapeHtml(column.header)}</th>`)
      .join('');
    const dataRows = sortedData
      .map((row) =>
        `<tr>${exportableColumns
          .map((column) => `<td>${escapeHtml(formatExportValue(column.accessor?.(row)))}</td>`)
          .join('')}</tr>`,
      )
      .join('');

    const html = `<table><thead><tr>${headerRow}</tr></thead><tbody>${dataRows}</tbody></table>`;
    const blob = new Blob(['\ufeff' + html], {
      type: 'application/vnd.ms-excel;charset=utf-8;',
    });
    downloadBlob(blob, `${exportFileName}.xls`);
  };

  const handleSortKeyChange = useCallback(
    (value: string) => {
      const nextKey = value === 'none' ? null : value;
      setSortKey(nextKey);
      onSortChange?.({ key: nextKey, direction: sortDirection });
    },
    [onSortChange, sortDirection],
  );

  const handleToggleDirection = useCallback(() => {
    setSortDirection((previous) => {
      const next = previous === 'asc' ? 'desc' : 'asc';
      onSortChange?.({ key: sortKey, direction: next });
      return next;
    });
  }, [onSortChange, sortKey]);

  const handleClearSort = useCallback(() => {
    setSortKey(null);
    setSortDirection('asc');
    onSortChange?.({ key: null, direction: 'asc' });
  }, [onSortChange]);

  const controlsVisible =
    enableSearch ||
    (enableSorting && sortableColumns.length > 0) ||
    enableExport ||
    onAdd ||
    toolbarExtras ||
    (selectionEnabled && internalSelectedIds.size > 0);

  const showingFrom = enablePagination && totalItems > 0 ? (page - 1) * pageSize + 1 : totalItems > 0 ? 1 : 0;
  const showingTo = enablePagination ? Math.min(page * pageSize, totalItems) : totalItems;
  const totalColumns =
    columns.length +
    (hasActions ? 1 : 0) +
    (selectionEnabled ? 1 : 0) +
    (enableDetailsCard ? 1 : 0);

  return (
    <div className="rounded-lg border border-border/60 bg-card/40 shadow-card">
      {controlsVisible && (
        <div className="flex flex-col gap-3 border-b border-border/60 bg-muted/30 px-4 py-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {enableSearch ? (
              <div className="relative w-full lg:max-w-sm">
                <Search
                  className={cn(
                    'absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground',
                    isRTL ? 'right-3' : 'left-3',
                  )}
                />
                <Input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder={t('table.search')}
                  className={cn(isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3')}
                />
              </div>
            ) : (
              <div />
            )}

            <div className="flex flex-wrap items-center justify-end gap-2">
              {enableSorting && sortableColumns.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <Select value={sortKey ?? 'none'} onValueChange={handleSortKeyChange}>
                    <SelectTrigger className="h-9 w-44" aria-label={t('table.aria.sortColumn')}>
                      <SelectValue placeholder={t('table.sortBy')}>
                        {sortKey
                          ? sortableColumns.find((column) => column.key === sortKey)?.header
                          : t('table.noSort')}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent align={isRTL ? 'start' : 'end'}>
                      <SelectItem value="none">{t('table.noSort')}</SelectItem>
                      {sortableColumns.map((column) => (
                        <SelectItem key={column.key} value={column.key}>
                          {column.header}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleToggleDirection}
                    disabled={!sortKey}
                    aria-label={t('table.aria.toggleDirection')}
                  >
                    {sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleClearSort}
                    disabled={!sortKey}
                    aria-label={t('table.aria.clearSort')}
                    className="gap-2"
                  >
                    <ArrowUpDown className="h-4 w-4" />
                    <span className="text-sm">{t('table.clearSort')}</span>
                  </Button>
                </div>
              )}

              {enableExport && exportableColumns.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleExportCsv}
                    aria-label={t('table.aria.exportCsv')}
                    className="gap-2"
                  >
                    <FileDown className="h-4 w-4" />
                    {t('table.exportCSV')}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleExportExcel}
                    aria-label={t('table.aria.exportExcel')}
                    className="gap-2"
                  >
                    <FileDown className="h-4 w-4" />
                    {t('table.exportExcel')}
                  </Button>
                </div>
              )}

              {toolbarExtras}

              {onAdd && (
                <Button type="button" onClick={onAdd} className="gap-2">
                  <Plus className="h-4 w-4" />
                  {addButtonLabel ?? t('common.add')}
                </Button>
              )}
            </div>
          </div>

          {selectionEnabled && internalSelectedIds.size > 0 && (
            <div className="flex items-center justify-between gap-3 rounded-md border border-border/60 bg-background/60 px-3 py-2 text-sm shadow-sm">
              <span className="font-medium text-foreground">
                {t('table.selectedCount', { count: internalSelectedIds.size })}
              </span>
              <Button variant="ghost" size="sm" onClick={clearSelection} className="h-8 px-3">
                {t('table.clearSelection')}
              </Button>
            </div>
          )}
        </div>
      )}

      <div className="overflow-x-auto">
        <Table dir={isRTL ? 'rtl' : 'ltr'} className="min-w-full align-middle">
          <TableHeader>
            <TableRow className="bg-muted/40">
              {selectionEnabled && (
                <TableHead className="w-14 px-4 py-2 text-center">
                  <Checkbox
                    aria-label={t('table.aria.selectAll')}
                    checked={allVisibleSelected ? true : someVisibleSelected ? 'indeterminate' : false}
                    onCheckedChange={toggleSelectAllVisible}
                    className="mx-auto"
                  />
                </TableHead>
              )}
              {enableDetailsCard && (
                <TableHead className="w-14 px-4 py-2 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {detailsHeader}
                </TableHead>
              )}
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={cn(
                    'px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground',
                    alignClass[column.align ?? 'start'],
                    column.className,
                  )}
                >
                  <div className="flex flex-col gap-0.5 leading-tight">
                    <span>{column.header}</span>
                    {showSecondaryHeaders && column.secondaryHeader ? (
                      <span className="text-[11px] font-medium uppercase text-foreground/80 dark:text-foreground/70">
                        {column.secondaryHeader}
                      </span>
                    ) : null}
                  </div>
                </TableHead>
              ))}
              {hasActions && (
                <TableHead className="px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground text-center">
                  {actionsHeader}
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={totalColumns}
                  className="px-4 py-6 text-center text-sm text-muted-foreground"
                >
                  {t('common.loading')}
                </TableCell>
              </TableRow>
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={totalColumns}
                  className="px-4 py-6 text-center text-sm text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, rowIndex) => {
                const rowId = resolveRowId(row, (page - 1) * pageSize + rowIndex);
                const isRowSelected = selectionEnabled && internalSelectedIds.has(rowId);
                const isRowExpanded = enableDetailsCard && expandedRowId === rowId;
                const isClosing = enableDetailsCard && closingRowId === rowId;
                const showDetailsRow = enableDetailsCard && (isRowExpanded || isClosing);
                const detailState = isRowExpanded ? 'open' : 'closed';
                const detailItems =
                  renderDetailsItems?.(row) ??
                  columns.map((column) => ({ label: column.header, value: column.render(row), icon: undefined }));
                const rowDisplayName =
                  getRowDisplayName?.(row) ??
                  ((row as { title?: string }).title ??
                    (row as { name?: string }).name ??
                    (row as { slug?: string }).slug ??
                    t('table.detailsCard.fallbackTitle'));
                return (
                  <Fragment key={rowId}>
                    <TableRow
                      data-selected={isRowSelected ? 'true' : undefined}
                      aria-selected={isRowSelected}
                      className={cn(
                        'border-border/40 transition-colors hover:bg-muted/40',
                        isRowSelected && 'bg-primary/5 hover:bg-primary/10 dark:bg-primary/10 dark:hover:bg-primary/15',
                      )}
                    >
                      {selectionEnabled && (
                        <TableCell className="w-14 px-4 py-2 text-center">
                          <Checkbox
                            aria-label={t('table.aria.selectRow')}
                            checked={isRowSelected}
                            onCheckedChange={() => toggleSelectRow(rowId)}
                            className="mx-auto"
                          />
                        </TableCell>
                      )}

                      {enableDetailsCard && (
                        <TableCell className="w-14 px-4 py-2 text-center">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            aria-expanded={isRowExpanded}
                            aria-label={
                              isRowExpanded
                                ? t('table.detailsCard.hideDetails')
                                : t('table.detailsCard.showDetails')
                            }
                            onClick={() => toggleDetails(rowId)}
                            className="h-9 w-9"
                          >
                            <Info className={cn('h-4 w-4 transition', isRowExpanded && 'text-primary')} />
                          </Button>
                        </TableCell>
                      )}

                      {columns.map((column) => (
                        <TableCell
                          key={`${column.key}-${rowIndex}`}
                          className={cn(
                            'px-4 py-2 text-sm text-foreground',
                            alignClass[column.align ?? 'start'],
                            column.className,
                          )}
                        >
                          {column.render(row)}
                        </TableCell>
                      ))}
                      {hasActions && (
                        <TableCell className="px-4 py-2 text-center">
                          {renderActions?.(row)}
                        </TableCell>
                      )}
                    </TableRow>

                    {showDetailsRow && (
                      <TableRow data-state={detailState} className="border-border/40">
                        <TableCell colSpan={totalColumns} className="px-4 py-3">
                          <div
                            className={cn(
                              'transition-all duration-300',
                              detailState === 'open'
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 -translate-y-1',
                            )}
                          >
                            <div className="relative overflow-hidden rounded-lg border border-primary/10 bg-gradient-to-br from-background via-muted/50 to-background shadow-sm">
                              <div className="pointer-events-none absolute inset-0 opacity-60">
                                <div className="absolute -left-10 top-0 h-32 w-32 rounded-full bg-primary/15 blur-3xl" />
                                <div className="absolute -right-16 bottom-0 h-32 w-32 rounded-full bg-secondary/10 blur-3xl" />
                              </div>

                              <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <Info className="h-5 w-5" />
                                  </div>
                                  <div className="leading-tight">
                                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                                      {detailsHeader}
                                    </p>
                                    <p className="text-base font-semibold text-foreground">{rowDisplayName}</p>
                                  </div>
                                </div>

                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => toggleDetails(rowId)}
                                  className="gap-2"
                                >
                                  {t('table.detailsCard.hideDetails')}
                                  <ChevronUp className="h-4 w-4" />
                                </Button>
                              </div>

                              <div className="grid gap-3 px-4 pb-4 sm:grid-cols-2 lg:grid-cols-3">
                                {detailItems.map((item, index) => (
                                  <div
                                    key={`${rowId}-detail-${index}`}
                                    className="flex items-start gap-3 rounded-md border border-border/70 bg-background/80 p-3 shadow-[0_1px_0_0] shadow-border/60 transition hover:border-primary/40"
                                  >
                                    <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                      {item.icon ?? <Sparkles className="h-4 w-4" />}
                                    </div>
                                    <div className="space-y-1">
                                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                                        {item.label}
                                      </p>
                                      <div className="text-sm font-medium text-foreground">{item.value}</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </Fragment>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {(enablePagination || totalItems > 0) && (
        <div className="flex flex-col gap-3 border-t border-border/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-muted-foreground">
            {t('table.showing')}{' '}
            {totalItems === 0 ? 0 : `${showingFrom}-${showingTo}`} {t('table.of')} {totalItems}{' '}
            {t('table.entries')}
          </span>

          {enablePagination && totalPages > 1 && (
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                {t('table.previous')}
              </Button>
              <span className="text-sm text-muted-foreground">
                {page} / {totalPages}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={page === totalPages}
              >
                {t('table.next')}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DetailsTable;
