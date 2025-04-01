"use client";

import { ArrowLeft, Check, Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { usePaymentInfoStore } from "@/app/store";
import { useTransactionReceipt } from "wagmi";
import { toEthAddress, toNetWorkFee } from "@/lib/utils";
import { match } from "ts-pattern";
import React from "react";

const PaymentSuccessPage = () => {
  const paymentInfo = usePaymentInfoStore();
  const router = useRouter();
  const handleReturnHome = () => {
    paymentInfo.reset();
    router.push("/store");
  };
  const params = useSearchParams();

  const reciept = useTransactionReceipt({
    hash: params.get("txHash")! as `0x${string}`,
  });

  const receiptRef = React.useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef: receiptRef });

  if (reciept.isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF6B00]"></div>
      </div>
    );
  }

  const networkFee = toNetWorkFee(0);
  const total = (
    paymentInfo.product?.productPrice ?? 0 + Number(networkFee)
  ).toFixed(2);

  const handlePrintReceipt = () => {
    reactToPrintFn();
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link
            href="/store"
            className="inline-flex items-center text-neutral-400 hover:text-white"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="bg-white rounded-lg p-6 text-black" ref={receiptRef}>
          <h1 className="text-2xl font-bold mb-1">
            Pay {paymentInfo?.business?.name}
          </h1>
          <p className="text-gray-600 mb-6">
            Complete your payment using PYUSD
          </p>

          <div className="flex flex-col items-center mb-6">
            {reciept.data?.status === "success" && (
              <>
                <div className="bg-green-100 rounded-full p-4 mb-4">
                  <Check size={24} className="text-green-600" />
                </div>
                <h2 className="text-xl font-bold mb-2">Payment Successful!</h2>
                <p className="text-center text-gray-600">
                  Your payment to {paymentInfo.business?.name} has been
                  completed successfully.
                </p>
              </>
            )}
            {reciept.data?.status === "reverted" && (
              <>
                <div className="bg-red-100 rounded-full p-4 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-600"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </div>
                <h2 className="text-xl font-bold mb-2">Payment Failed</h2>
                <p className="text-center text-gray-600">
                  Your payment to {paymentInfo.business?.name} has been
                  reverted. Please try again.
                </p>
              </>
            )}{" "}
          </div>

          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <h2 className="font-semibold mb-4">Transaction Details</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span>${total} PYUSD</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                {match(reciept?.data?.status)
                  .with("success", () => (
                    <span className="text-green-600">Confirmed</span>
                  ))
                  .with("reverted", () => (
                    <span className="text-red-600">Reverted</span>
                  ))
                  .otherwise(() => null)}
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Transaction Hash:</span>
                <span className="font-mono text-sm">
                  {toEthAddress(reciept.data?.transactionHash)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Block Number:</span>
                <span>{reciept.data?.blockNumber}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Block Hash:</span>
                <span className="font-mono text-sm">
                  {toEthAddress(reciept.data?.blockHash)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Gas Used:</span>
                <span>{reciept.data?.gasUsed}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mb-4">
            <Button
              className="printContent flex-1 bg-black hover:bg-gray-800 text-white"
              onClick={handlePrintReceipt}
            >
              <Printer size={16} className="mr-2" />
              Print Receipt
            </Button>{" "}
          </div>

          <Button
            className="printContent w-full bg-[#FF6B00] hover:bg-[#E05E00] text-white"
            onClick={handleReturnHome}
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
