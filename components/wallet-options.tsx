import * as React from "react";
import { WalletMetamask } from "@web3icons/react";
import { WalletCoinbase } from "@web3icons/react";
import { Connector, useConnect } from "wagmi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export function WalletOptions() {
  const { connectors, connect } = useConnect();
  const wallet = [
    {
      icon: <WalletMetamask variant="branded" size="24" />,
    },
    {
      icon: <WalletCoinbase variant="branded" size="24" />,
    },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Connect Wallet</Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-black text-white">
        <DialogHeader>
          <DialogTitle>Wallet Connect</DialogTitle>
        </DialogHeader>
        {connectors.map((connector, index) => (
          <WalletOption
            icon={wallet[index].icon}
            key={connector.uid}
            connector={connector}
            onClick={() => connect({ connector })}
          />
        ))}
      </DialogContent>
    </Dialog>
  );
}

const WalletOption = ({
  connector,
  onClick,
  icon,
}: {
  connector: Connector;
  onClick: () => void;
  icon: React.ReactNode;
}) => {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <Card className="flex border-4 border-black h-10 justify-center">
      <CardContent className="flex justify-between">
        <div className="flex gap-2">
          {icon}
          <span>{connector.name}</span>
        </div>
        <Button disabled={!ready} onClick={onClick} className="w-20 h-7">
          Connect
        </Button>
      </CardContent>
    </Card>
  );
};
