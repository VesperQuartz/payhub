"use client";

import { ChevronDown, CircleDollarSign, User } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ConnectWallet } from "../connect-wallet";

export const NavBar = () => {
  return (
    <header className="border-b border-neutral-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" passHref legacyBehavior>
            <a className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#FF6B00]">
                <CircleDollarSign className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold">PayHub</span>
            </a>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/store" passHref legacyBehavior>
            <a className="text-white hover:text-neutral-300 transition-colors">
              Explore
            </a>
          </Link>
          <Link href="/store/favorites" passHref legacyBehavior>
            <a className="text-white hover:text-neutral-300 transition-colors">
              Favorites
            </a>
          </Link>
          <Link href="/store/transactions" passHref legacyBehavior>
            <a className="text-white hover:text-neutral-300 transition-colors">
              Transactions
            </a>
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-white"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6B00]">
              <User className="h-4 w-4" />
            </div>
            <ConnectWallet />
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
