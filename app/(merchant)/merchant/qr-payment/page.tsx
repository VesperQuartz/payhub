"use client";

import { useState } from "react";
import { Check, Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useAddTransaction,
  useGetProductByMerchantAddress,
  useRegister,
} from "@/app/hooks/api";
import { useAccount } from "wagmi";
import { QRCode } from "@/components/ui/qr-code";
import { useWatchPyUsdTransferEvent } from "@/app/generated";
import { toEthAddress } from "@/lib/utils";
import { formatUnits } from "viem";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

enum MonitoringState {
  NOT_STARTED = "not_started",
  WAITING = "waiting",
  CONFIRMED = "confirmed",
}

export default function QRPaymentPage() {
  const { address } = useAccount();
  const transaction = useAddTransaction();
  const register = useRegister();
  const products = useGetProductByMerchantAddress(address!);
  const [_selectedTab, setSelectedTab] = useState<"product" | "custom">(
    "product",
  );
  const [selectedProduct, setSelectedProduct] = useState<string>();
  const [productName, setProductName] = useState<string>();
  const [paymentAmount, setPaymentAmount] = useState<string>("");
  const [monitoringState, setMonitoringState] = useState<MonitoringState>(
    MonitoringState.NOT_STARTED,
  );
  const [monitoringTime, setMonitoringTime] = useState<number>(0);
  const [transactionHash, setTransactionHash] = useState<string>("");
  const queryClient = useQueryClient();

  const handleProductSelect = (productId: string) => {
    const product = products.data?.find((p) => p.id.toString() === productId);
    if (product) {
      setSelectedProduct(productId);
      setPaymentAmount(product.productPrice.toString());
      setProductName(product.productName);
    }
  };

  useWatchPyUsdTransferEvent({
    onLogs: (logs) => {
      setMonitoringTime(monitoringTime);
      setMonitoringState(MonitoringState.CONFIRMED);
      setTransactionHash(toEthAddress(logs[0].transactionHash));
      if (logs[0]) {
        const {
          args: { to, from, value },
          transactionHash,
        } = logs[0];
        register.mutate(
          {
            walletAddress: from!,
            role: "user",
          },
          {
            onSettled: (data, error) => {
              console.log(data, error);
              transaction.mutate(
                {
                  merchantAddress: to ?? address!,
                  customerAddress: from!,
                  price: Number(formatUnits(value!, 6)),
                  productName: productName!,
                  status: "completed",
                  txHash: transactionHash,
                },
                {
                  onSuccess: () => {
                    toast.success("Transaction was a success!");
                    queryClient.invalidateQueries({
                      queryKey: ["transaction", address!],
                    });
                  },
                  onError: (error) => {
                    console.error(error);
                  },
                },
              );
            },
          },
        );
      }
    },
    enabled: monitoringState === MonitoringState.WAITING,
  });

  const startMonitoring = () => {
    if (!paymentAmount) return;
    setMonitoringState(MonitoringState.WAITING);
    setMonitoringTime(0);
    const confirmationTime = Math.floor(Math.random() * 10) + 5;
    const intervalId = setInterval(() => {
      setMonitoringTime((prev) => {
        const newTime = prev + 1;
        if (newTime >= confirmationTime) {
          clearInterval(intervalId);
        }
        return newTime;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  };

  const startNewPayment = () => {
    setMonitoringState(MonitoringState.NOT_STARTED);
    setMonitoringTime(0);
    setTransactionHash("");
  };

  const selectedProductDetails = products.data?.find(
    (p) => p.id.toString() === selectedProduct,
  );

  const contractAddress = "0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9";
  const paymentData = paymentAmount
    ? `ethereum:${contractAddress}@11155111/transfer?address=${address}&uint256=${Number(paymentAmount) * 1e6}`
    : "";
  console.log(paymentData);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment QR Code Section */}
        <div className="border border-neutral-800 rounded-lg p-6 bg-black">
          <h2 className="text-xl font-semibold mb-1">Payment QR Code</h2>
          <p className="text-neutral-400 text-sm mb-4">
            Display this QR code for customers to scan and pay directly with
            their wallet app
          </p>

          <Tabs
            defaultValue="product"
            onValueChange={(value) =>
              setSelectedTab(value as "product" | "custom")
            }
          >
            <TabsList className="bg-neutral-900 mb-4">
              <TabsTrigger value="product">Product Payment</TabsTrigger>
            </TabsList>

            <TabsContent value="product" className="space-y-4">
              <div>
                <label className="text-sm text-neutral-400 mb-1 block">
                  Select Product
                </label>
                <Select
                  onValueChange={handleProductSelect}
                  value={selectedProduct}
                >
                  <SelectTrigger className="bg-neutral-900 border-neutral-800 text-white">
                    <SelectValue
                      placeholder="Choose a product"
                      className="text-green-400"
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-900 hover:text-white text-green-500 border-neutral-800">
                    {products.data?.map((product) => (
                      <SelectItem
                        key={product.id}
                        value={product.id.toString()}
                        className="bg-neutral-900 text-white"
                      >
                        {product.productName} - $
                        {product.productPrice.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedProduct && (
                <div>
                  <label className="text-sm text-neutral-400 mb-1 block">
                    Payment Amount
                  </label>
                  <div className="p-3 bg-neutral-900 rounded-md text-white">
                    ${selectedProductDetails?.productPrice.toFixed(2)} PYUSD
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {paymentAmount ? (
            <div className="mt-6 flex flex-col items-center">
              <div className="bg-white p-4 rounded-lg mb-4">
                <QRCode data={paymentData} size={200} />
              </div>
              <p className="text-sm text-neutral-400 text-center mb-4">
                Scan with any PYUSD-compatible wallet
                <br />${Number.parseFloat(paymentAmount).toFixed(2)} PYUSD
              </p>

              <div className="w-full">
                <p className="text-sm text-neutral-400 mb-1">
                  Your Payment Address
                </p>
                <div className="flex items-center">
                  <div className="p-2 bg-neutral-900 rounded-md font-mono text-xs break-all flex-1">
                    {address ? address : null}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-2 text-neutral-400"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 flex flex-col items-center justify-center h-[300px] bg-neutral-900 rounded-lg border border-dashed border-neutral-800">
              <p className="text-neutral-400 text-center">
                Select a product to generate QR code
              </p>
            </div>
          )}
        </div>

        <div className="border border-neutral-800 rounded-lg p-6 bg-black">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl font-semibold">Transaction Monitor</h2>
            {monitoringState !== MonitoringState.NOT_STARTED && (
              <Button
                variant="ghost"
                size="icon"
                className="text-neutral-400"
                onClick={startNewPayment}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            )}
          </div>
          <p className="text-neutral-400 text-sm mb-6">
            Monitor for incoming payments API
          </p>

          {monitoringState === MonitoringState.NOT_STARTED ? (
            <div className="flex flex-col items-center justify-center py-12">
              <h3 className="text-lg font-medium mb-2">
                Transaction Monitoring
              </h3>
              <p className="text-neutral-400 text-sm text-center mb-6">
                Start monitoring for incoming payments to your wallet address
              </p>
              <Button
                className="w-full bg-black text-white border border-neutral-800 hover:bg-neutral-900"
                onClick={startMonitoring}
                disabled={!paymentAmount}
              >
                Start Monitoring
              </Button>
            </div>
          ) : monitoringState === MonitoringState.WAITING ? (
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm text-neutral-400">Transaction Status</p>
                  <p className="text-sm font-medium">Waiting for payment...</p>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-2">
                  <div
                    className="bg-[#FF6B00] h-2 rounded-full"
                    style={{ width: "30%" }}
                  ></div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-sm text-neutral-400">Expected Amount</p>
                  <p className="text-sm font-medium">
                    ${Number.parseFloat(paymentAmount).toFixed(2)} PYUSD
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-neutral-400">Wallet Address</p>
                  <p className="text-sm font-mono">{toEthAddress(address)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-neutral-400">Monitoring Time</p>
                  <p className="text-sm font-medium">{monitoringTime}s</p>
                </div>
              </div>

              <div className="p-4 border border-neutral-800 rounded-lg bg-neutral-900">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-neutral-400 border-t-transparent animate-spin"></div>
                  <p className="font-medium">Waiting for Payment</p>
                </div>
                <p className="text-sm text-neutral-400 mt-1">
                  Monitoring the blockchain for incoming transactions to your
                  wallet address.
                </p>
              </div>

              <Button
                variant="outline"
                className="w-full border-neutral-800 text-white hover:bg-neutral-900"
                onClick={startNewPayment}
              >
                Cancel Monitoring
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm text-neutral-400">Transaction Status</p>
                  <p className="text-sm font-medium text-emerald-500">
                    Payment confirmed!
                  </p>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full w-full"></div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-sm text-neutral-400">Expected Amount</p>
                  <p className="text-sm font-medium">
                    ${Number.parseFloat(paymentAmount).toFixed(2)} PYUSD
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-neutral-400">Wallet Address</p>
                  <p className="text-sm font-mono">{toEthAddress(address)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-neutral-400">Monitoring Time</p>
                  <p className="text-sm font-medium">{monitoringTime}s</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-neutral-400">Transaction Hash</p>
                  <p className="text-sm font-mono">{transactionHash}</p>
                </div>
              </div>

              <div className="p-4 border border-emerald-800 rounded-lg bg-emerald-950">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-emerald-500" />
                  <p className="font-medium text-emerald-500">
                    Payment Confirmed
                  </p>
                </div>
                <p className="text-sm text-emerald-300 mt-1">
                  Payment of ${Number.parseFloat(paymentAmount).toFixed(2)}{" "}
                  PYUSD has been confirmed on the blockchain.
                </p>
              </div>

              <Button
                className="w-full bg-black text-white border border-neutral-800 hover:bg-neutral-900"
                onClick={startNewPayment}
              >
                Start New Payment
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
