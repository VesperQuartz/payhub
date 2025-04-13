"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (countdown <= 0) {
      router.back();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router]);

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-red-900/30 opacity-70"></div>

      <div className="absolute inset-0 m-4 rounded-3xl border border-gray-800 shadow-[0_0_40px_rgba(59,130,246,0.3)] bg-gradient-to-b from-gray-900 to-gray-950"></div>

      <div className="relative w-full max-w-6xl mx-auto px-6 py-4 flex flex-col min-h-[90vh]">
        <main className="flex-1 flex flex-col items-center justify-center relative">
          <div className="relative w-80 h-80 mb-16">
            <div className="absolute inset-0 rounded-full border border-gray-700/50"></div>

            <div className="absolute inset-[20%] rounded-full border border-gray-700/50"></div>

            <div className="absolute inset-[40%] rounded-full bg-gray-800/80 flex items-center justify-center shadow-lg">
              <div className="grid grid-cols-3 gap-1">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-gray-400"
                  ></div>
                ))}
              </div>
            </div>

            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-700/30"></div>

            <div className="absolute top-0 left-1/2 h-full w-px bg-gray-700/30"></div>

            <div className="absolute top-0 left-1/2 w-[40%] h-px bg-gray-500 -translate-x-full rotate-[30deg] origin-right"></div>
            <div className="absolute top-0 left-1/2 w-[40%] h-px bg-gray-500 translate-x-0 rotate-[150deg] origin-left"></div>

            <div className="absolute top-[10%] left-[70%] w-1 h-1 rounded-full bg-white"></div>
            <div className="absolute top-[30%] left-[20%] w-1 h-1 rounded-full bg-gray-500"></div>
            <div className="absolute top-[80%] left-[30%] w-1 h-1 rounded-full bg-gray-500"></div>
            <div className="absolute top-[60%] left-[80%] w-1 h-1 rounded-full bg-gray-500"></div>

            <div className="absolute top-[37%] left-[5%] w-8 h-px bg-gray-600"></div>
            <div className="absolute top-[37%] right-[5%] w-8 h-px bg-gray-600"></div>
            <div className="absolute top-[63%] left-[10%] w-6 h-px bg-gray-600"></div>
            <div className="absolute top-[63%] right-[10%] w-6 h-px bg-gray-600"></div>
          </div>

          <h1 className="text-white text-6xl font-bold mb-4">Page not found</h1>
          <p className="text-gray-400 text-xl mb-10">
            The page you're searching for isn't available.
          </p>

          <button
            onClick={() => router.back()}
            className="bg-gray-800/80 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition-colors"
          >
            Go back in {countdown}
          </button>
        </main>
      </div>
    </div>
  );
}
