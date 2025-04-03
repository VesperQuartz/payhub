"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CircleDollarSign,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  ShieldAlert,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/dashboard/navbar";
import { BusinessProfileDialog } from "@/components/dashboard/business-profile-dialog";
import { usePathname, useRouter } from "next/navigation";
import { useAccount, useDisconnect } from "wagmi";
import { useWatchPyUsdTransferEvent } from "../generated";
import { sepolia } from "viem/chains";
import { toast } from "sonner";

const MerchantLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [_isMobile, setIsMobile] = useState(false);
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (path: string) => {
    return pathname === path;
  };

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const { address } = useAccount();

  useWatchPyUsdTransferEvent({
    chainId: sepolia.id,
    onLogs: (logs) => {
      const { value, to, from } = logs[0].args;
      if (to === address) {
        if (logs[0].logIndex === null) {
          toast.info("You have a pending transaction!");
        }
        toast.info(`Transfer of ${value} from ${from} to ${to}`);
      }
    },
  });

  return (
    <>
      <BusinessProfileDialog />
      <div className="flex min-h-screen bg-black text-white">
        <div
          className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-black border-r border-neutral-800 transition-all duration-300 ${
            sidebarOpen
              ? "w-64"
              : "w-0 -translate-x-full md:w-16 md:translate-x-0"
          }`}
        >
          <div className="flex items-center gap-2 p-4 h-16">
            <Link href="/">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#FF6B00]">
                <CircleDollarSign className="h-5 w-5 text-white" />
              </div>
            </Link>
            <Link href="/">
              {sidebarOpen && (
                <span className="text-lg font-semibold">PayHub</span>
              )}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto text-white"
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-col flex-1 overflow-y-auto py-4">
            <nav className="flex-1 px-2 space-y-1">
              <Link
                href="dashboard"
                className={`${
                  isActive("/merchant/dashboard")
                    ? "bg-neutral-800 text-white"
                    : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                } flex items-center px-2 py-2 text-sm font-medium rounded-md`}
              >
                <LayoutDashboard
                  className={`h-5 w-5 ${!sidebarOpen ? "mx-auto" : "mr-3"}`}
                />
                {sidebarOpen && <span>Dashboard</span>}
              </Link>
              <Link
                href="sales"
                className={`${
                  isActive("/merchant/sales")
                    ? "bg-neutral-800 text-white"
                    : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                } flex items-center px-2 py-2 text-sm font-medium rounded-md text-neutral-300 hover:bg-neutral-800 hover:text-white`}
              >
                <CircleDollarSign
                  className={`h-5 w-5 ${!sidebarOpen ? "mx-auto" : "mr-3"}`}
                />
                {sidebarOpen && <span>Sales</span>}
              </Link>
              <Link
                href="products"
                className={`${
                  isActive("/merchant/products")
                    ? "bg-neutral-800 text-white"
                    : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                } flex items-center px-2 py-2 text-sm font-medium rounded-md text-neutral-300 hover:bg-neutral-800 hover:text-white`}
              >
                <Package
                  className={`h-5 w-5 ${!sidebarOpen ? "mx-auto" : "mr-3"}`}
                />
                {sidebarOpen && <span>Product</span>}
              </Link>
              <Link
                href="disputes"
                className={`${
                  isActive("/merchant/disputes")
                    ? "bg-neutral-800 text-white"
                    : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                } flex items-center px-2 py-2 text-sm font-medium rounded-md text-neutral-300 hover:bg-neutral-800 hover:text-white`}
              >
                <ShieldAlert
                  className={`h-5 w-5 ${!sidebarOpen ? "mx-auto" : "mr-3"}`}
                />
                {sidebarOpen && <span>Dispute</span>}
              </Link>
            </nav>

            <div className="px-2 space-y-1 mt-auto">
              <Button
                variant="link"
                className="flex w-full justify-start px-2 py-2 text-sm font-medium rounded-md text-red-500 hover:bg-neutral-800"
                onClick={() => {
                  disconnect();
                  router.replace("/");
                }}
              >
                <LogOut
                  className={`h-5 w-5 ${!sidebarOpen ? "mx-auto" : "mr-3"}`}
                />
                {sidebarOpen && <span>Log Out</span>}
              </Button>
            </div>
          </div>
        </div>

        <div
          className={`flex-1 transition-all duration-300 ${sidebarOpen ? "md:ml-64" : "ml-0 md:ml-16"}`}
        >
          {!sidebarOpen && (
            <Button
              variant="ghost"
              size="icon"
              className="fixed top-4 left-4 z-40 md:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}

          <header className="border-b border-neutral-800 px-6 py-4">
            <NavBar />
          </header>
          <main className="p-6">{children}</main>
        </div>
      </div>
    </>
  );
};

export default MerchantLayout;
