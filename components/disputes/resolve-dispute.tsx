/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PrintReceipt } from "@/components/disputes/print-receipt";
import { Printer } from "lucide-react";

interface ResolveDisputeProps {
  details: any;
  onResolve: (resolution: string) => void;
  onCancel: () => void;
}

export function ResolveDispute({
  details,
  onResolve,
  onCancel,
}: ResolveDisputeProps) {
  const [resolution, setResolution] = useState("");
  const [showPrintReceipt, setShowPrintReceipt] = useState(false);

  const handleResolve = () => {
    if (resolution.trim()) {
      onResolve(resolution);
    }
  };

  const handlePrintReceipt = () => {
    setShowPrintReceipt(true);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-medium mb-2">Step 3: Resolve the Dispute</h3>
      <p className="text-gray-400 mb-4">
        Based on the transaction details, take appropriate action to resolve the
        customer&apos;s issue
      </p>

      <div className="mb-4">
        <h4 className="text-sm text-gray-400 mb-2">Resolution Action</h4>
        <Textarea
          value={resolution}
          onChange={(e) => setResolution(e.target.value)}
          placeholder="Describe the action taken to resolve this dispute..."
          className="bg-gray-800 border-gray-700 text-white h-24"
        />
        <p className="text-xs text-gray-500 mt-1">
          Example: &quot;Issued refund&quot;, &quot;Confirmed payment
          received&quot;, &quot;Helped customer complete payment&quot;, etc.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onCancel}
            className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handleResolve}
            disabled={!resolution.trim()}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Resolve Dispute
          </Button>
        </div>

        <Button
          variant="outline"
          onClick={handlePrintReceipt}
          className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print Receipt
        </Button>
      </div>

      {showPrintReceipt && (
        <PrintReceipt
          details={details}
          resolution={resolution}
          onClose={() => setShowPrintReceipt(false)}
        />
      )}
    </div>
  );
}
