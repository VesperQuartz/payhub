/* eslint-disable @typescript-eslint/no-explicit-any */

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

interface PrintReceiptProps {
  details: any;
  resolution: string;
  onClose: () => void;
}

export function PrintReceipt({
  details,
  resolution,
  onClose,
}: PrintReceiptProps) {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const receiptContent = receiptRef.current;
    if (!receiptContent) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const html = `
      <html>
        <head>
          <title>Transaction Receipt</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              color: #000;
            }
            .receipt {
              max-width: 400px;
              margin: 0 auto;
              border: 1px solid #ccc;
              padding: 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
              border-bottom: 1px solid #eee;
              padding-bottom: 10px;
            }
            .logo {
              font-weight: bold;
              font-size: 24px;
              margin-bottom: 5px;
            }
            .detail {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
            }
            .label {
              font-weight: bold;
              color: #555;
            }
            .value {
              text-align: right;
            }
            .status {
              margin: 15px 0;
              padding: 10px;
              border-radius: 4px;
              text-align: center;
            }
            .successful {
              background-color: #d4edda;
              color: #155724;
            }
            .failed, .reverted {
              background-color: #f8d7da;
              color: #721c24;
            }
            .pending {
              background-color: #fff3cd;
              color: #856404;
            }
            .footer {
              margin-top: 20px;
              text-align: center;
              font-size: 12px;
              color: #777;
            }
            .resolution {
              margin-top: 20px;
              padding: 10px;
              background-color: #e9ecef;
              border-radius: 4px;
            }
          </style>
        </head>
        <body>
          <div class="receipt">
            <div class="header">
              <div class="logo">LocalPayments</div>
              <div>Transaction Receipt</div>
            </div>
            
            <div class="detail">
              <span class="label">Transaction ID:</span>
              <span class="value">${details.fromWallet.substring(0, 10)}...${details.fromWallet.substring(details.fromWallet.length - 4)}</span>
            </div>
            
            <div class="detail">
              <span class="label">Date:</span>
              <span class="value">${details.time}</span>
            </div>
            
            <div class="detail">
              <span class="label">Product:</span>
              <span class="value">${details.product}</span>
            </div>
            
            <div class="detail">
              <span class="label">Amount:</span>
              <span class="value">${details.amount}</span>
            </div>
            
            <div class="detail">
              <span class="label">From:</span>
              <span class="value">${details.fromWallet.substring(0, 6)}...${details.fromWallet.substring(details.fromWallet.length - 4)}</span>
            </div>
            
            <div class="detail">
              <span class="label">To:</span>
              <span class="value">${details.toWallet.substring(0, 6)}...${details.toWallet.substring(details.toWallet.length - 4)}</span>
            </div>
            
            <div class="status ${details.status}">
              ${details.statusMessage}: ${details.statusDescription}
            </div>
            
            <div class="resolution">
              <div class="label">Resolution:</div>
              <div>${resolution || "No resolution provided"}</div>
            </div>
            
            <div class="footer">
              <p>This receipt was generated on ${new Date().toLocaleString()}</p>
              <p>LocalPayments - Secure Blockchain Transactions</p>
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
              window.onfocus = function() { window.close(); }
            }
          </script>
        </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
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
              <p className="font-medium">
                {details.fromWallet.substring(0, 10)}...
                {details.fromWallet.substring(details.fromWallet.length - 4)}
              </p>
            </div>

            <div>
              <p className="text-gray-600 text-sm">Date</p>
              <p className="font-medium">{details.time}</p>
            </div>

            <div>
              <p className="text-gray-600 text-sm">Product</p>
              <p className="font-medium">{details.product}</p>
            </div>

            <div>
              <p className="text-gray-600 text-sm">Amount</p>
              <p className="font-medium">{details.amount}</p>
            </div>

            <div>
              <p className="text-gray-600 text-sm">From</p>
              <p className="font-medium">
                {details.fromWallet.substring(0, 6)}...
                {details.fromWallet.substring(details.fromWallet.length - 4)}
              </p>
            </div>

            <div>
              <p className="text-gray-600 text-sm">To</p>
              <p className="font-medium">
                {details.toWallet.substring(0, 6)}...
                {details.toWallet.substring(details.toWallet.length - 4)}
              </p>
            </div>
          </div>

          <div
            className={`p-3 rounded-md mb-6 ${
              details.status === "successful"
                ? "bg-green-100 text-green-800"
                : details.status === "failed" || details.status === "reverted"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
            }`}
          >
            <p className="font-medium">{details.statusMessage}</p>
            <p className="text-sm">{details.statusDescription}</p>
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
