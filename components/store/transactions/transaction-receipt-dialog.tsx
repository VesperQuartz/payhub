"use client";

import React from "react";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { SelectTransaction } from "@/app/database/schema";
import { toEthAddress } from "@/lib/utils";
import { useReactToPrint } from "react-to-print";

interface TransactionReceiptDialogProps {
  transaction: SelectTransaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TransactionReceiptDialog({
  transaction,
  open,
  onOpenChange,
}: TransactionReceiptDialogProps) {
  const receiptRef = React.useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef: receiptRef });
  const handlePrintReceipt = () => {
    reactToPrintFn();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-black border-neutral-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Transaction Receipt
          </DialogTitle>
          <DialogDescription className="text-neutral-400">
            Receipt for transaction {transaction?.id}
          </DialogDescription>
        </DialogHeader>

        {transaction && (
          <div ref={receiptRef} className="bg-white text-black p-6 rounded-md">
            <div className="text-center border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-2xl font-bold">PAYHUB</h2>
              <p className="text-gray-600">Transaction Receipt</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium">Transaction ID:</span>
                <span>{transaction.id}</span>
              </div>

              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium">Date:</span>
                <span>{transaction.createdAt}</span>
              </div>

              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium">Merchant:</span>
                <span>{toEthAddress(transaction.merchantAddress)}</span>
              </div>

              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium">Product:</span>
                <span>{transaction.productName}</span>
              </div>

              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium">Amount:</span>
                <span>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(transaction.price)}{" "}
                  PYUSD
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium">Status:</span>
                <span
                  className={
                    transaction.status === "completed"
                      ? "text-green-600"
                      : transaction.status === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                  }
                >
                  {transaction.status.charAt(0).toUpperCase() +
                    transaction.status.slice(1)}
                </span>
              </div>

              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="font-medium">Transaction Hash:</span>
                <span className="font-mono text-sm">
                  {toEthAddress(transaction.txHash)}
                </span>
              </div>
            </div>

            <div className="text-center mt-8 pt-4 border-t border-gray-200">
              <p className="font-medium">Thank you for using PAYHUB!</p>
              <p className="text-sm text-gray-600 mt-1">
                This receipt serves as proof of transaction.
              </p>
            </div>
          </div>
        )}

        <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button
            variant="outline"
            className="printContent border-neutral-800 text-white hover:bg-neutral-900"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          <Button
            className="printContent bg-[#FF6B00] hover:bg-[#E05E00]"
            onClick={handlePrintReceipt}
          >
            <Printer className="h-4 w-4 mr-2" />
            Print Receipt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
