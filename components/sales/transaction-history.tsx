"use client";

import { useState, useMemo } from "react";
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
import { Search, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SelectTransaction } from "@/app/database/schema";
import { TransactionStatus } from "@/types/types";
import { StatusBadge } from "./status-badge";
import { toEthAddress } from "@/lib/utils";

interface TransactionHistoryProps {
  transactions: SelectTransaction[];
  onGenerateReceipt: (transaction: SelectTransaction) => void;
}

export function TransactionHistory({
  transactions,
  onGenerateReceipt,
}: TransactionHistoryProps) {
  // State for sorting, filtering
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [activeFilter, setActiveFilter] = useState<TransactionStatus | "all">(
    "all",
  );

  const columns = useMemo<ColumnDef<SelectTransaction>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Transaction ID",
        cell: ({ row }) => (
          <div className="font-medium">tx-{row.getValue("id")}</div>
        ),
      },
      {
        accessorKey: "customerAddress",
        header: "Customer",
        cell: ({ row }) => (
          <div className="font-mono text-sm">
            {toEthAddress(row.getValue("customerAddress"))}
          </div>
        ),
      },
      {
        accessorKey: "productName",
        header: "Product",
      },
      {
        accessorKey: "price",
        header: "Amount",
        cell: ({ row }) => (
          <div>${(row.getValue("price") as number).toFixed(2)}</div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Date",
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
        cell: ({ row }) => {
          const transaction = row.original;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <FileText className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-neutral-900 text-white border-neutral-800"
              >
                <DropdownMenuItem
                  className="hover:bg-neutral-800 cursor-pointer"
                  onClick={() => onGenerateReceipt(transaction)}
                >
                  Generate Receipt
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [onGenerateReceipt],
  );

  const filteredData = useMemo(
    () =>
      activeFilter === "all"
        ? transactions
        : transactions.filter(
            (transaction) => transaction.status === activeFilter,
          ),
    [transactions, activeFilter],
  );

  const table = useReactTable({
    data: filteredData,
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
    <div className="border border-neutral-800 rounded-lg p-6 bg-black">
      <h2 className="text-xl font-semibold mb-6">Transaction History</h2>

      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="relative w-full md:w-auto md:min-w-[300px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-neutral-400" />
          <Input
            placeholder="Search transactions..."
            className="pl-10 border-neutral-800 bg-neutral-900 text-white"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>

        <Tabs
          defaultValue={activeFilter}
          value={activeFilter}
          onValueChange={(value) =>
            setActiveFilter(value as TransactionStatus | "all")
          }
          className="w-full md:w-auto"
        >
          <TabsList className="bg-neutral-900 w-full md:w-auto grid grid-cols-4">
            <TabsTrigger
              value="all"
              className={
                activeFilter === "all"
                  ? "data-[state=active]:bg-neutral-800"
                  : ""
              }
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className={
                activeFilter === "completed"
                  ? "data-[state=active]:bg-neutral-800 data-[state=active]:text-emerald-500"
                  : ""
              }
            >
              Completed
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className={
                activeFilter === "pending"
                  ? "data-[state=active]:bg-neutral-800 data-[state=active]:text-amber-500"
                  : ""
              }
            >
              Pending
            </TabsTrigger>
            <TabsTrigger
              value="disputed"
              className={
                activeFilter === "disputed"
                  ? "data-[state=active]:bg-neutral-800 data-[state=active]:text-red-500"
                  : ""
              }
            >
              Failed
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="rounded-md border border-neutral-800 overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-neutral-800 hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
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
                  No transactions found.
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
