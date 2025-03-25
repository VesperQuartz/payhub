"use client";

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
import { useRef } from "react";
import { SelectTransaction } from "@/app/database/schema";

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
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrintReceipt = () => {
    if (!transaction || !receiptRef.current) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const receiptContent = receiptRef.current.innerHTML;

    printWindow.document.write(`
      <html>
        <head>
          <title>PAYHUB - Transaction Receipt</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              max-width: 800px;
              margin: 0 auto;
            }
            .receipt {
              border: 1px solid #eee;
              padding: 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .detail {
              display: flex;
              justify-content: space-between;
              border-bottom: 1px solid #eee;
              padding: 8px 0;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 14px;
            }
            .completed { color: #10b981; }
            .pending { color: #f59e0b; }
            .failed { color: #ef4444; }
          </style>
        </head>
        <body>
          <div class="receipt">
            ${receiptContent}
          </div>
        </body>
      </html>
    `);

    // Trigger print and close the window after printing
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.onafterprint = () => printWindow.close();
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
            <div className="header">
              <h3 className="text-xl font-bold">PAYHUB</h3>
              <p className="text-sm">Transaction Receipt</p>
            </div>

            <div className="space-y-4">
              <div className="detail">
                <span className="font-medium">Transaction ID:</span>
                <span>{transaction.id}</span>
              </div>

              <div className="detail">
                <span className="font-medium">Date:</span>
                <span>{transaction.createdAt}</span>
              </div>

              <div className="detail">
                <span className="font-medium">Product:</span>
                <span>{transaction.productName}</span>
              </div>

              <div className="detail">
                <span className="font-medium">Amount:</span>
                <span>${transaction.price.toFixed(2)} PYUSD</span>
              </div>

              <div className="detail">
                <span className="font-medium">Customer:</span>
                <span className="font-mono text-sm">
                  {transaction.customerAddress}
                </span>
              </div>

              <div className="detail">
                <span className="font-medium">Status:</span>
                <span
                  className={
                    transaction.status === "completed"
                      ? "completed"
                      : transaction.status === "pending"
                        ? "pending"
                        : "failed"
                  }
                >
                  {transaction.status.charAt(0).toUpperCase() +
                    transaction.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="footer">
              <p>Thank you for using PAYHUB!</p>
              <p className="text-xs mt-2">
                This receipt serves as proof of transaction.
              </p>
            </div>
          </div>
        )}

        <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button
            variant="outline"
            className="border-neutral-800 text-white bg-[#FF6B00] hover:bg-[#E05E00]"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          <Button
            variant="outline"
            className="border-neutral-800 text-white bg-[#FF6B00] hover:bg-[#E05E00]"
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
