"use client";
import { User, ChevronDown, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { ConnectWallet } from "../connect-wallet";
import { useBusinessProfileStore } from "@/app/store";
import { usePathname } from "next/navigation";
import { match } from "ts-pattern";
import Link from "next/link";

export const NavBar = () => {
  const user = useBusinessProfileStore();
  const path = usePathname();
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold capitalize">
          {match(path)
            .with("/merchant/dashboard", () => user.profile?.businessName)
            .with("/merchant/products", () => {
              return (
                <div className="flex items-center">
                  <Link href="/merchant/dashboard" className="mr-4">
                    <Button variant="ghost" size="icon">
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                  </Link>
                  <h1 className="text-2xl font-bold">Products & Services</h1>
                </div>
              );
            })
            .with("/merchant/qr-payment", () => {
              return (
                <div className="flex items-center">
                  <Link href="/merchant/dashboard" className="mr-4">
                    <Button variant="ghost" size="icon">
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                  </Link>
                  <h1 className="text-2xl font-bold">QR Code Payment</h1>
                </div>
              );
            })
            .with("/merchant/sales", () => {
              return (
                <div className="flex items-center">
                  <Link href="/merchant/dashboard" className="mr-4">
                    <Button variant="ghost" size="icon">
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                  </Link>
                  <h1 className="text-2xl font-bold">Transactions</h1>
                </div>
              );
            })
            .otherwise(() => null)}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="flex items-center gap-2 text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6B00]">
            <User className="h-4 w-4" />
          </div>
          <ConnectWallet />
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
