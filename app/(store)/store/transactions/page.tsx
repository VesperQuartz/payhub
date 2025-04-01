"use client";

import { useState } from "react";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TransactionStatus } from "@/types/types";
import { TransactionsTable } from "@/components/store/transactions/transactions-table";
import { TransactionReceiptDialog } from "@/components/store/transactions/transaction-receipt-dialog";
import { useGetTransactionByCustomerAddress } from "@/app/hooks/api";
import { useAccount } from "wagmi";
import { SelectTransaction } from "@/app/database/schema";

const TransactionsPage = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | "all">(
    "all",
  );
  const [selectedTransaction, setSelectedTransaction] =
    useState<SelectTransaction | null>(null);
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false);
  const { address } = useAccount();
  const transactions = useGetTransactionByCustomerAddress(address!);

  const filteredTransactions =
    statusFilter === "all"
      ? transactions.data
      : transactions.data?.filter(
          (transaction) => transaction.status === statusFilter,
        );

  const handleViewReceipt = (transaction: SelectTransaction) => {
    setSelectedTransaction(transaction);
    setReceiptDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Transaction History</h1>
          <p className="text-neutral-400">
            View and manage your PYUSD payment history
          </p>
        </div>

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

          <div className="flex gap-2">
            <Select
              value={statusFilter}
              onValueChange={(value) =>
                setStatusFilter(value as TransactionStatus | "all")
              }
            >
              <SelectTrigger className="w-[180px] bg-neutral-900 border-neutral-800">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 text-white border-neutral-800">
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TransactionsTable
          transactions={filteredTransactions ?? []}
          globalFilter={globalFilter}
          onViewReceipt={handleViewReceipt}
        />

        <TransactionReceiptDialog
          transaction={selectedTransaction}
          open={receiptDialogOpen}
          onOpenChange={setReceiptDialogOpen}
        />
      </div>
    </div>
  );
};
export default TransactionsPage;
