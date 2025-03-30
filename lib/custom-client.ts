import { createPublicClient, http, rpcSchema } from "viem";
import { sepolia } from "viem/chains";

type DebugParameterPayload = Partial<{
  tracer: "callTracer" | "prestateTracer";
  tracerConfig: {
    onlyTopCall: boolean;
  };
  timeout: string;
}>;

type DebugParameterResponse = Array<{
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

type DebugTraceResponse = Array<{
  jsonrpc: string;
  id: number;
  txHash: `0x${string}`;
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

type CustomRpcSchema = [
  {
    Method: "debug_traceTransaction";
    Parameters: [`0x${string}`, DebugParameterPayload];
    ReturnType: DebugParameterResponse;
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
