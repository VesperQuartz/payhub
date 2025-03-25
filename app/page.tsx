import Link from "next/link";
import { CircleDollarSign } from "lucide-react";
import Image from "next/image";

const Home = () => {
  return (
    <div className="h-screen bg-black text-white overflow-clip bg-gradient-to-b from-black via-black to-[#FF6B00]">
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="text-2xl font-serif italic font-bold">PAYHUB</div>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#how-it-works"
            className="hover:text-gray-300 transition-colors"
          >
            How it Works
          </Link>
          <Link
            href="#features"
            className="hover:text-gray-300 transition-colors"
          >
            Features
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="#connect"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
          >
            Connect Wallet <span className="text-xl">›</span>
          </Link>
          <Link
            href="/register"
            className="border border-white hover:bg-white/10 text-white px-4 py-2 rounded transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto">
          <span className="text-emerald-400 italic">Instant</span> and{" "}
          <span className="text-emerald-400 italic">Secure</span> Payments, No
          Complexity
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
          For businesses and buyers: Accept PYUSD payments, track sales, and
          protect purchases effortlessly
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-5">
          <div className="bg-black border border-emerald-500/30 rounded-full px-4 py-2 flex items-center gap-2">
            <div className="bg-emerald-500/20 p-1 rounded-full">
              <CircleDollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <span>Instant Payments</span>
          </div>

          <div className="bg-black border border-emerald-500/30 rounded-full px-4 py-2 flex items-center gap-2">
            <div className="bg-emerald-500/20 p-1 rounded-full">
              <CircleDollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <span>Purchase Protection</span>
          </div>

          <div className="bg-black border border-emerald-500/30 rounded-full px-4 py-2 flex items-center gap-2">
            <div className="bg-emerald-500/20 p-1 rounded-full">
              <CircleDollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <span>Smart Fraud Detection</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Link
            href="/register"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded flex items-center gap-2 transition-colors"
          >
            Get Started as a Merchant <span className="text-xl">›</span>
          </Link>

          <Link
            href="#customers"
            className="border-2 border-white hover:bg-white/10 text-white px-6 py-3 rounded flex items-center gap-2 transition-colors"
          >
            For Customers <span className="text-xl">›</span>
          </Link>
        </div>

        <div className="relative max-w-md mx-auto">
          <div className="relative">
            <div className="bg-gray-900 rounded-[40px] p-4 border-4 border-gray-800 shadow-2xl">
              <Image
                src="/phone.png"
                width={500}
                height={500}
                alt="wallet-info"
              />
            </div>
          </div>

          <div className="absolute -left-48 top-1/3 max-w-xs bg-white text-black p-4 rounded-lg shadow-lg hidden md:block">
            <h4 className="font-semibold text-lg mb-1">Make Payments</h4>
            <p className="text-sm text-gray-600">
              Pay securely with PYUSD and get instant transaction confirmation.
            </p>
          </div>

          <div className="absolute -right-48 top-1/4 max-w-xs bg-white text-black p-4 rounded-lg shadow-lg hidden md:block">
            <h4 className="font-semibold text-lg mb-1">Browse Businesses</h4>
            <p className="text-sm text-gray-600">
              Find local businesses that accept PYUSD and view their products
              and services
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
