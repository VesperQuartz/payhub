"use client";

import { DebugTraceResponse } from "@/lib/custom-client";
import { AlertCircle, CheckCircle } from "lucide-react";
import { match } from "ts-pattern";
import { Skeleton } from "@/components/ui/skeleton";

function TransactionDetailsSkeleton() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6 mb-6">
      <Skeleton className="h-6 w-48 mb-2" />
      <Skeleton className="h-5 w-96 mb-4" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-black border border-gray-800 rounded-lg p-3 sm:p-4"
          >
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-5 w-32" />
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 sm:p-4 rounded-lg bg-gray-900/20 flex items-start gap-3">
        <Skeleton className="h-5 w-5" />
        <div className="flex-1">
          <Skeleton className="h-5 w-48 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
      </div>
    </div>
  );
}

export function TransactionDetails({
  details,
}: {
  details: DebugTraceResponse | undefined;
}) {
  if (!details) {
    return <TransactionDetailsSkeleton />;
  }

  const getStatusBadge = () => {
    switch (details[0].success) {
      case true:
        return (
          <span className="px-2 py-1 bg-green-900 text-green-500 text-xs rounded">
            Successful
          </span>
        );
      case false:
        return (
          <span className="px-2 py-1 bg-red-900 text-red-400 text-xs rounded">
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  const getStatusIcon = () => {
    switch (details[0].success) {
      case true:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case false:
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6 mb-6">
      <h3 className="text-lg font-medium mb-2">Step 2: Transaction Details</h3>
      <p className="text-gray-400 mb-4">
        Review the transaction details to understand the payment issue
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-black border border-gray-800 rounded-lg p-3 sm:p-4">
          <h4 className="text-sm text-gray-400 mb-2">Transaction Status</h4>
          {getStatusBadge()}
        </div>

        <div className="bg-black border border-gray-800 rounded-lg p-3 sm:p-4">
          <h4 className="text-sm text-gray-400 mb-2">Amount Sent</h4>
          <p className="text-white font-medium">{details[0].result.amount}</p>
        </div>

        <div className="bg-black border border-gray-800 rounded-lg p-3 sm:p-4">
          <h4 className="text-sm text-gray-400 mb-2">From Wallet</h4>
          <p className="text-white font-medium text-sm truncate">
            {details[0].result.from}
          </p>
        </div>

        <div className="bg-black border border-gray-800 rounded-lg p-3 sm:p-4">
          <h4 className="text-sm text-gray-400 mb-2">To Wallet</h4>
          <p className="text-white font-medium text-sm truncate">
            {details[0].result.reciever}
          </p>
        </div>
      </div>

      <div
        className={`mt-4 p-3 sm:p-4 rounded-lg flex items-start gap-3 ${
          details[0].success
            ? "bg-green-900/20 text-green-500"
            : "bg-red-900/20 text-red-400"
        }`}
      >
        {getStatusIcon()}
        <div>
          <h4 className="font-medium">
            {match(details[0].success)
              .with(true, () => "Successful Transaction")
              .with(false, () => "Failed Transaction")
              .exhaustive()}
          </h4>
          <p className="text-gray-400 text-sm sm:text-base">
            {match(details[0].success)
              .with(
                true,
                () =>
                  "This transaction was completed successfully and the payment has been received."
              )
              .with(
                false,
                () =>
                  "This transaction failed to complete. Reason: Insufficient funds"
              )
              .exhaustive()}
          </p>
        </div>
      </div>
    </div>
  );
}
