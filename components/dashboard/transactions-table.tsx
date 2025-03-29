import { ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SelectTransaction } from "@/app/database/schema";

type TransactionStatus = "completed" | "pending" | "disputed";

const getStatusStyles = (status: TransactionStatus) => {
  switch (status) {
    case "completed":
      return {
        bg: "bg-emerald-500/20",
        text: "text-emerald-500",
        label: "Completed",
      };
    case "pending":
      return {
        bg: "bg-yellow-500/20",
        text: "text-yellow-500",
        label: "Awaiting Confirmation",
      };
    case "disputed":
      return {
        bg: "bg-red-500/20",
        text: "text-red-500",
        label: "Disputed",
      };
  }
};

const TransactionsTable = ({
  transactions,
}: {
  transactions: SelectTransaction[];
}) => {
  return (
    <div className="rounded-lg border border-neutral-800 bg-black p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Transaction</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-neutral-400">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-neutral-400">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="border-neutral-800">
            <TableHead>Product name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions?.map((transaction) => {
            const statusStyles = getStatusStyles(transaction?.status);

            return (
              <TableRow key={transaction.id} className="border-neutral-800">
                <TableCell className="flex items-center gap-3">
                  <span>{transaction?.productName}</span>
                </TableCell>
                <TableCell>{transaction?.price}</TableCell>
                <TableCell>{transaction?.createdAt}</TableCell>
                <TableCell>
                  <span
                    className={`rounded-md ${statusStyles?.bg} px-3 py-1 text-sm ${statusStyles?.text}`}
                  >
                    {statusStyles?.label}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionsTable;
