import { toEthAddress } from "@/lib/utils";
import { useAccount, useConnect } from "wagmi";
import { Button } from "./ui/button";
import { Wallet } from "lucide-react";

export const RegisterWalletButton = () => {
  const { address } = useAccount();
  const { connectors, connect } = useConnect();

  return (
    <div className="mt-2">
      {address && (
        <span className="flex gap-2 items-center">
          <Wallet />
          {address && toEthAddress(address)}
        </span>
      )}
      {!address && (
        <Button
          type="button"
          className="w-full"
          key={connectors[0].uid}
          onClick={() => connect({ connector: connectors[0] })}
        >
          Connect wallet
        </Button>
      )}
    </div>
  );
};
