"use client";

import { QrCode, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import Link from "next/link";
import React from "react";

export const PaymentDetails = () => {
  const { address } = useAccount();

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-amber-600" />
          <h3 className="font-medium">Security Alerts</h3>
        </div>
        <p className="mt-1 text-sm">
          You have 3 new security alerts that require your attention.{" "}
          <a href="#" className="text-[#FF6B00] hover:underline">
            View alerts
          </a>
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Payment Options</h2>
          <p className="text-neutral-400">
            Choose how you want to accept PYUSD payments from your customers
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="border border-neutral-800 rounded-lg p-6 bg-black">
            <div className="flex items-start gap-4">
              <div className="bg-neutral-900 p-3 rounded-lg">
                <QrCode className="h-6 w-6 text-[#FF6B00]" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">QR Code Payment</h3>
                <p className="text-neutral-400 mt-1">
                  Customers scan your QR code with their wallet app
                </p>

                <p className="mt-4 text-sm text-neutral-300">
                  Display a QR code that customers can scan with their wallet
                  app to send PYUSD directly to your wallet.
                </p>

                <Button
                  asChild
                  className="mt-6 bg-black text-white border border-neutral-800 hover:bg-neutral-900"
                >
                  <Link href="qr-payment">Set Up QR Payment</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-neutral-800 rounded-lg p-6 bg-black">
        <h3 className="text-xl font-semibold">Your Payment Address</h3>
        <div className="mt-2 p-3 bg-neutral-900 rounded-md font-mono text-sm break-all">
          {address ? address : null}
        </div>
      </div>
    </div>
  );
};
