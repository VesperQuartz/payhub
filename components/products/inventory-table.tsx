"use client";

import React, { useState } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  getFilteredRowModel,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SelectProduct } from "@/app/database/schema";
import { getStatusBadgeClass } from "@/lib/utils";

interface InventoryTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onUpdateStock?: (product: TData, newStock: number) => void;
}

export function InventoryTable<TData, TValue>({
  columns,
  data,
}: InventoryTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-neutral-400" />
          <Input
            placeholder="Search inventory..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10 border-neutral-800 bg-neutral-900 text-white"
          />
        </div>
      </div>
      <div className="rounded-md border border-neutral-800">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-neutral-800 hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-neutral-800 hover:bg-neutral-900/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="border-neutral-800 text-white bg-[#FF6B00] hover:bg-[#E05E00]"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="border-neutral-800 text-white bg-[#FF6B00] hover:bg-[#E05E00]"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export function getInventoryColumns(
  onUpdateStock?: (product: SelectProduct, newStock: number) => void,
): ColumnDef<SelectProduct>[] {
  return [
    {
      accessorKey: "productName",
      header: "Product Name",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("productName")}</div>
      ),
    },
    {
      accessorKey: "productCategory",
      header: "Category",
      cell: ({ row }) => {
        const category = row.getValue("productCategory") as string;
        return <div className="capitalize">{category}</div>;
      },
    },
    {
      accessorKey: "stock",
      header: "Current Stock",
      cell: ({ row }) => {
        const stock = row.getValue("stock") as number;
        return <div>{stock}</div>;
      },
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => {
        const status = row.getValue("stock") as number;
        return (
          <span
            className={`rounded-full px-2 py-1 text-xs} ${getStatusBadgeClass(status)[0]}`}
          >
            {getStatusBadgeClass(status)[1]}
          </span>
        );
      },
    },
    {
      id: "updateStock",
      header: "Update Stock",
      cell: ({ row }) => {
        const product = row.original;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [stockValue, setStockValue] = React.useState(product.stock);

        return (
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              min="0"
              value={stockValue}
              onChange={(e) =>
                setStockValue(Number.parseInt(e.target.value) || 0)
              }
              className="w-20 h-8 bg-neutral-900 border-neutral-800 text-white"
            />
            <Button
              variant="outline"
              size="sm"
              className="h-8 border-neutral-800 text-white hover:bg-neutral-800 bg-[#FF6B00] hover:text-white"
              onClick={() => {
                if (onUpdateStock) {
                  onUpdateStock(product, stockValue);
                }
              }}
            >
              Update
            </Button>
          </div>
        );
      },
    },
  ];
}
