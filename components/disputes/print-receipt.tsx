"use client";

import { useRef } from "react";
import { X, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DebugTraceResponse } from "@/lib/custom-client";
import { toEthAddress } from "@/lib/utils";
import { useReactToPrint } from "react-to-print";
import { match } from "ts-pattern";

interface PrintReceiptProps {
  details: DebugTraceResponse | undefined;
  resolution: string;
  onClose: () => void;
}

export function PrintReceipt({
  details,
  resolution,
  onClose,
}: PrintReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef: receiptRef });

  const handlePrint = () => {
    reactToPrintFn();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <span>Transaction Receipt</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div ref={receiptRef} className="bg-white text-black p-6 rounded-md">
          <div className="text-center mb-6 pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold">LocalPayments</h2>
            <p className="text-gray-600">Transaction Receipt</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-600 text-sm">Transaction ID</p>
              <p className="font-medium">{toEthAddress(details?.[0].txHash)}</p>
            </div>

            <div>
              <p className="text-gray-600 text-sm">Date</p>
              <p className="font-medium">{new Date().toUTCString()}</p>
            </div>

            <div>
              <p className="text-gray-600 text-sm">Product</p>
              <p className="font-medium">{"N/A"}</p>
            </div>

            <div>
              <p className="text-gray-600 text-sm">Amount</p>
              <p className="font-medium">{details?.[0].result.amount}</p>
            </div>

            <div>
              <p className="text-gray-600 text-sm">From</p>
              <p className="font-medium">{details?.[0].result.from}</p>
            </div>

            <div>
              <p className="text-gray-600 text-sm">To</p>
              <p className="font-medium">{details?.[0].result.to}</p>
            </div>
          </div>

          <div
            className={`p-3 rounded-md mb-6 ${
              details?.[0].success === true
                ? "bg-green-100 text-green-800"
                : details?.[0].success === false
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
            }`}
          >
            <p className="font-medium">
              {match(details?.[0].success)
                .with(true, () => "Successful Transaction")
                .with(false, () => "Failed Transaction")
                .with(undefined, () => null)
                .exhaustive()}
            </p>
            <p className="text-sm">
              {match(details?.[0].success)
                .with(
                  true,
                  () =>
                    "This transaction was completed successfully and the payment has been received.",
                )
                .with(
                  false,
                  () =>
                    "This transaction failed to complete. Reason: Insufficient funds",
                )
                .with(undefined, () => null)
                .exhaustive()}
            </p>
          </div>

          <div className="bg-gray-100 p-3 rounded-md mb-6">
            <p className="text-gray-600 text-sm">Resolution</p>
            <p className="font-medium">
              {resolution || "No resolution provided"}
            </p>
          </div>

          <div className="text-center text-gray-500 text-sm">
            <p>This receipt was generated on {new Date().toLocaleString()}</p>
            <p>LocalPayments - Secure Blockchain Transactions</p>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button
            onClick={handlePrint}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print Receipt
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
