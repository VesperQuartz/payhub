"use client";

import { useReadPyUsdBalanceOf } from "@/app/generated";
import { toBalance } from "@/lib/utils";
import React from "react";
import { useAccount, useBlockNumber } from "wagmi";

export const ShowBalance = () => {
  const account = useAccount();
  const block = useBlockNumber({
    watch: true,
  });
  const balance = useReadPyUsdBalanceOf({
    args: [account.address!],
    query: {
      enabled: !!account.address,
    },
  });
  React.useEffect(() => {
    balance.refetch();
  }, [block, balance]);
  return (
    <div>
      <p>{toBalance(balance.data)}</p>
    </div>
  );
};
