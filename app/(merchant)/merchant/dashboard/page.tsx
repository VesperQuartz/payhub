"use client";

import { useGetTransactionPool } from "@/app/hooks/rpc";
import { OverView } from "@/components/dashboard/overview";
import { PaymentDetails } from "@/components/dashboard/payment-details";
import { Button } from "@/components/ui/button";
import React from "react";
import { match } from "ts-pattern";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = React.useState("overview");
  useGetTransactionPool();
  return (
    <>
      <div className="mt-1 mb-4 md:mb-2 flex items-center justify-between overflow-x-auto pb-2">
        <div className="flex items-center gap-4 md:gap-6">
          <Button
            variant="ghost"
            className="px-2 md:px-0 text-sm md:text-base text-white hover:bg-transparent hover:text-[#FF6B00] whitespace-nowrap"
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </Button>
          <Button
            variant="ghost"
            className="px-2 md:px-0 text-sm md:text-base text-neutral-400 hover:bg-transparent hover:text-white whitespace-nowrap"
            onClick={() => setActiveTab("payment")}
          >
            Payment
          </Button>
        </div>
      </div>
      <div className="space-y-4 md:space-y-8 w-full">
        {match(activeTab)
          .with("overview", () => <OverView />)
          .with("payment", () => <PaymentDetails />)
          .otherwise(() => null)}
      </div>
    </>
  );
};

export default DashboardPage;
