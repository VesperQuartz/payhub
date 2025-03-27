import { SelectTransaction } from "@/app/database/schema";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { match, P } from "ts-pattern";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toBalance = (value: bigint | undefined | number): number => {
  return value ? Number(value) / 10e5 : 0;
};

export const toEthAddress = (address: `0x${string}` | undefined) => {
  return `${address?.slice(0, 6)}...${address?.slice(-4)}`;
};

export const getStatusBadgeClass = (status: number) => {
  return match(status)
    .with(0, () => ["bg-yellow-500/20 text-yellow-500", "Out of Stock"])
    .with(P.number.between(1, 50), () => [
      "bg-yellow-500/20 text-yellow-500",
      "Low Stock",
    ])
    .with(P.number.between(51, 1e6), () => [
      "bg-emerald-500/20 text-emerald-500",
      "Active",
    ])
    .otherwise(() => []);
};
interface CustomerSummary {
  customerAddress: `0x${string}`;
  price: number;
  totalCount: number;
}
export const getTopCustomers = (
  transactions: SelectTransaction[] | undefined,
) => {
  const customerMap: Record<`0x${string}`, CustomerSummary> = {};
  transactions?.forEach((transaction) => {
    const address = transaction.customerAddress;
    if (!customerMap[address]) {
      customerMap[address] = {
        customerAddress: address,
        price: 0,
        totalCount: 0,
      };
    }
    customerMap[address].price += transaction.price;
    customerMap[address].totalCount += 1;
  });
  const customers = Object.values(customerMap);
  customers.sort((a, b) => b.price - a.price);
  return customers;
};

export const toNetWorkFee = (value: bigint | undefined | number): number => {
  return value ? Number(value) / 10e9 : 0;
};
