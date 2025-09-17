import type { ReactNode } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export interface DetailsTableColumn<T> {
  header: string;
  render: (row: T) => ReactNode;
  align?: 'start' | 'center' | 'end';
  className?: string;
}

export interface DetailsTableProps<T> {
  data: T[];
  columns: DetailsTableColumn<T>[];
  actionsHeader?: string;
  renderActions?: (row: T) => ReactNode;
  emptyMessage: string;
}

const alignClass: Record<'start' | 'center' | 'end', string> = {
  start: 'text-left rtl:text-right',
  center: 'text-center',
  end: 'text-right rtl:text-left',
};

const DetailsTable = <T,>({
  data,
  columns,
  actionsHeader,
  renderActions,
  emptyMessage,
}: DetailsTableProps<T>) => {
  const { isRTL } = useLanguage();
  const hasActions = typeof renderActions === 'function';

  return (
    <div className="overflow-x-auto rounded-lg border border-border/60 bg-card/40 shadow-sm">
      <Table dir={isRTL ? 'rtl' : 'ltr'}>
        <TableHeader>
          <TableRow className="bg-muted/40">
            {columns.map((column, index) => (
              <TableHead
                key={`head-${index}`}
                className={cn(
                  'px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground',
                  alignClass[column.align ?? 'start'],
                  column.className,
                )}
              >
                {column.header}
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
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (hasActions ? 1 : 0)}
                className="px-4 py-6 text-center text-sm text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow key={`row-${rowIndex}`} className="border-border/40">
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={`cell-${rowIndex}-${colIndex}`}
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
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DetailsTable;
