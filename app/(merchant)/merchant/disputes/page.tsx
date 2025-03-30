/* eslint-disable @typescript-eslint/no-explicit-any */
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

export const DisputeResolutionPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [blockNo, setTransactionBlk] = useState("");
  const [transactionDetails, setTransactionDetails] = useState<any>(null);
  const [_resolution, setResolution] = useState("");

  const debugBlock = useDebugTraceBlockByNumber(Number(blockNo));

  const handleVerifyTransaction = (blockNumber: string) => {
    setTransactionBlk(blockNumber);
    setTransactionDetails(debugBlock?.data);
    setStep(2);
  };

  const handleResolveDispute = (resolution: string) => {
    setResolution(resolution);
    // In a real app, this would be an API call to resolve the dispute
    setStep(1);
    setTransactionBlk("");
    setTransactionDetails(null);
  };

  const handleStartNewVerification = () => {
    setStep(1);
    setTransactionBlk("");
    setTransactionDetails(null);
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
              onVerify={handleVerifyTransaction}
              blockNo={blockNo}
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
