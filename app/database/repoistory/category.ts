import { db } from "@/lib/database";
import { categoryTable, InsertCategory, SelectCategory } from "../schema";
import { to } from "await-to-ts";
import { eq } from "drizzle-orm";

interface CategoryRepositoryImpl {
  save(category: InsertCategory): Promise<SelectCategory>;
  findCategoryByWalletAddress(walletAddress: string): Promise<SelectCategory[]>;
}

export class CategoryRepository implements CategoryRepositoryImpl {
  async save(payload: InsertCategory): Promise<SelectCategory> {
    const [error, category] = await to(
      db
        .insert(categoryTable)
        .values({
          merchantAddress: payload.merchantAddress,
          name: payload.name,
        })
        .returning(),
    );
    if (error) {
      throw error;
    }
    return category[0];
  }

  async findCategoryByWalletAddress(
    walletAddress: `0x${string}`,
  ): Promise<SelectCategory[]> {
    const [error, category] = await to(
      db
        .select()
        .from(categoryTable)
        .where(eq(categoryTable.merchantAddress, walletAddress)),
    );
    if (error) {
      throw error;
    }
    return category;
  }
}
