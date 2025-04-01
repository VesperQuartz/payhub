"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PrintReceipt } from "@/components/disputes/print-receipt";
import { Loader2Icon, Printer } from "lucide-react";
import { DebugTraceResponse } from "@/lib/custom-client";
import { Input } from "../ui/input";
import { Skeleton } from "@/components/ui/skeleton";

function ResolveDisputeSkeleton() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6">
      <Skeleton className="h-6 w-48 mb-2" />
      <Skeleton className="h-5 w-96 mb-4" />

      <div className="mb-4">
        <Skeleton className="h-4 w-16 mb-2" />
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="mb-4">
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-3 w-64 mt-1" />
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-2">
        <Skeleton className="h-10 w-full sm:w-24" />
      </div>
    </div>
  );
}

interface ResolveDisputeProps {
  details: DebugTraceResponse | undefined;
  onResolve: (resolution: string, issue: string) => void;
  onCancel: () => void;
  isLoading: boolean;
}

export function ResolveDispute({
  details,
  onResolve,
  onCancel,
  isLoading,
}: ResolveDisputeProps) {
  const [resolution, setResolution] = useState("");
  const [issue, setIssue] = useState("");
  const [showPrintReceipt, setShowPrintReceipt] = useState(false);

  if (isLoading) {
    return <ResolveDisputeSkeleton />;
  }

  const handleResolve = () => {
    if (resolution.trim() && issue.trim()) {
      onResolve(resolution, issue);
    }
  };

  const handlePrintReceipt = () => {
    setShowPrintReceipt(true);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6">
      <h3 className="text-lg font-medium mb-2">Step 3: Resolve the Dispute</h3>
      <p className="text-gray-400 mb-4 text-sm sm:text-base">
        Based on the transaction details, take appropriate action to resolve the
        customer&apos;s issue
      </p>

      <div className="mb-4">
        <h4 className="text-sm text-gray-400 mb-2">Issue</h4>
        <Input
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          placeholder="What was the issue"
          className="bg-gray-800 border-gray-700 text-white text-sm sm:text-base"
        />
      </div>

      <div className="mb-4">
        <h4 className="text-sm text-gray-400 mb-2">Resolution Action</h4>
        <Textarea
          value={resolution}
          onChange={(e) => setResolution(e.target.value)}
          placeholder="Describe the action taken to resolve this dispute..."
          className="bg-gray-800 border-gray-700 text-white text-sm sm:text-base h-24"
        />
        <p className="text-xs text-gray-500 mt-1">
          Example: &quot;Issued refund&quot;, &quot;Confirmed payment
          received&quot;, &quot;Helped customer complete payment&quot;, etc.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-2">
        <Button
          variant="outline"
          onClick={onCancel}
          className="border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-gray-300 w-full sm:w-24"
        >
          Cancel
        </Button>
        <Button
          onClick={handleResolve}
          disabled={!resolution.trim() || !issue.trim()}
          className="bg-orange-500 hover:bg-orange-600 w-full sm:w-32"
        >
          Resolve Dispute
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
