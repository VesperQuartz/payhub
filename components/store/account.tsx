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
  }, [getUser.data?.walletAddress, address, register]);
  return (
    <div className="flex gap-2 items-center">
      <span>{address ? toEthAddress(address) : null}</span>
      <Button onClick={() => disconnect()} className="h-7 w-24">
        Disconnect
      </Button>
    </div>
  );
};
