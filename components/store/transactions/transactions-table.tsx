"use client";

import { useState } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { ArrowUpDown, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/sales/status-badge";
import { SelectTransaction } from "@/app/database/schema";
import { TransactionStatus } from "@/types/types";
import { toEthAddress } from "@/lib/utils";

interface TransactionsTableProps {
  transactions: SelectTransaction[];
  globalFilter: string;
  onViewReceipt: (transaction: SelectTransaction) => void;
}

export function TransactionsTable({
  transactions,
  globalFilter,
  onViewReceipt,
}: TransactionsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  // Define columns for tanstack table
  const columns: ColumnDef<SelectTransaction>[] = [
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("createdAt")}</div>
      ),
    },
    {
      accessorKey: "merchantAddress",
      header: "Merchant",
      cell: ({ row }) => {
        const merchant = row.getValue("merchantAddress") as `0x${string}`;
        return <div>{toEthAddress(merchant)}</div>;
      },
    },
    {
      accessorKey: "productName",
      header: "Product",
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <div className="flex items-center justify-end">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("price"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as TransactionStatus;
        return <StatusBadge status={status} />;
      },
    },
    {
      id: "actions",
      header: "Receipt",
      cell: ({ row }) => {
        const transaction = row.original;
        return (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onViewReceipt(transaction)}
            disabled={transaction.status === "disputed"}
            title={
              transaction.status === "disputed"
                ? "No receipt available for failed transactions"
                : "View receipt"
            }
          >
            <Printer className="h-4 w-4" />
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
    },
  });

  return (
    <div>
      <div className="rounded-md border border-gray-800 overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-gray-800 hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-gray-800 hover:bg-gray-900/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-gray-400">
          Showing {table.getRowModel().rows.length} of {transactions.length}{" "}
          transactions
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="border-gray-800 text-white bg-orange-500 hover:bg-orange-600"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="border-gray-800 text-white bg-orange-500 hover:bg-orange-600"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
