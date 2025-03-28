/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  type TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import { useState, useEffect } from "react";
import { useGetTransactionByMerchantAddress } from "@/app/hooks/api";
import { useAccount } from "wagmi";

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black border border-gray-800 p-2 rounded-md text-xs">
        <p className="text-gray-300">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.name}: $${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const SalesAnalytics = () => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [_timeRange, setTimeRange] = useState("daily");
  const { address } = useAccount();
  const transactions = useGetTransactionByMerchantAddress(address!);

  useEffect(() => {
    const processData = () => {
      const dateMap = new Map();

      transactions.data?.forEach((tx) => {
        const date = new Date(tx.createdAt);
        const dateKey = date.toISOString().split("T")[0];

        if (dateMap.has(dateKey)) {
          const existing = dateMap.get(dateKey);
          dateMap.set(dateKey, {
            ...existing,
            amount: existing.amount + tx.price,
            count: existing.count + 1,
          });
        } else {
          dateMap.set(dateKey, {
            date: dateKey,
            amount: tx.price,
            count: 1,
            formattedDate: new Date(date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
          });
        }
      });

      const result =
        Array.from(dateMap.values()).sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        ) ?? [];

      let cumulativeAmount = 0;
      result?.forEach((item) => {
        cumulativeAmount += item.amount ?? 0;
        item.cumulativeAmount = cumulativeAmount;
      });

      const firstDate = new Date(result[0]?.date);
      const lastDate = new Date(result[result?.length - 1]?.date);

      const twoDaysBefore = new Date(firstDate);
      twoDaysBefore.setDate(twoDaysBefore.getDate() - 2);

      const twoDaysAfter = new Date(lastDate);
      twoDaysAfter.setDate(twoDaysAfter.getDate() + 2);

      const fullDateRange = [];
      const currentDate = new Date(twoDaysBefore);

      while (currentDate <= twoDaysAfter) {
        const dateKey = currentDate.toISOString().split("T")[0];
        const existingData = dateMap.get(dateKey);

        if (existingData) {
          fullDateRange.push(existingData);
        } else {
          fullDateRange.push({
            date: dateKey,
            amount: 0,
            count: 0,
            cumulativeAmount: cumulativeAmount,
            formattedDate: new Date(currentDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
          });
        }

        const nextDate = new Date(currentDate);
        nextDate.setDate(nextDate.getDate() + 1);
        currentDate.setTime(nextDate.getTime());
      }

      return fullDateRange.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
    };

    setChartData(processData());
  }, [transactions?.data]);

  return (
    <Card className="bg-black border border-gray-800 rounded-lg overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Sales Analytics</h3>
          <div className="flex items-center gap-2">
            <Select defaultValue="daily" onValueChange={setTimeRange}>
              <SelectTrigger className="w-[100px] bg-transparent border-gray-700 text-white">
                <SelectValue placeholder="Daily" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient
                  id="colorCumulative"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#B45309" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#B45309" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#333"
                vertical={false}
              />
              <XAxis
                dataKey="formattedDate"
                tick={{ fill: "#9CA3AF", fontSize: 10 }}
                axisLine={{ stroke: "#333" }}
                tickLine={{ stroke: "#333" }}
              />
              <YAxis
                tick={{ fill: "#9CA3AF", fontSize: 10 }}
                axisLine={{ stroke: "#333" }}
                tickLine={{ stroke: "#333" }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#10B981"
                fillOpacity={1}
                fill="url(#colorAmount)"
                name="Daily Sales"
              />
              <Area
                type="monotone"
                dataKey="cumulativeAmount"
                stroke="#B45309"
                fillOpacity={1}
                fill="url(#colorCumulative)"
                name="Cumulative Sales"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
