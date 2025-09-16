import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { MdEdit, MdVisibility } from 'react-icons/md';
import { FaTrashAlt, FaSortUp, FaSortDown } from 'react-icons/fa';
import API_CONFIG from '@/config/config';

type RowId = string | number;

type Renderer<T extends RowWithId> = (row: T) => ReactNode;

type RowWithId = {
  id: RowId;
};

export interface TableHeader<T extends RowWithId> {
  key: keyof T | string;
  text: string;
}

export interface TableComponentProps<T extends RowWithId> {
  data: T[];
  headers: Array<TableHeader<T>>;
  customRenderers?: Partial<Record<string, Renderer<T>>>;
  onDelete?: (row: T) => void;
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
  renderAddButton?: () => ReactNode;
}

const ITEMS_PER_PAGE = 10;

const getCellValue = <T extends RowWithId>(row: T, key: keyof T | string) => {
  const asRecord = (value: unknown): Record<string, unknown> | undefined =>
    value && typeof value === 'object' ? (value as Record<string, unknown>) : undefined;

  if (typeof key === 'string' && key.includes('.')) {
    return key.split('.').reduce<unknown>((value, part) => {
      const record = asRecord(value);
      return record ? record[part] : undefined;
    }, row as unknown);
  }

  const base = asRecord(row);
  if (!base) return undefined;
  return base[key as string];
};

const normalize = (value: unknown) =>
  value !== null && value !== undefined ? String(value).toLowerCase() : '';

const TableComponent = <T extends RowWithId>({
  data,
  headers,
  customRenderers = {},
  onDelete,
  onEdit,
  onView,
  renderAddButton,
}: TableComponentProps<T>) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof T | string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const keywords = searchQuery.trim().toLowerCase().split(/\s+/).filter(Boolean);

    if (keywords.length === 0) {
      setFilteredData(data);
      setCurrentPage(1);
      return;
    }

    const filtered = data.filter((item) =>
      keywords.every((keyword) =>
        headers.some((header) => {
          if (header.key === 'actions') return false;
          const value = getCellValue(item, header.key);
          return normalize(value).includes(keyword);
        }),
      ),
    );

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchQuery, data, headers]);

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    const sorted = [...filteredData].sort((a, b) => {
      const aValue = normalize(getCellValue(a, sortKey));
      const bValue = normalize(getCellValue(b, sortKey));

      if (sortDirection === 'asc') {
        return aValue.localeCompare(bValue);
      }
      return bValue.localeCompare(aValue);
    });

    return sorted;
  }, [filteredData, sortKey, sortDirection]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, sortedData]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE) || 0;

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= Math.max(totalPages, 1)) {
      setCurrentPage(newPage);
    }
  };

  const handleSort = (key: keyof T | string) => {
    if (key === 'actions') return;
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  return (
    <section className="container mx-auto rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <div className="mb-8 flex w-full flex-col items-center justify-between gap-4 md:flex-row">
        {renderAddButton && <div className="w-full md:w-auto">{renderAddButton()}</div>}
        <div className="w-full md:w-auto">
          <input
            type="text"
            placeholder="ابحث"
            className="w-full rounded-lg border px-4 py-2 focus:ring focus:ring-violet-400 dark:bg-gray-700 dark:text-gray-100"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </div>
      </div>

      {filteredData.length > 0 ? (
        <div className="w-full overflow-x-auto">
          <table className="w-full table-auto shadow-md">
            <thead className="border-b border-border/60 bg-muted/60 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <tr>
                {onView && <th className="px-4 py-3">عرض</th>}
                {headers.map((header) => (
                  <th
                    key={String(header.key)}
                    className="px-4 py-3 cursor-pointer text-foreground"
                    onClick={() => handleSort(header.key)}
                  >
                    <span className="inline-flex items-center gap-2">
                      {header.text}
                      {sortKey === header.key && (
                        sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />
                      )}
                    </span>
                  </th>
                ))}
                {onEdit && <th className="px-4 py-3">تعديل</th>}
                {onDelete && <th className="px-4 py-3">حذف</th>}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row) => (
                <tr
                  key={String(row.id)}
                  className="border-b border-gray-200 text-center text-sm text-gray-800 transition duration-200 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 md:text-base lg:text-lg"
                >
                  {onView && (
                    <td className="px-4 py-2">
                      <button
                        onClick={() => onView(String(row.id))}
                        className="text-primary transition-colors duration-300 hover:text-primary/80"
                      >
                        <MdVisibility />
                      </button>
                    </td>
                  )}
                  {headers.map((header) => {
                    const key = String(header.key);
                    const renderer = customRenderers[key];
                    const value = getCellValue(row, header.key);

                    if (key === 'image') {
                      return (
                        <td key={`${row.id}-${key}`} className="px-4 py-2">
                          {typeof value === 'string' && value ? (
                            <img
                              src={`${API_CONFIG.baseURL}${value}`}
                              className="mx-auto h-12 w-12 rounded-full shadow md:h-16 md:w-16"
                              alt="Row avatar"
                            />
                          ) : (
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-600 text-gray-300 md:h-16 md:w-16">
                              N/A
                            </div>
                          )}
                        </td>
                      );
                    }

                    return (
                      <td key={`${row.id}-${key}`} className="px-4 py-2">
                        {renderer ? renderer(row) : value ?? '—'}
                      </td>
                    );
                  })}
                  {onEdit && (
                    <td className="px-4 py-2">
                      <button
                        onClick={() => onEdit(String(row.id))}
                        className="text-primary transition-colors duration-300 hover:text-primary/80"
                      >
                        <MdEdit />
                      </button>
                    </td>
                  )}
                  {onDelete && (
                    <td className="px-4 py-2">
                      <button
                        onClick={() => onDelete(row)}
                        className="text-destructive transition-colors duration-300 hover:text-destructive/80"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-800 dark:text-gray-200">لا يوجد بيانات</p>
      )}

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`rounded-full px-4 py-2 transition duration-300 ${
            currentPage === 1 ? 'cursor-default opacity-50' : ''
          } bg-gray-200 text-gray-700 hover:scale-105 hover:bg-gray-300`}
        >
          سابق
        </button>
        <span className="text-gray-600 dark:text-gray-300">
          الصفحة {currentPage} من {Math.max(totalPages, 1)}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={totalPages === 0 || currentPage >= totalPages}
          className={`rounded-full px-4 py-2 transition duration-300 ${
            totalPages === 0 || currentPage >= totalPages ? 'cursor-default opacity-50' : ''
          } bg-gray-200 text-gray-700 hover:scale-105 hover:bg-gray-300`}
        >
          التالي
        </button>
      </div>
    </section>
  );
};

export default TableComponent;
