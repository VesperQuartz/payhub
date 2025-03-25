import { db } from "@/lib/database";
import { to } from "await-to-ts";
import { StoreInfoProduct } from "../schema";

interface StoreRepositoryImpl {
  getAllStoreItems(): Promise<StoreInfoProduct[]>;
}

export class StoreRepository implements StoreRepositoryImpl {
  async getAllStoreItems(): Promise<StoreInfoProduct[]> {
    const [error, store] = await to(
      db.query.businessProfileTable.findMany({
        with: {
          product: true,
        },
      }),
    );
    if (error) {
      throw error;
    }
    return store;
  }
}
