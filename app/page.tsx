import Link from "next/link";
import { CircleDollarSign } from "lucide-react";
import Image from "next/image";

const Home = () => {
  return (
    <div className="md:h-screen bg-black text-white md:overflow-clip bg-gradient-to-b from-black via-black to-[#FF6B00]">
      <header className="flex items-center justify-center gap-2 p-1 text-sm md:text-base">
        <Image
          src="/cloud.png"
          width={20}
          height={20}
          className="md:w-[30px] md:h-[30px]"
          alt="google"
        />{" "}
        <span className="font-semibold text-center">
          Powered by Google Blockchain RPC and PayPal USD
        </span>
        <Image
          src="/pyusd.png"
          width={20}
          height={20}
          className="md:w-[30px] md:h-[30px]"
          alt="pyusd"
        />
      </header>
      <header className="container mx-auto px-4 py-4 md:py-6 flex items-center justify-between">
        <div className="text-xl md:text-2xl font-serif italic font-bold">
          PAYHUB
        </div>

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

        <div className="flex items-center gap-2 md:gap-4">
          <Link
            href="/merchant/dashboard"
            className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded flex items-center gap-1 md:gap-2 transition-colors"
          >
            Merchant Login <span className="text-lg md:text-xl">›</span>
          </Link>
          <Link
            href="/register"
            className="border border-white hover:bg-white/10 text-white px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </header>
      <main className="container h-screen md:h-fit mx-auto px-4 text-center flex flex-col justify-around">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-3 md:mb-4 max-w-4xl mx-auto">
            <span className="text-emerald-400 italic">Instant</span> and{" "}
            <span className="text-emerald-400 italic">Secure</span> Payments, No
            Complexity
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            For businesses and buyers: Accept PYUSD payments, track sales, and
            protect purchases effortlessly
          </p>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-5">
            <div className="bg-black border border-emerald-500/30 rounded-full px-3 py-1.5 md:px-4 md:py-2 flex items-center gap-2 text-sm md:text-base">
              <div className="bg-emerald-500/20 p-1 rounded-full">
                <CircleDollarSign className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
              </div>
              <span>Instant Payments</span>
            </div>

            <div className="bg-black border border-emerald-500/30 rounded-full px-3 py-1.5 md:px-4 md:py-2 flex items-center gap-2 text-sm md:text-base">
              <div className="bg-emerald-500/20 p-1 rounded-full">
                <CircleDollarSign className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
              </div>
              <span>Purchase Protection</span>
            </div>

            <div className="bg-black border border-emerald-500/30 rounded-full px-3 py-1.5 md:px-4 md:py-2 flex items-center gap-2 text-sm md:text-base">
              <div className="bg-emerald-500/20 p-1 rounded-full">
                <CircleDollarSign className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
              </div>
              <span>Smart Fraud Detection</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6">
            <Link
              href="/register"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 md:px-6 md:py-3 text-sm md:text-base rounded flex items-center gap-1 md:gap-2 transition-colors"
            >
              Get Started as a Merchant{" "}
              <span className="text-lg md:text-xl">›</span>
            </Link>

            <Link
              href="/store"
              className="border-2 border-white hover:bg-white/10 text-white px-4 py-2 md:px-6 md:py-3 text-sm md:text-base rounded flex items-center gap-1 md:gap-2 transition-colors"
            >
              For Customers <span className="text-lg md:text-xl">›</span>
            </Link>
          </div>
        </div>
        <div>
          <div className="relative max-w-md mx-auto">
            <div className="relative">
              <div className="bg-gray-900 rounded-[20px] md:rounded-[40px] p-2 md:p-4 border-2 md:border-4 border-gray-800 shadow-2xl">
                <Image
                  src="/phone.png"
                  width={500}
                  height={500}
                  alt="wallet-info"
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>

            <div className="absolute -left-24 md:-left-48 top-1/4 max-w-[200px] md:max-w-xs bg-white text-black p-3 md:p-4 rounded-lg shadow-lg hidden sm:block">
              <h4 className="font-semibold text-base md:text-lg mb-1">
                Make Payments
              </h4>
              <p className="text-xs md:text-sm text-gray-600">
                Pay securely with PYUSD and get instant transaction
                confirmation.
              </p>
            </div>

            <div className="absolute -right-24 md:-right-48 top-[30%] max-w-[200px] md:max-w-xs bg-white text-black p-3 md:p-4 rounded-lg shadow-lg hidden sm:block">
              <h4 className="font-semibold text-base md:text-lg mb-1">
                Browse Businesses
              </h4>
              <p className="text-xs md:text-sm text-gray-600">
                Find local businesses that accept PYUSD and view their products
                and services
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
