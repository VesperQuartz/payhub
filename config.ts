import { createConfig, http, webSocket } from "wagmi";
import { holesky, mainnet, sepolia } from "wagmi/chains";
import { metaMask, coinbaseWallet } from "wagmi/connectors";
import "dotenv/config";
import { env } from "./app/config";
declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}

export const config = createConfig({
  chains: [mainnet, sepolia, holesky],
  connectors: [metaMask(), coinbaseWallet()],
  ssr: true,
  batch: { multicall: true },
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_MAIN_RPC, {
      batch: true,
    }),
    [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC, {
      batch: true,
    }),
    [holesky.id]: http(process.env.NEXT_PUBLIC_HOLESKY_RPC, {
      batch: true,
    }),
  },
});

export const socketConfig = createConfig({
  chains: [mainnet, sepolia],
  connectors: [metaMask(), coinbaseWallet()],
  transports: {
    [mainnet.id]: webSocket(
      `wss://blockchain.googleapis.com/v1/projects/allforone-452211/locations/us-central1/endpoints/ethereum-mainnet/rpc?key=${process.env.NEXT_PUBLIC_GPC_KEY}`,
    ),
    [sepolia.id]: webSocket(
      `wss://blockchain.googleapis.com/v1/projects/allforone-452211/locations/us-central1/endpoints/ethereum-sepolia/rpc?key=${process.env.NEXT_PUBLIC_GPC_KEY}`,
    ),
  },
});
