import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SalesAnalytics = () => {
  return (
    <div className="rounded-lg border border-neutral-800 bg-black p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Sales Analytics</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue="daily">
            <SelectTrigger className="w-[100px] border-neutral-800 bg-neutral-900">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent className="bg-neutral-900 text-white">
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" size="icon" className="text-neutral-400">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="h-[200px] w-full rounded-lg bg-neutral-900">
        {/* Chart would go here */}
        <div className="flex h-full items-center justify-center text-neutral-500">
          Sales chart visualization
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics;
