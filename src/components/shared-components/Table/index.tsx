import { ReactNode } from "react";

import ActionMenu from "@/components/shared-components/ActionMenu";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import {
  Table as ShadTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useToast } from "@/hooks/useToast.ts";
import { MenuItem } from "@/types/global.ts";
import { cn } from "@/utils";

type ColumnDef<Data extends Record<"id", string>> = {
  headerName: string;
  field: string;
  textAlign?: "left" | "center" | "right";
  render?: (value: Data[keyof Data], row: Data) => ReactNode;
  copyOnClick?: boolean;
  defaultValue?: unknown;
};

type TableProps<Data extends Record<"id", string>> = {
  name?: string;
  columnDefs: ColumnDef<Data>[];
  data: Data[];
  onRowClick?: (row: Data) => void;
  headerCellClassName?: string;
  cellClassName?: string;
  showActionColumn?: boolean;
  actionMenuItems?: MenuItem[] | ((data: Data) => MenuItem[]);
  loadingIds?: string[];

  onRowActionClick?(value: string, data: Data): void;
};

function Table<Data extends Record<"id", string>>(props: TableProps<Data>) {
  const {
    columnDefs,
    data,
    name = "table",
    onRowClick,
    headerCellClassName = "",
    cellClassName = "",
    showActionColumn,
    actionMenuItems = [],
    onRowActionClick,
    loadingIds = []
  } = props;

  const { toast } = useToast();

  return (
    <ShadTable className="border-separate border-spacing-y-3">
      <TableHeader className="mb-3">
        <TableRow className="border-none">
          {columnDefs.map((columnDef) => (
            <TableHead
              key={`${name}-head-${columnDef.field.toString()}`}
              className={cn(
                "h-auto px-2 text-center text-xs font-semibold leading-4.5 text-gray-500",
                headerCellClassName
              )}
            >
              {columnDef.headerName}
            </TableHead>
          ))}
          {showActionColumn && (
            <TableHead
              key={`${name}-head-action`}
              className={cn(
                "h-auto px-2 text-center text-xs font-semibold leading-4.5 text-gray-500",
                headerCellClassName
              )}
            >
              Actions
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((d) => (
          <TableRow
            key={`${name}-row-${d.id}`}
            className="rounded-lg border-none bg-white"
            onClick={() => onRowClick?.(d)}
          >
            {columnDefs.map((columnDef) => {
              if (loadingIds.includes(d.id)) {
                return (
                  <TableCell
                    key={`${name}-cell-${columnDef.field.toString()}-loading`}
                  >
                    <Skeleton className="h-8 w-full" />
                  </TableCell>
                );
              }

              return (
                <TableCell
                  key={`${name}-cell-${columnDef.field.toString()}`}
                  className={cn(
                    "h-16 p-2 text-sm font-normal text-gray-700",
                    cellClassName,
                    {
                      "text-left": columnDef.textAlign === "left",
                      "text-center": columnDef.textAlign === "center",
                      "text-right": columnDef.textAlign === "right"
                    }
                  )}
                  onClick={() => {
                    if (columnDef.copyOnClick) {
                      const value = d[columnDef.field as keyof Data] as unknown;
                      let copyableValue = "";
                      if (typeof value === "string") {
                        copyableValue = value;
                      } else if (typeof value === "number") {
                        copyableValue = value.toString();
                      } else if (typeof value === "boolean") {
                        copyableValue = value.toString();
                      }

                      if (copyableValue) {
                        void navigator.clipboard
                          .writeText(copyableValue)
                          .then(() => {
                            toast({
                              title: "Copied to clipboard"
                            });
                          });
                      }
                    }
                  }}
                >
                  {columnDef.render ? (
                    columnDef.render(
                      d[columnDef.field as keyof Data] ??
                        (columnDef.defaultValue as Data[keyof Data]),
                      d
                    )
                  ) : (
                    <>
                      {d[columnDef.field as keyof Data] ??
                        columnDef.defaultValue}
                    </>
                  )}
                </TableCell>
              );
            })}
            {showActionColumn && !loadingIds.includes(d.id) ? (
              <TableCell
                key={`${name}-cell-action`}
                className={cn(
                  "h-16 p-2 text-sm font-normal text-gray-700",
                  cellClassName
                )}
              >
                <ActionMenu
                  menuItems={
                    typeof actionMenuItems === "function"
                      ? actionMenuItems(d)
                      : actionMenuItems
                  }
                  onItemClick={(value) => {
                    onRowActionClick?.(value, d);
                  }}
                />
              </TableCell>
            ) : (
              <TableCell key={`${name}-cell-action-loading`}>
                <Skeleton className="h-8 w-full" />
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </ShadTable>
  );
}

export default Table;
