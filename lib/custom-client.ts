import { createPublicClient, http, rpcSchema } from "viem";
import { sepolia } from "viem/chains";

export type DebugParameterPayload = Partial<{
  tracer: "callTracer" | "prestateTracer";
  tracerConfig: {
    onlyTopCall: boolean;
  };
  timeout: string;
}>;

export type DebugParameterResponse = Array<{
  jsonrpc: string;
  id: number;
  result: {
    from: `0x${string}`;
    gas: `0x${string}`;
    gasUsed: `0x${string}`;
    to: `0x${string}`;
    input: `0x${string}`;
    output: `0x${string}`;
    value: `0x${string}`;
    type: string;
  };
}>;

export type DebugTraceResponse = Array<{
  txHash: `0x${string}`;
  success: boolean;
  result: {
    from: `0x${string}`;
    gas: `0x${string}`;
    gasUsed: `0x${string}`;
    to: `0x${string}`;
    input: `0x${string}`;
    output: `0x${string}`;
    value: `0x${string}`;
    type: string;
    reciever:
      | number
      | bigint
      | `0x${string}`
      | readonly `0x${string}`[]
      | readonly `0x${string}`[]
      | readonly `0x${string}`[]
      | readonly `0x${string}`[]
      | undefined;
    amount: number;
  };
}>;

type CustomRpcSchema = [
  {
    Method: "debug_traceTransaction";
    Parameters: [`0x${string}`, DebugParameterPayload];
    ReturnType: DebugParameterResponse;
  },
  {
    Method: "txpool_status";
    Parameters: [];
    ReturnType: {
      pending: `0x${string}`;
      queued: `0x${string}`;
    };
  },
  {
    Method: "debug_traceBlockByNumber";
    Parameters: [
      `0x${string}` | "latest" | "earliest" | "pending" | "finalized",
      DebugParameterPayload,
    ];
    ReturnType: DebugTraceResponse;
  },
];

export const client = createPublicClient({
  transport: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC, {
    batch: true,
  }),
  chain: sepolia,
  rpcSchema: rpcSchema<CustomRpcSchema>(),
});
