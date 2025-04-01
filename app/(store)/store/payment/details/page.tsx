"use client";

import { ArrowLeft, Check, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePaymentInfoStore } from "@/app/store";
import { sepolia } from "viem/chains";
import { useAccount, useBalance, useEstimateFeesPerGas } from "wagmi";
import { useReadPyUsdBalanceOf } from "@/app/generated";
import { formatEther } from "viem";
import React from "react";
import { toNetWorkFee } from "@/lib/utils";

const PaymentDetailsPage = () => {
  const router = useRouter();
  const paymentInfo = usePaymentInfoStore();
  const [sufficientBalance, setSufficientBalance] = React.useState(false);
  const [gasFeesVerified, setGasFeesVerified] = React.useState(false);
  const { address } = useAccount();

  const walletBalance = useBalance({
    chainId: sepolia.id,
    address: address!,
  });

  const analyze = useEstimateFeesPerGas({
    chainId: sepolia.id,
  });
  const balance = useReadPyUsdBalanceOf({
    args: [address!],
  });

  const handleProceedToPayment = () => {
    router.push(`/store/payment/confirm`);
  };

  React.useEffect(() => {
    if (Number(balance.data) / 1e6 >= paymentInfo.product!.productPrice) {
      setSufficientBalance(true);
    }
    if (
      Number(formatEther(analyze.data?.maxFeePerGas ?? BigInt(0)) ?? 0) <
      Number(formatEther(walletBalance.data?.value ?? BigInt(0)) ?? 0)
    ) {
      setGasFeesVerified(true);
    }
  }, [analyze?.data, balance?.data, walletBalance?.data, paymentInfo?.product]);

  if (
    analyze.isLoading ||
    !paymentInfo ||
    balance.isLoading ||
    walletBalance.isLoading
  ) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF6B00]"></div>
      </div>
    );
  }

  const networkFee = toNetWorkFee(analyze.data!.maxFeePerGas);
  const totalAmount = (
    paymentInfo.product!.productPrice + Number(networkFee)
  ).toFixed(2);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link
            href="/store/payment/connect"
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
            <p className="text-xl font-bold">${totalAmount} PYUSD</p>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <h2 className="font-semibold mb-2">
              Transaction Simulation Successful
            </h2>
            <p className="text-gray-700 mb-2">
              Transaction simulation successful. You can proceed with the
              payment.
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <h2 className="font-semibold mb-4">
              Transaction Simulation Results
            </h2>
            {sufficientBalance ? (
              <div className="flex items-start gap-3 mb-3">
                <div className="mt-0.5 bg-green-100 rounded-full p-1">
                  <Check size={16} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Sufficient Balance</h3>
                  <p className="text-sm text-gray-600">
                    Your wallet has enough PYUSD ({Number(balance?.data) / 1e6}{" "}
                    PYUSD) to cover this payment ($
                    {paymentInfo.product?.productPrice.toFixed(2)} PYUSD +{" "}
                    {networkFee} network fee).
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 mb-3">
                <div className="mt-0.5 bg-red-100 rounded-full p-1">
                  <CircleX size={16} className="text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium">Insufficient Balance</h3>
                  <p className="text-sm text-gray-600">
                    Your wallet does not have enough PYUSD to cover this
                    payment.
                  </p>
                </div>
              </div>
            )}
            {gasFeesVerified ? (
              <div className="flex items-start gap-3 mb-3">
                <div className="mt-0.5 bg-green-100 rounded-full p-1">
                  <Check size={16} className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Gas Fees Verified</h3>
                  <p className="text-sm text-gray-600">
                    Gas fees are reasonable and your wallet has enough ETH to
                    cover them.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 mb-3">
                <div className="mt-0.5 bg-red-100 rounded-full p-1">
                  <CircleX size={16} className="text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium">Insufficient Gas Fees</h3>
                  <p className="text-sm text-gray-600">
                    Your wallet does not have enough ETH to cover the gas fees
                    for this transaction.
                  </p>
                </div>
              </div>
            )}
            <div className="flex items-start gap-3">
              <div className="mt-0.5 bg-green-100 rounded-full p-1">
                <Check size={16} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-medium">Network Status Good</h3>
                <p className="text-sm text-gray-600">
                  The network is operating normally. Your transaction should
                  process quickly.
                </p>
              </div>
            </div>
          </div>

          <Button
            disabled={!sufficientBalance || !gasFeesVerified}
            className="w-full bg-black hover:bg-gray-800 text-white"
            onClick={handleProceedToPayment}
          >
            Proceed to Payment
          </Button>
        </div>
      </div>
    </div>
  );
};
export default PaymentDetailsPage;
