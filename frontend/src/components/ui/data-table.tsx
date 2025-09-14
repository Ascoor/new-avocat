import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Download, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { GlassCard } from '@/components/ui/glass-card';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  TableColumn,
  TableData,
  SortState,
  PaginationState,
  sortData,
  filterData,
  paginateData,
  getTotalPages,
  exportToExcel,
  exportToCSV
} from '@/lib/table-utils';
import { cn } from '@/lib/utils';

interface DataTableProps<T extends TableData> {
  data: T[];
  columns: TableColumn<T>[];
  title?: string;
  searchable?: boolean;
  exportable?: boolean;
  pageSize?: number;
  className?: string;
}

export function DataTable<T extends TableData>({
  data,
  columns,
  title,
  searchable = true,
  exportable = true,
  pageSize = 10,
  className
}: DataTableProps<T>) {
  const { t, isRTL } = useLanguage();
  
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [sortState, setSortState] = useState<SortState>({ column: null, direction: null });
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize,
    total: data.length
  });

  // Memoized data processing
  const processedData = useMemo(() => {
    let result = data;
    
    // Apply search filter
    if (searchTerm) {
      result = filterData(result, searchTerm);
    }
    
    // Apply sorting
    result = sortData(result, sortState);
    
    // Update total for pagination
    const newTotal = result.length;
    if (newTotal !== pagination.total) {
      setPagination(prev => ({ ...prev, total: newTotal, page: 1 }));
    }
    
    // Apply pagination
    result = paginateData(result, { ...pagination, total: newTotal });
    
    return result;
  }, [data, searchTerm, sortState, pagination.page, pagination.pageSize]);

  // Handlers
  const handleSort = (columnKey: string) => {
    const column = columns.find(col => col.key === columnKey);
    if (!column?.sortable) return;

    setSortState(prev => ({
      column: columnKey,
      direction: prev.column === columnKey && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleExport = (format: 'excel' | 'csv') => {
    const filename = title ? title.toLowerCase().replace(/\s+/g, '_') : 'export';
    const allData = searchTerm ? filterData(data, searchTerm) : data;
    
    if (format === 'excel') {
      exportToExcel(allData, columns, filename);
    } else {
      exportToCSV(allData, columns, filename);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const totalPages = getTotalPages(pagination.total, pagination.pageSize);

  return (
    <GlassCard className={cn("p-6", className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          {title && (
            <h2 className="text-2xl font-semibold text-foreground mb-2">{title}</h2>
          )}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{t('table.showing')} {processedData.length} {t('table.of')} {pagination.total} {t('table.entries')}</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          {/* Search */}
          {searchable && (
            <div className="relative">
              <Search className={cn(
                "absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground",
                isRTL ? "right-3" : "left-3"
              )} />
              <Input
                placeholder={t('table.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={cn("w-full sm:w-64", isRTL ? "pr-10 pl-4" : "pl-10 pr-4")}
              />
            </div>
          )}
          
          {/* Export */}
          {exportable && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  {t('table.export')}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? "start" : "end"}>
                <DropdownMenuItem onClick={() => handleExport('excel')}>
                  {t('table.exportExcel')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('csv')}>
                  {t('table.exportCSV')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {columns.map((column) => (
                <TableHead 
                  key={String(column.key)}
                  className={cn(
                    "font-semibold text-foreground",
                    column.sortable && "cursor-pointer hover:bg-muted/70 transition-colors",
                    column.width && `w-[${column.width}]`
                  )}
                  onClick={() => column.sortable && handleSort(String(column.key))}
                >
                  <div className="flex items-center gap-2">
                    <span>{column.title}</span>
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ChevronUp 
                          className={cn(
                            "h-3 w-3 transition-colors",
                            sortState.column === column.key && sortState.direction === 'asc'
                              ? "text-primary" 
                              : "text-muted-foreground"
                          )} 
                        />
                        <ChevronDown 
                          className={cn(
                            "h-3 w-3 -mt-1 transition-colors",
                            sortState.column === column.key && sortState.direction === 'desc'
                              ? "text-primary" 
                              : "text-muted-foreground"
                          )} 
                        />
                      </div>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {processedData.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={columns.length} 
                  className="text-center py-8 text-muted-foreground"
                >
                  {searchTerm ? t('table.noResults') : t('table.noData')}
                </TableCell>
              </TableRow>
            ) : (
              processedData.map((row, index) => (
                <TableRow 
                  key={row.id || index}
                  className="hover:bg-muted/60 transition-colors"
                >
                  {columns.map((column) => (
                    <TableCell key={String(column.key)}>
                      {column.render 
                        ? column.render(row[column.key], row)
                        : String(row[column.key] || '-')
                      }
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <div className="text-sm text-muted-foreground">
            {t('table.page')} {pagination.page} {t('table.of')} {totalPages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              {t('table.previous')}
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <Button
                  key={page}
                  variant={pagination.page === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === totalPages}
            >
              {t('table.next')}
            </Button>
          </div>
        </div>
      )}
    </GlassCard>
  );
}
