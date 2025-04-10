import type React from "react";
import Link from "next/link";
import { NavBar } from "@/components/store/navbar";

const StoreLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="bg-black text-white">
      <NavBar />
      <main>{children}</main>
      <footer className="border-t border-neutral-800 py-8 px-6 mt-12">
        <div className="max-w-7xl mx-auto text-center text-neutral-400 text-sm">
          <p>© 2025 PayHub. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="#" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StoreLayout;
