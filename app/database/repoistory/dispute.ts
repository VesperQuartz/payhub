import { db } from "@/lib/database";
import { disputeTable, InsertDispute } from "../schema";
import { eq } from "drizzle-orm";
import { to } from "await-to-ts";

interface DisputeRepositoryImpl {
  save(dispute: InsertDispute): Promise<InsertDispute>;
  findDisputeByMerchantAddress(
    address: `0x${string}`,
  ): Promise<InsertDispute[]>;
}

export class DisputeRepository implements DisputeRepositoryImpl {
  async save(payload: InsertDispute): Promise<InsertDispute> {
    const [error, dispute] = await to(
      db.insert(disputeTable).values(payload).returning(),
    );
    if (error) throw error;
    return dispute[0];
  }
  async findDisputeByMerchantAddress(
    address: `0x${string}`,
  ): Promise<InsertDispute[]> {
    const [error, dispute] = await to(
      db
        .select()
        .from(disputeTable)
        .where(eq(disputeTable.merchantAddress, address)),
    );
    if (error) throw error;
    return dispute;
  }
}
