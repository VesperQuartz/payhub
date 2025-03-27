import { useAccount, useDisconnect } from "wagmi";
import { toEthAddress } from "@/lib/utils";
import { Button } from "../ui/button";
import React from "react";
import { useGetUserByWalletAddress, useRegister } from "@/app/hooks/api";

export const Account = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const getUser = useGetUserByWalletAddress(address!);
  const register = useRegister();

  React.useEffect(() => {
    if (getUser.data?.walletAddress) {
    } else {
      register.mutate({
        walletAddress: address!,
        role: "user",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUser.data?.walletAddress]);
  return (
    <div className="flex gap-2 items-center">
      <span>{address && toEthAddress(address)}</span>
      <Button onClick={() => disconnect()} className="h-7 w-24">
        Disconnect
      </Button>
    </div>
  );
};
