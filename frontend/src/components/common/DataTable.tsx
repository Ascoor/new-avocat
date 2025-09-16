import React, { useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Eye,
  MoreHorizontal,
  Pencil,
  Search,
  Trash2
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export interface DataTableHeader<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  headers: DataTableHeader<T>[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
  isLoading?: boolean;
}

const DEFAULT_PAGE_SIZE = 10;

const getNestedValue = <T,>(row: T, key: keyof T | string): unknown => {
  if (typeof key === "string" && key.includes(".")) {
    return key.split(".").reduce<unknown>((acc, part) => {
      if (acc && typeof acc === "object" && part in (acc as Record<string, unknown>)) {
        return (acc as Record<string, unknown>)[part];
      }
      return undefined;
    }, row as unknown as Record<string, unknown>);
  }

  return (row as Record<string, unknown>)[key as keyof T];
};

const getSearchableString = (value: unknown): string => {
  if (value === null || value === undefined) {
    return "";
  }

  if (Array.isArray(value)) {
    return value.map(item => getSearchableString(item)).join(" ");
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === "object") {
    return Object.values(value as Record<string, unknown>)
      .map(item => getSearchableString(item))
      .join(" ");
  }

  return String(value);
};

const getRowId = <T,>(row: T): string | null => {
  const candidate =
    (row as Record<string, unknown>).id ??
    (row as Record<string, unknown>)._id ??
    (row as Record<string, unknown>).uuid ??
    (row as Record<string, unknown>).slug;

  if (candidate === null || candidate === undefined) {
    return null;
  }

  return String(candidate);
};

const DataTable = <T extends Record<string, unknown>>({
  data,
  headers,
  onEdit,
  onDelete,
  onView,
  isLoading = false
}: DataTableProps<T>) => {
  const { t, isRTL, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, data.length]);

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) {
      return data;
    }

    const query = searchTerm.trim().toLowerCase();

    return data.filter(row =>
      headers.some(header => {
        const rawValue = getNestedValue(row, header.key);
        const searchable = getSearchableString(rawValue).toLowerCase();
        return searchable.includes(query);
      })
    );
  }, [data, headers, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / DEFAULT_PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * DEFAULT_PAGE_SIZE;
    return filteredData.slice(start, start + DEFAULT_PAGE_SIZE);
  }, [filteredData, page]);

  const numberFormatter = useMemo(() => {
    const locale = language === "ar" ? "ar-EG" : "en-US";
    return new Intl.NumberFormat(locale);
  }, [language]);

  const availableActions = useMemo(
    () =>
      [
        onView && {
          key: "view",
          label: t("common.view"),
          icon: Eye,
          handler: onView
        },
        onEdit && {
          key: "edit",
          label: t("common.edit"),
          icon: Pencil,
          handler: onEdit
        },
        onDelete && {
          key: "delete",
          label: t("common.delete"),
          icon: Trash2,
          handler: onDelete,
          destructive: true
        }
      ].filter(Boolean) as Array<{
        key: string;
        label: string;
        icon: LucideIcon;
        handler: (id: string) => void;
        destructive?: boolean;
      }>,
    [onDelete, onEdit, onView, t]
  );

  const hasActions = availableActions.length > 0;
  const emptyStateMessage = searchTerm ? t("table.noResults") : t("common.noData");

  const formatCellValue = (value: unknown): React.ReactNode => {
    if (value === null || value === undefined || value === "") {
      return <span className="text-muted-foreground">—</span>;
    }

    if (value instanceof Date) {
      return value.toLocaleDateString(language === "ar" ? "ar-EG" : "en-US");
    }

    if (typeof value === "number") {
      return numberFormatter.format(value);
    }

    if (Array.isArray(value)) {
      return value.length ? value.join(", ") : <span className="text-muted-foreground">—</span>;
    }

    return String(value);
  };

  const renderActions = (row: T) => {
    if (!hasActions) {
      return null;
    }

    const rowId = getRowId(row);

    if (!rowId) {
      return (
        <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">{t("common.actions")}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={isRTL ? "start" : "end"} className="min-w-[10rem]">
          {availableActions.map(action => (
            <DropdownMenuItem
              key={action.key}
              onClick={() => action.handler(rowId)}
              className={cn(
                action.destructive && "text-destructive focus:text-destructive"
              )}
            >
              <span
                className={cn(
                  "flex items-center gap-2",
                  isRTL ? "flex-row-reverse" : "flex-row"
                )}
              >
                <action.icon className="h-4 w-4" />
                <span>{action.label}</span>
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const renderMobileActions = (row: T) => {
    if (!hasActions) {
      return null;
    }

    const rowId = getRowId(row);

    return (
      <div
        className={cn(
          "flex flex-wrap gap-2 pt-3",
          isRTL ? "justify-start" : "justify-end"
        )}
      >
        {availableActions.map(action => (
          <Button
            key={action.key}
            variant={action.destructive ? "destructive" : "outline"}
            size="sm"
            onClick={() => rowId && action.handler(rowId)}
            disabled={!rowId}
            className={cn(
              "flex items-center gap-2",
              isRTL ? "flex-row-reverse" : "flex-row"
            )}
          >
            <action.icon className="h-4 w-4" />
            <span>{action.label}</span>
          </Button>
        ))}
      </div>
    );
  };

  const renderDesktopTable = () => (
    <div className="hidden md:block">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            {headers.map(header => (
              <TableHead
                key={String(header.key)}
                className={cn(
                  "font-semibold text-foreground",
                  isRTL ? "text-right" : "text-left"
                )}
              >
                {t(header.label)}
              </TableHead>
            ))}
            {hasActions && (
              <TableHead
                className={cn(
                  "w-[60px]", 
                  isRTL ? "text-left" : "text-right"
                )}
              >
                <span className="sr-only">{t("common.actions")}</span>
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row, index) => (
            <TableRow key={getRowId(row) ?? `row-${index}`} className="hover:bg-muted/30">
              {headers.map(header => (
                <TableCell
                  key={String(header.key)}
                  className={cn(
                    "align-top text-sm", 
                    isRTL ? "text-right" : "text-left"
                  )}
                >
                  {header.render
                    ? header.render(row)
                    : formatCellValue(getNestedValue(row, header.key))}
                </TableCell>
              ))}
              {hasActions && (
                <TableCell className={cn(isRTL ? "text-left" : "text-right")}>{renderActions(row)}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  const renderMobileList = () => (
    <div className="space-y-4 md:hidden">
      {paginatedData.map((row, index) => (
        <div
          key={getRowId(row) ?? `mobile-row-${index}`}
          className="rounded-lg border border-border/50 bg-card/60 p-4 shadow-sm"
        >
          <div className="space-y-3">
            {headers.map(header => (
              <div key={String(header.key)} className="flex flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {t(header.label)}
                </span>
                <div className="text-sm text-foreground">
                  {header.render
                    ? header.render(row)
                    : formatCellValue(getNestedValue(row, header.key))}
                </div>
              </div>
            ))}
            {renderMobileActions(row)}
          </div>
        </div>
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <Card className="border border-border/60 bg-card/60">
        <div className="p-4 md:p-6 space-y-4">
          <Skeleton className="h-10 w-full md:w-64" />
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border border-border/60 bg-card/60">
      <div className="p-4 md:p-6 space-y-4">
        <div
          className={cn(
            "flex flex-col gap-4 md:flex-row md:items-center md:justify-between",
            isRTL ? "md:flex-row-reverse" : "md:flex-row"
          )}
        >
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">
              {t("table.showing")} {paginatedData.length ? (page - 1) * DEFAULT_PAGE_SIZE + 1 : 0}
              {paginatedData.length ? `-${Math.min(page * DEFAULT_PAGE_SIZE, filteredData.length)}` : ""} {t("table.of")} {filteredData.length} {t("table.entries")}
            </p>
          </div>
          <div className="w-full md:w-auto">
            <div className="relative">
              <Search
                className={cn(
                  "pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
                  isRTL ? "right-3" : "left-3"
                )}
              />
              <Input
                value={searchTerm}
                onChange={event => setSearchTerm(event.target.value)}
                placeholder={t("table.search")}
                className={cn(
                  "w-full md:w-64",
                  isRTL ? "pr-10 pl-4" : "pl-10 pr-4"
                )}
                aria-label={t("table.search")}
              />
            </div>
          </div>
        </div>

        {filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border/60 bg-muted/20 py-12 text-center">
            <p className="text-sm font-medium text-muted-foreground">{emptyStateMessage}</p>
          </div>
        ) : (
          <>
            {renderDesktopTable()}
            {renderMobileList()}
          </>
        )}

        {filteredData.length > 0 && (
          <div
            className={cn(
              "flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between",
              isRTL ? "sm:flex-row-reverse" : "sm:flex-row"
            )}
          >
            <span className="text-sm text-muted-foreground">
              {t("table.page")} {page} / {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                disabled={page === 1}
              >
                {t("table.previous")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                disabled={page === totalPages || filteredData.length === 0}
              >
                {t("table.next")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default DataTable;
