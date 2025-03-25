import "dotenv/config";
import { parseEnv } from "znv";
import { z } from "zod";

console.log(process.env, "env");
export const env = parseEnv(process.env, {
  NEXT_PUBLIC_MAIN_RPC: z.string(),
  NEXT_PUBLIC_SEPOLIA_RPC: z.string(),
  NEXT_PUBLIC_HOLESKY_RPC: z.string(),
  ETHERSCAN_API_KEY: z.string(),
});
