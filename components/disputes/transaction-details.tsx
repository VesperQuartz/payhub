"use client";

import { AlertCircle, AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface TransactionDetailsProps {
  details: {
    status: string;
    statusMessage: string;
    statusDescription: string;
    amount: string;
    fromWallet: string;
    toWallet: string;
    time: string;
    product: string;
    warning?: string;
    warningMessage?: string;
    warningDescription?: string;
    confirmations?: number;
  };
}

export function TransactionDetails({ details }: TransactionDetailsProps) {
  const getStatusBadge = () => {
    switch (details.status) {
      case "successful":
        return (
          <span className="px-2 py-1 bg-green-900 text-green-500 text-xs rounded">
            Successful
          </span>
        );
      case "failed":
        return (
          <span className="px-2 py-1 bg-red-900 text-red-400 text-xs rounded">
            Failed
          </span>
        );
      case "reverted":
        return (
          <span className="px-2 py-1 bg-red-900 text-red-400 text-xs rounded">
            Reverted
          </span>
        );
      case "pending":
        return (
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-orange-900 text-orange-400 text-xs rounded">
              Pending
            </span>
            <span className="text-gray-400 text-xs">
              ({details.confirmations} confirmations)
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  const getStatusIcon = () => {
    switch (details.status) {
      case "successful":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "failed":
      case "reverted":
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case "pending":
        return <Clock className="w-5 h-5 text-orange-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-medium mb-2">Step 2: Transaction Details</h3>
      <p className="text-gray-400 mb-4">
        Review the transaction details to understand the payment issue
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-black border border-gray-800 rounded-lg p-4">
          <h4 className="text-sm text-gray-400 mb-2">Transaction Status</h4>
          {getStatusBadge()}
        </div>

        <div className="bg-black border border-gray-800 rounded-lg p-4">
          <h4 className="text-sm text-gray-400 mb-2">Amount Sent</h4>
          <p className="text-white font-medium">{details.amount}</p>
        </div>

        <div className="bg-black border border-gray-800 rounded-lg p-4">
          <h4 className="text-sm text-gray-400 mb-2">From Wallet</h4>
          <p className="text-white font-medium text-sm truncate">
            {details.fromWallet}
          </p>
        </div>

        <div className="bg-black border border-gray-800 rounded-lg p-4">
          <h4 className="text-sm text-gray-400 mb-2">To Wallet</h4>
          <p className="text-white font-medium text-sm truncate">
            {details.toWallet}
          </p>
        </div>

        <div className="bg-black border border-gray-800 rounded-lg p-4">
          <h4 className="text-sm text-gray-400 mb-2">Transaction Time</h4>
          <p className="text-white font-medium">{details.time}</p>
        </div>

        <div className="bg-black border border-gray-800 rounded-lg p-4">
          <h4 className="text-sm text-gray-400 mb-2">Product</h4>
          <p className="text-white font-medium">{details.product}</p>
        </div>
      </div>

      <div
        className={`mt-4 p-4 rounded-lg flex items-start gap-3 ${
          details.status === "successful"
            ? "bg-green-900/20 text-green-500"
            : details.status === "failed" || details.status === "reverted"
              ? "bg-red-900/20 text-red-400"
              : "bg-orange-900/20 text-orange-400"
        }`}
      >
        {getStatusIcon()}
        <div>
          <h4 className="font-medium">{details.statusMessage}</h4>
          <p className="text-gray-400">{details.statusDescription}</p>
        </div>
      </div>

      {details.warning === "duplicate" && (
        <div className="mt-4 p-4 bg-orange-900/20 rounded-lg flex items-start gap-3 text-orange-400">
          <AlertTriangle className="w-5 h-5" />
          <div>
            <h4 className="font-medium">{details.warningMessage}</h4>
            <p className="text-gray-400">{details.warningDescription}</p>
          </div>
        </div>
      )}
    </div>
  );
}
