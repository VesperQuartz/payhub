import { db } from "@/lib/database";
import {
  InsertProduct,
  productTable,
  SelectProduct,
  UpdateProduct,
} from "../schema";
import { to } from "await-to-ts";
import { eq, sql } from "drizzle-orm";

interface ProductRepositoryImpl {
  save(user: InsertProduct): Promise<SelectProduct>;
  getProductByMerchantAddress(
    merchantAddress: `0x${string}`,
  ): Promise<SelectProduct[]>;
  deleteProductById(id: number): Promise<void>;
  updateProductById(id: number, payload: UpdateProduct): Promise<SelectProduct>;
  updateProductStockById(id: number): Promise<SelectProduct>;
}

export class ProductRepository implements ProductRepositoryImpl {
  async save(payload: InsertProduct): Promise<SelectProduct> {
    const [error, products] = await to(
      db
        .insert(productTable)
        .values({
          productName: payload.productName,
          productCategory: payload.productCategory,
          productDescription: payload.productDescription,
          productPrice: payload.productPrice,
          merchantAddress: payload.merchantAddress,
          stock: payload.stock,
        })
        .returning(),
    );
    if (error) {
      throw error;
    }
    return products[0];
  }

  async getProductByMerchantAddress(
    merchantAddress: `0x${string}`,
  ): Promise<SelectProduct[]> {
    const [error, products] = await to(
      db
        .select()
        .from(productTable)
        .where(eq(productTable.merchantAddress, merchantAddress)),
    );
    if (error) {
      throw error;
    }
    return products;
  }

  async deleteProductById(id: number): Promise<void> {
    const [error] = await to(
      db.delete(productTable).where(eq(productTable.id, id)),
    );
    if (error) {
      throw error;
    }
  }

  async updateProductById(
    id: number,
    payload: UpdateProduct,
  ): Promise<SelectProduct> {
    const [error, product] = await to(
      db
        .update(productTable)
        .set({
          productName: payload.productName,
          productCategory: payload.productCategory,
          productDescription: payload.productDescription,
          productPrice: payload.productPrice,
          merchantAddress: payload.merchantAddress,
          stock: payload.stock,
        })
        .where(eq(productTable.id, id))
        .returning(),
    );
    if (error) {
      throw error;
    }
    return product[0];
  }
  async updateProductStockById(id: number): Promise<SelectProduct> {
    const [error, product] = await to(
      db
        .update(productTable)
        .set({
          stock: sql`${productTable.stock} - 1`,
        })
        .where(eq(productTable.id, id))
        .returning(),
    );
    if (error) {
      throw error;
    }
    return product[0];
  }
}
