"use client";

import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePaymentInfoStore } from "@/app/store";
import { useEstimateFeesPerGas } from "wagmi";
import { sepolia } from "viem/chains";

export const PaymentConnectPage = () => {
  const router = useRouter();
  const paymentInfo = usePaymentInfoStore();
  const analyze = useEstimateFeesPerGas({
    chainId: sepolia.id,
  });
  console.log(analyze.data, "GASSA");

  const handleProceedToPayment = () => {
    router.push("/store/payment/details");
  };

  if (!paymentInfo) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF6B00]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link
            href={`/store/${paymentInfo.business?.address}`}
            className="inline-flex items-center text-neutral-400 hover:text-white"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-lg p-6 text-black">
          <h1 className="text-2xl font-bold mb-1">
            Pay {paymentInfo.business?.name}
          </h1>
          <p className="text-gray-600 mb-6">
            Complete your payment using PYUSD
          </p>

          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <h2 className="font-semibold mb-2">Total Amount</h2>
            <p className="text-xl font-bold">
              ${paymentInfo.product?.productPrice.toFixed(2)} PYUSD
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {paymentInfo.product?.productName}
            </p>
          </div>

          {analyze.isLoading ? (
            <div className="bg-gray-100 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Loader2 size={18} className="animate-spin text-gray-700" />
                <h2 className="font-semibold">Analyzing Transaction</h2>
              </div>
              <p className="text-gray-700">
                Checking network status and estimating gas fees...
              </p>
            </div>
          ) : analyze.isSuccess ? (
            <div className="bg-gray-100 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-green-100 rounded-full p-1">
                  <Check size={16} className="text-green-600" />
                </div>
                <h2 className="font-semibold">
                  Transaction Simulation Successful
                </h2>
              </div>
              <p className="text-gray-700">
                Network is ready and gas fees are reasonable. You can proceed
                with the payment.
              </p>
            </div>
          ) : (
            <div className="bg-gray-100 rounded-lg p-4 mb-6">
              <p className="text-red-600">
                Network analysis failed. Please try again later.
              </p>
            </div>
          )}

          <Button
            className="w-full bg-black hover:bg-gray-800 text-white"
            disabled={analyze.isLoading || analyze.isError}
            onClick={handleProceedToPayment}
          >
            {analyze.isLoading ? "Analyzing..." : "Proceed to Payment"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentConnectPage;
