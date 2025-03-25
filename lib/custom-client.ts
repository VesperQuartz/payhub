import { env } from "@/app/config";
import { createPublicClient, http, rpcSchema } from "viem";
import { mainnet, sepolia } from "viem/chains";

type CustomRpcSchema = [
  {
    Method: "debug_traceTransaction";
    Parameters: [`0x${string}`, {}];
    ReturnType: any;
  },
  {
    Method: "trace_transaction";
    Parameters: [`0x${string}`];
    ReturnType: any;
  },
  {
    Method: "trace_block";
    Parameters: ["latest" | "earliest" | "pending"];
    ReturnType: any;
  },
];

export const client = createPublicClient({
  transport: http(process.env.NEXT_PUBLIC_MAIN_RPC, {
    batch: true,
  }),
  chain: mainnet,
  rpcSchema: rpcSchema<CustomRpcSchema>(),
});
