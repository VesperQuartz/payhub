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
    <div className="rounded-lg border border-neutral-800 bg-black p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Top Customers</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-neutral-400">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Table>
        <TableBody>
          {topCustomers?.map((customer) => (
            <TableRow key={crypto.randomUUID()}>
              <TableCell className="flex items-center gap-3">
                {/* <div */}
                {/*   className={`flex h-8 w-8 items-center justify-center rounded-full ${customer.avatarColor}`} */}
                {/* > */}
                {/*   <span className="text-xs text-white"> */}
                {/*     {customer.customerAddress} */}
                {/*   </span> */}
                {/* </div> */}
                <span>{toEthAddress(customer.customerAddress)}</span>
              </TableCell>
              <TableCell>${customer.price} spent</TableCell>
              <TableCell>{customer.totalCount} Transactions</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TopCustomersTable;
