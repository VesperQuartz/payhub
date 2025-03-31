import { pyUsdAbi } from "@/app/generated";
import { client } from "@/lib/custom-client";
import { useMutation, useQuery } from "@tanstack/react-query";
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

export const useDebugTraceBlockByNumber = () => {
  return useMutation({
    mutationKey: ["debug_traceBlockByNumber"],
    mutationFn: async (blockNo: string | number | undefined) => {
      const disputeCheck = await client.request({
        method: "debug_traceBlockByNumber",
        params: [
          toHex(Number(blockNo!)),
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
            amount:
              Number(
                decodeFunctionData({
                  abi: pyUsdAbi,
                  data: tx.result.input,
                }).args[1],
              ) / 1e6,
          },
          success: hexToBool(tx.result.output),
        }));
      return result;
    },
  });
};
