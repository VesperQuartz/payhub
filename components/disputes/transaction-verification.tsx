"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TransactionVerificationProps {
  onVerify: (block: string) => void;
  blockNo: string;
  setTransactionBlockNo: (block: string) => void;
}

export function TransactionVerification({
  onVerify,
  blockNo,
  setTransactionBlockNo,
}: TransactionVerificationProps) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-medium mb-2">
        Step 1: Enter Transaction Block Number
      </h3>
      <p className="text-gray-400 mb-4">
        Ask the customer for the transaction hash from their wallet and enter it
        below
      </p>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
          <Input
            value={blockNo}
            onChange={(e) => setTransactionBlockNo(e.target.value)}
            placeholder="Enter transaction hash (0x...)"
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <Button
          onClick={() => onVerify(blockNo)}
          disabled={!blockNo}
          className="bg-orange-500 hover:bg-orange-600"
        >
          Verify Transaction
        </Button>
      </div>
    </div>
  );
}
