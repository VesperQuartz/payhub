"use client";

import { useState } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  type SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample data for the dispute history
const disputeData = [
  {
    id: "DSP-001",
    transaction: "0x3a2d ... 9d8e",
    customer: "0x1a2b ... 9a8b",
    issue: "Double charged",
    resolution: "Refund issued",
    amount: "$3.50",
    dateResolved: "3/17/2024",
  },
  {
    id: "DSP-002",
    transaction: "0x5e4d ... 2e1d",
    customer: "0x7b9c ... 7s8t",
    issue: "Payment not received",
    resolution: "Transaction found in pending state",
    amount: "$4.50",
    dateResolved: "3/19/2024",
  },
  {
    id: "DSP-003",
    transaction: "0x5e4d ... 2e1d",
    customer: "0x7b9c ... 7s8t",
    issue: "Transaction reverted: Contract execution reverted",
    resolution: "ahahha",
    amount: "$4.50",
    dateResolved: "3/29/2025",
  },
  {
    id: "DSP-004",
    transaction: "0x3a2d ... 9d8e",
    customer: "0x1a2b ... 9a8b",
    issue: "Duplicate payment",
    resolution: "Confirmed payment received",
    amount: "$3.50",
    dateResolved: "3/29/2025",
  },
  {
    id: "DSP-005",
    transaction: "0x3a2d ... 9d8e",
    customer: "0x1a2b ... 9a8b",
    issue: "Duplicate payment",
    resolution: "Confirmed payment received",
    amount: "$3.50",
    dateResolved: "3/29/2025",
  },
];

// Define columns for the dispute history table
const columns: ColumnDef<(typeof disputeData)[0]>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "transaction",
    header: "Transaction",
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "issue",
    header: "Issue",
  },
  {
    accessorKey: "resolution",
    header: "Resolution",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "dateResolved",
    header: "Date Resolved",
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <Button
        variant="ghost"
        size="icon"
        className="text-orange-400 hover:text-orange-300"
      >
        <ExternalLink className="w-4 h-4" />
      </Button>
    ),
  },
];

export function DisputeHistory() {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: disputeData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-bold">Dispute History</h2>
        <p className="text-gray-400">Record of all resolved payment disputes</p>
      </div>

      <div className="bg-black border border-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-gray-800 hover:bg-gray-900"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-gray-400">
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
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="border-gray-800 hover:bg-gray-900"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-white">
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
                    className="h-24 text-center text-gray-500"
                  >
                    No resolved disputes found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end p-4 border-t border-gray-800">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="border-gray-700 text-orange-400 hover:bg-gray-800 hover:text-orange-300"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="border-gray-700 text-orange-400 hover:bg-gray-800 hover:text-orange-300"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
