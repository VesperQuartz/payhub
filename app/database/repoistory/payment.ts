import { db } from "@/lib/database";
import {
  InsertTransaction,
  SelectTransaction,
  transactionTable,
} from "../schema";
import { to } from "await-to-ts";
import { eq } from "drizzle-orm";

interface TransactionRepositoryImpl {
  save(user: InsertTransaction): Promise<SelectTransaction>;
  findTransactionByMerchantAddress(
    merchantAddress: string,
  ): Promise<SelectTransaction[]>;
}

export class TransactionRepository implements TransactionRepositoryImpl {
  async save(payload: InsertTransaction): Promise<SelectTransaction> {
    const [error, transaction] = await to(
      db.insert(transactionTable).values(payload).returning(),
    );
    if (error) {
      throw error;
    }
    return transaction[0];
  }

  async findTransactionByMerchantAddress(
    merchantAddress: `0x${string}`,
  ): Promise<SelectTransaction[]> {
    const [error, transaction] = await to(
      db
        .select()
        .from(transactionTable)
        .where(eq(transactionTable.merchantAddress, merchantAddress)),
    );
    if (error) {
      throw error;
    }
    return transaction;
  }
}
