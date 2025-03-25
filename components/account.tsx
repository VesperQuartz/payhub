import { useAccount, useDisconnect } from "wagmi";
import { Button } from "./ui/button";
import { toEthAddress } from "@/lib/utils";

export const Account = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div className="flex gap-2 items-center">
      <span>{address && toEthAddress(address)}</span>
      <Button onClick={() => disconnect()} className="h-7 w-24">
        Disconnect
      </Button>
    </div>
  );
};
