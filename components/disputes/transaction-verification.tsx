"use client";

import { Loader2Icon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

function TransactionVerificationSkeleton() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6">
      <Skeleton className="h-6 w-64 mb-2" />
      <Skeleton className="h-5 w-96 mb-4" />

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-full sm:w-32" />
      </div>
    </div>
  );
}

interface TransactionVerificationProps {
  onVerify: (block: string) => void;
  blockNo: string;
  setTransactionBlockNo: (block: string) => void;
  isLoading?: boolean;
}

export function TransactionVerification({
  onVerify,
  blockNo,
  setTransactionBlockNo,
  isLoading,
}: TransactionVerificationProps) {
  if (isLoading) {
    return <TransactionVerificationSkeleton />;
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6">
      <h3 className="text-lg font-medium mb-2">
        Step 1: Enter Transaction Block Number
      </h3>
      <p className="text-gray-400 mb-4 text-sm sm:text-base">
        Ask the customer for the transaction hash from their wallet and enter it
        below
      </p>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            value={blockNo}
            onChange={(e) => setTransactionBlockNo(e.target.value)}
            placeholder="Enter transaction block number (000...)"
            className="pl-10 bg-gray-800 border-gray-700 text-white text-sm sm:text-base"
          />
        </div>
        <Button
          onClick={() => onVerify(blockNo)}
          disabled={!blockNo}
          className="bg-orange-500 hover:bg-orange-600 w-full sm:w-32"
        >
          {isLoading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "Verify Transaction"
          )}
        </Button>
      </div>
    </div>
  );
}
