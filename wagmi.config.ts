import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { mainnet, sepolia, holesky } from "wagmi/chains";
import "dotenv/config";
import { erc20Abi } from "viem";

export default defineConfig({
  out: "app/generated.ts",
  contracts: [
    {
      name: "erc20",
      abi: erc20Abi,
      address: {
        [mainnet.id]: "0x6c3ea9036406852006290770BEdFcAbA0e23A0e8",
        [sepolia.id]: "0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9",
        [holesky.id]: "0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9",
      },
    },
  ],
  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_API_KEY!,
      chainId: sepolia.id,
      contracts: [
        {
          name: "PyUSD",
          address: {
            [mainnet.id]: "0x6c3ea9036406852006290770BEdFcAbA0e23A0e8",
            [sepolia.id]: "0xCaC524BcA292aaade2DF8A05cC58F0a65B1B3bB9",
          },
        },
      ],
      tryFetchProxyImplementation: true,
    }),
    react(),
  ],
});
