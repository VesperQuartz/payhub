"use client";

import { useState, useMemo } from "react";
import { PaymentOverview } from "@/components/sales/payment-overview";
import { TransactionHistory } from "@/components/sales/transaction-history";
import { TransactionReceiptDialog } from "@/components/sales/transaction-receipt-dialog";
import { SelectTransaction } from "@/app/database/schema";
import { useGetTransactionByMerchantAddress } from "@/app/hooks/api";
import { useAccount } from "wagmi";

export default function SalesPage() {
  const [receiptTransaction, setReceiptTransaction] =
    useState<SelectTransaction | null>(null);
  const [receiptDialogOpen, setReceiptDialogOpen] = useState(false);
  const { address } = useAccount();
  const transactionData = useGetTransactionByMerchantAddress(address!);

  const { totalReceived, totalTransactions, successRate } = useMemo(() => {
    const totalReceived = transactionData.data
      ?.filter((tx) => tx.status === "completed")
      .reduce((sum, tx) => sum + tx.price, 0);

    const totalTransactions = transactionData.data?.length ?? 0;
    const tx =
      transactionData.data?.filter((tx) => tx?.status === "completed")
        ?.length ?? 0 / totalTransactions;

    const successRate = Math.round(tx * 100);

    return { totalReceived, totalTransactions, successRate };
  }, [transactionData]);

  const handleOpenReceipt = (transaction: SelectTransaction) => {
    setReceiptTransaction(transaction);
    setReceiptDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Payments</h1>
      </div>

      <PaymentOverview
        totalReceived={totalReceived ?? 0}
        totalTransactions={totalTransactions}
        successRate={successRate}
      />

      <TransactionHistory
        transactions={transactionData.data ?? []}
        onGenerateReceipt={handleOpenReceipt}
      />

      <TransactionReceiptDialog
        transaction={receiptTransaction}
        open={receiptDialogOpen}
        onOpenChange={setReceiptDialogOpen}
      />
    </div>
  );
}
