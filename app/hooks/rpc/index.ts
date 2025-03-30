import { pyUsdAbi } from "@/app/generated";
import { client } from "@/lib/custom-client";
import { useQuery } from "@tanstack/react-query";
import { decodeFunctionData, hexToBool, toHex } from "viem";

export const useDebugTraceTransaction = (txHash: `0x${string}`) => {
  return useQuery({
    queryKey: ["debug_traceTransaction", txHash],
    queryFn: async () => {
      const disputeCheck = await client.request({
        method: "debug_traceTransaction",
        params: [
          txHash,
          {
            tracer: "callTracer",
            tracerConfig: {
              onlyTopCall: true,
            },
          },
        ],
      });
      return disputeCheck;
    },
  });
};

export const useDebugTraceBlockByNumber = (blockNo: string | number) => {
  return useQuery({
    enabled: !!blockNo,
    queryKey: ["debug_traceBlockByNumber", blockNo],
    queryFn: async () => {
      const disputeCheck = await client.request({
        method: "debug_traceBlockByNumber",
        params: [
          toHex(blockNo),
          {
            tracer: "callTracer",
            tracerConfig: {
              onlyTopCall: true,
            },
          },
        ],
      });
      const result = disputeCheck
        .filter(
          (tx) =>
            tx.result.to.toLowerCase() ===
            "0xcac524bca292aaade2df8a05cc58f0a65b1b3bb9",
        )
        .map((tx) => ({
          ...tx,
          result: {
            ...tx.result,
            reciever: decodeFunctionData({
              abi: pyUsdAbi,
              data: tx.result.input,
            }).args[0],
            amount: decodeFunctionData({
              abi: pyUsdAbi,
              data: tx.result.input,
            }).args[1],
          },
          success: hexToBool(tx.result.output),
        }));
      return result;
    },
  });
};
