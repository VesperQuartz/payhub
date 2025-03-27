"use client";

import { ArrowLeft, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePaymentInfoStore } from "@/app/store";
import { useAccount, useEstimateFeesPerGas } from "wagmi";
import { sepolia } from "viem/chains";
import { toEthAddress, toNetWorkFee } from "@/lib/utils";
import { useWritePyUsdTransfer } from "@/app/generated";
import { useAddTransaction } from "@/app/hooks/api";
import { toast } from "sonner";

export default function PaymentConfirmPage() {
  const router = useRouter();
  const paymentInfo = usePaymentInfoStore();
  const { address } = useAccount();
  const analyze = useEstimateFeesPerGas({
    chainId: sepolia.id,
  });
  const payment = useAddTransaction();
  const transfer = useWritePyUsdTransfer();

  const handleConfirmPayment = () => {
    transfer.writeContract(
      {
        chainId: sepolia.id,
        args: [
          paymentInfo.business!.address,
          BigInt(paymentInfo.product!.productPrice * 1e6),
        ],
      },
      {
        onSuccess: (data) => {
          toast.success("Payment successful");
          payment.mutate(
            {
              productName: paymentInfo.product!.productName,
              price: paymentInfo.product!.productPrice,
              txHash: data,
              status: "completed",
              customerAddress: address!,
              merchantAddress: paymentInfo.business!.address,
            },
            {
              onSuccess: () => {
                router.push(`/store/payment/success?txHash=${data}`);
              },
              onError: () => {
                toast.error("Failed to add transaction");
              },
            },
          );
        },
        onError: () => {
          toast.error("Payment failed");
        },
      },
    );
  };

  if (analyze.isLoading || !paymentInfo) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF6B00]"></div>
      </div>
    );
  }

  const subtotal = paymentInfo.product?.productPrice.toFixed(2);
  const networkFee = toNetWorkFee(analyze.data!.maxPriorityFeePerGas);
  const total = (
    paymentInfo.product!.productPrice + Number(networkFee)
  ).toFixed(2);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link
            href="/store/payment/details"
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
            <h2 className="font-semibold mb-4">Payment Summary</h2>

            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Merchant</span>
              <span>{paymentInfo.business?.name}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Amount</span>
              <span>${subtotal} PYUSD</span>
            </div>

            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Network Fee</span>
              <span>~{networkFee} Eth</span>
            </div>

            <div className="flex justify-between font-semibold pt-2 border-t border-gray-300 mt-2">
              <span>Total</span>
              <span>${total} PYUSD</span>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <h2 className="font-semibold mb-2">Payment Details</h2>
            <p className="text-sm text-gray-600 mb-1">
              From: {toEthAddress(address)}
            </p>
            <p className="text-sm text-gray-600">
              To: {toEthAddress(paymentInfo.business?.address)}
            </p>
          </div>

          <Button
            className="w-full bg-black hover:bg-gray-800 text-white"
            onClick={handleConfirmPayment}
          >
            {payment.isPending || transfer.isPending ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              "Confirm and Pay"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
