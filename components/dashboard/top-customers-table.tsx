import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { SelectTransaction } from "@/app/database/schema";
import { getTopCustomers, toEthAddress } from "@/lib/utils";

const TopCustomersTable = ({
  customers,
}: {
  customers: SelectTransaction[];
}) => {
  const topCustomers = getTopCustomers(customers);
  return (
    <div className="rounded-lg border border-neutral-800 bg-black p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg md:text-xl font-semibold">Top Customers</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-neutral-400">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="relative w-full">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <Table>
              <TableBody>
                {topCustomers?.map((customer) => (
                  <TableRow key={crypto.randomUUID()}>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <span className="text-sm md:text-base">
                          {toEthAddress(customer.customerAddress)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-sm md:text-base">
                      ${customer.price.toFixed(2)} spent
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-sm md:text-base">
                      {customer.totalCount} Transactions
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCustomersTable;
