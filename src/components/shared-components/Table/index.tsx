import { ReactNode } from "react";

import {
  Table as ShadTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { cn } from "@/utils";

type ColumnDef<Data extends Record<"id", string>> = {
  headerName: string;
  field: string;
  textAlign?: "left" | "center" | "right";
  render?: (value: Data[keyof Data], row: Data) => ReactNode;
};

type TableProps<Data extends Record<"id", string>> = {
  name?: string;
  columnDefs: ColumnDef<Data>[];
  data: Data[];
  onRowClick?: (row: Data) => void;
};

function Table<Data extends Record<"id", string>>(props: TableProps<Data>) {
  const { columnDefs, data, name = "table", onRowClick } = props;
  return (
    <ShadTable className="border-separate border-spacing-y-3">
      <TableHeader className="mb-3">
        <TableRow className="border-none">
          {columnDefs.map((columnDef) => (
            <TableHead
              key={`${name}-head-${columnDef.field.toString()}`}
              className="h-auto text-center text-xs font-semibold leading-4.5 text-gray-500"
            >
              {columnDef.headerName}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((d) => (
          <TableRow
            key={`${name}-row-${d.id}`}
            className="rounded-lg border-none bg-white"
            onClick={() => onRowClick?.(d)}
          >
            {columnDefs.map((columnDef) => (
              <TableCell
                key={`${name}-cell-${columnDef.field.toString()}`}
                className={cn("h-16 p-2 text-sm font-normal text-gray-700", {
                  "text-left": columnDef.textAlign === "left",
                  "text-center": columnDef.textAlign === "center",
                  "text-right": columnDef.textAlign === "right"
                })}
              >
                {columnDef.render ? (
                  columnDef.render(d[columnDef.field as keyof Data], d)
                ) : (
                  <>{d[columnDef.field as keyof Data]}</>
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </ShadTable>
  );
}

export default Table;
