"use client";

import React, { useState } from "react";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DisputeHistory } from "@/components/disputes/dispute-history";
import { TransactionVerification } from "@/components/disputes/transaction-verification";
import { TransactionDetails } from "@/components/disputes/transaction-details";
import { ResolveDispute } from "@/components/disputes/resolve-dispute";
import { Button } from "@/components/ui/button";
import { useDebugTraceBlockByNumber } from "@/app/hooks/rpc";
import { DebugTraceResponse } from "@/lib/custom-client";
import { toast } from "sonner";
import { useAddDispute } from "@/app/hooks/api";
import { useQueryClient } from "@tanstack/react-query";
import { useAccount } from "wagmi";

export const DisputeResolutionPage = () => {
  const { address } = useAccount();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [blockNo, setTransactionBlk] = useState<string | undefined>(undefined);
  const [transactionDetails, setTransactionDetails] = useState<
    DebugTraceResponse | undefined
  >();

  const dispute = useAddDispute();
  const queryClient = useQueryClient();

  const debugBlock = useDebugTraceBlockByNumber();

  const handleVerifyTransaction = (blockNumber: string) => {
    setTransactionBlk(blockNumber);
    debugBlock.mutate(blockNo?.trim(), {
      onSuccess: (data) => {
        setTransactionDetails(data);
        setStep(2);
      },
      onError: () => {
        setTransactionDetails(undefined);
        setStep(1);
        toast.error("Transaction not found");
      },
    });
  };

  const handleResolveDispute = (resolution: string, issue: string) => {
    dispute.mutate(
      {
        customerAddress: transactionDetails![0].result.from,
        issue,
        resolution,
        merchantAddress: transactionDetails![0].result
          .reciever as `0x${string}`,
        price: transactionDetails![0].result.amount,
        productName: "N/A",
        txHash: transactionDetails![0].txHash,
      },
      {
        onSuccess: () => {
          setStep(1);
          setTransactionBlk("");
          setTransactionDetails(undefined);
          toast.success("Dispute resolved successfully");
          queryClient.invalidateQueries({
            queryKey: ["dispute", address],
          });
        },
        onError: (error) => {
          console.log(error, "An error occurred");
        },
      },
    );
  };

  const handleStartNewVerification = () => {
    setStep(1);
    setTransactionBlk("");
    setTransactionDetails(undefined);
  };

  return (
    <>
      <div className="flex items-center mb-6">
        <Link href="/dashboard" className="text-gray-400 hover:text-white mr-4">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-orange-500">
          Dispute Resolution
        </h1>
      </div>

      <div className="max-w-5xl">
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">Transaction Verification</h2>
          <p className="text-gray-400 mb-4">
            Verify customer transactions to resolve payment disputes
          </p>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3 text-orange-400">
              <AlertCircle className="w-5 h-5 mt-0.5" />
              <div>
                <h3 className="font-medium">Dispute Handling Process</h3>
                <p className="text-gray-400">
                  When a customer reports a payment issue, ask for their
                  transaction block number and verify it here to check the
                  payment status.
                </p>
              </div>
            </div>
          </div>

          {step === 1 && (
            <TransactionVerification
              isLoading={debugBlock.isPending}
              onVerify={handleVerifyTransaction}
              blockNo={blockNo!}
              setTransactionBlockNo={setTransactionBlk}
            />
          )}

          {step === 2 && transactionDetails && (
            <>
              <TransactionDetails details={transactionDetails} />
              <ResolveDispute
                details={transactionDetails}
                onResolve={handleResolveDispute}
                onCancel={handleStartNewVerification}
                isLoading={dispute.isPending}
              />
            </>
          )}
        </section>

        <div className="mb-8">
          <Button
            variant="default"
            className="bg-orange-500 hover:bg-orange-600 text-white"
            onClick={() => router.push("/disputes/resolved")}
          >
            Resolved Disputes
          </Button>
        </div>

        <DisputeHistory />
      </div>
    </>
  );
};
export default DisputeResolutionPage;
