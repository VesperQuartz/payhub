"use client";

import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import Link from "next/link";
import React from "react";

export const PaymentDetails = () => {
  const { address } = useAccount();

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="space-y-3 md:space-y-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">Payment Options</h2>
          <p className="text-sm md:text-base text-neutral-400">
            Choose how you want to accept PYUSD payments from your customers
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-6">
          <div className="border border-neutral-800 rounded-lg p-4 md:p-6 bg-black">
            <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
              <div className="bg-neutral-900 p-2 md:p-3 rounded-lg">
                <QrCode className="h-5 w-5 md:h-6 md:w-6 text-[#FF6B00]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-semibold">
                  QR Code Payment
                </h3>
                <p className="text-sm md:text-base text-neutral-400 mt-1">
                  Customers scan your QR code with their wallet app
                </p>

                <p className="mt-3 md:mt-4 text-xs md:text-sm text-neutral-300">
                  Display a QR code that customers can scan with their wallet
                  app to send PYUSD directly to your wallet.
                </p>

                <Button
                  asChild
                  className="mt-4 md:mt-6 bg-black text-white border border-neutral-800 hover:bg-neutral-900 text-sm md:text-base"
                >
                  <Link href="qr-payment">Set Up QR Payment</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-neutral-800 rounded-lg p-4 md:p-6 bg-black">
        <h3 className="text-lg md:text-xl font-semibold">
          Your Payment Address
        </h3>
        <div className="mt-2 p-2 md:p-3 bg-neutral-900 rounded-md font-mono text-xs md:text-sm break-all">
          {address ? address : null}
        </div>
      </div>
    </div>
  );
};
