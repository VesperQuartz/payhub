"use client";

import { OverView } from "@/components/dashboard/overview";
import { PaymentDetails } from "@/components/dashboard/payment-details";
import { Button } from "@/components/ui/button";
import React from "react";
import { match } from "ts-pattern";
const DashboardPage = () => {
  const [activeTab, setActiveTab] = React.useState("overview");
  return (
    <>
      <div className="mt-1 mb-2 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            className="px-0 text-white hover:bg-transparent hover:text-[#FF6B00]"
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </Button>
          <Button
            variant="ghost"
            className="px-0 text-neutral-400 hover:bg-transparent hover:text-white"
            onClick={() => setActiveTab("payment")}
          >
            Payment
          </Button>
        </div>
      </div>
      <div className="space-y-8 w-full">
        {match(activeTab)
          .with("overview", () => <OverView />)
          .with("payment", () => <PaymentDetails />)
          .otherwise(() => null)}
      </div>
    </>
  );
};

export default DashboardPage;
