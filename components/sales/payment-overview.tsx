"use cleint";
interface PaymentOverviewProps {
  totalReceived: number;
  totalTransactions: number;
  successRate: number;
}

export function PaymentOverview({
  totalReceived,
  totalTransactions,
  successRate,
}: PaymentOverviewProps) {
  return (
    <div className="border border-neutral-800 rounded-lg p-6 bg-black">
      <h2 className="text-xl font-semibold mb-1">Payment Overview</h2>
      <p className="text-neutral-400 text-sm mb-6">
        View and manage all your PYUSD payments
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-neutral-800 rounded-lg p-4 bg-neutral-900">
          <p className="text-neutral-400 text-sm mb-1">Total Received</p>
          <p className="text-3xl font-bold">${totalReceived.toFixed(2)}</p>
        </div>

        <div className="border border-neutral-800 rounded-lg p-4 bg-neutral-900">
          <p className="text-neutral-400 text-sm mb-1">Transactions</p>
          <p className="text-3xl font-bold">{totalTransactions}</p>
        </div>

        <div className="border border-neutral-800 rounded-lg p-4 bg-neutral-900">
          <p className="text-neutral-400 text-sm mb-1">Success Rate</p>
          <p className="text-3xl font-bold">
            {Number.isNaN(successRate) ? 0 : successRate}%
          </p>
        </div>
      </div>
    </div>
  );
}
