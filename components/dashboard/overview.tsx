"use client";
import { SalesAnalytics } from "./sales-analytics";
import StatCard from "./stat-card";
import TopCustomersTable from "./top-customers-table";
import TransactionsTable from "./transactions-table";
import { useGetTransactionByMerchantAddress } from "@/app/hooks/api";
import { useAccount } from "wagmi";
export const OverView = () => {
  const { address } = useAccount();
  const transactions = useGetTransactionByMerchantAddress(address!);
  const pendingTransaction = transactions.data?.filter(
    (tx) => tx.status === "pending",
  ).length;

  const completedTransaction = transactions.data?.filter(
    (tx) => tx.status === "completed",
  ).length;
  const totalSales = transactions.data?.reduce((acc, tx) => acc + tx.price, 0);

  const recentTransactions = transactions.data?.slice(0, 6);
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Your Balance"
          value={`0`}
          valueColor="text-emerald-500"
          showEyeIcon={true}
        />
        <StatCard
          title="Pending Payments"
          value={`${pendingTransaction ?? 0}`}
        />
        <StatCard
          title="Total Sales"
          value={`$${totalSales?.toFixed(2) ?? 0} PYUSD`}
        />
        <StatCard
          title="Completed Transaction"
          value={`${completedTransaction ?? 0}`}
        />
      </div>

      <div className="grid m-4 grid-cols-1 gap-6 lg:grid-cols-2">
        <SalesAnalytics />
        <TopCustomersTable customers={transactions?.data ?? []} />
      </div>

      <TransactionsTable transactions={recentTransactions ?? []} />
    </div>
  );
};
