import { TransactionStatus } from "@/types/types";
import { Check, Clock, XCircle } from "lucide-react";

interface StatusBadgeProps {
  status: TransactionStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  switch (status) {
    case "completed":
      return (
        <div className="flex items-center gap-1 text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full text-xs">
          <Check className="h-3 w-3" />
          <span>Completed</span>
        </div>
      );
    case "pending":
      return (
        <div className="flex items-center gap-1 text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full text-xs">
          <Clock className="h-3 w-3" />
          <span>Pending</span>
        </div>
      );
    case "disputed":
      return (
        <div className="flex items-center gap-1 text-red-500 bg-red-500/10 px-2 py-1 rounded-full text-xs">
          <XCircle className="h-3 w-3" />
          <span>Failed</span>
        </div>
      );
  }
}
