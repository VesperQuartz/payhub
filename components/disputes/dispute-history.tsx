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
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { SelectDispute } from "@/app/database/schema";
import { toEthAddress } from "@/lib/utils";
import { useGetDisputeByMerchantAddress } from "@/app/hooks/api";
import { useAccount } from "wagmi";

const columns: ColumnDef<SelectDispute>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "merchantAddress",
    header: "Transaction",
    cell: ({ row }) => {
      const { merchantAddress } = row.original;
      return <>{toEthAddress(merchantAddress)}</>;
    },
  },
  {
    accessorKey: "customerAddress",
    header: "Customer",
    cell: ({ row }) => {
      const { customerAddress } = row.original;
      return <>{toEthAddress(customerAddress)}</>;
    },
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
    accessorKey: "price",
    header: "Amount",
  },
  {
    accessorKey: "createdAt",
    header: "Date Resolved",
  },
];

export function DisputeHistory() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { address } = useAccount();
  const dispute = useGetDisputeByMerchantAddress(address);
  const table = useReactTable({
    data: dispute?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  if (dispute.isLoading) {
    return null;
  }

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
