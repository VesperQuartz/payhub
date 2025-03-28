import { MoreHorizontal } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ShowBalance } from "../balance";

interface StatCardProps {
  title: string;
  value: string | number;
  valueColor?: string;
  showEyeIcon?: boolean;
  icon?: ReactNode;
}

const StatCard = ({
  title,
  value,
  valueColor = "text-white",
  icon,
}: StatCardProps) => {
  return (
    <div className="flex items-center relative overflow-hidden rounded-lg border border-neutral-800 bg-gradient-to-r from-black to-neutral-900 p-6">
      <div className="absolute right-2 top-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-neutral-400"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-neutral-400">{title}</p>
        <div className="flex gap-5 justify-between">
          <div className={`text-3xl font-bold ${valueColor}`}>
            {title === "Your Balance" ? (
              <>
                $ <ShowBalance />
              </>
            ) : (
              value
            )}
          </div>
        </div>
      </div>

      {icon && (
        <div className="absolute bottom-2 right-2 opacity-10">{icon}</div>
      )}
    </div>
  );
};

export default StatCard;
