import { db } from "@/lib/database";
import {
  businessProfileTable,
  InsertBusinessProfile,
  SelectBusinessProfile,
} from "../schema";
import { to } from "await-to-ts";
import { eq } from "drizzle-orm";

interface BusinessRepositoryImpl {
  save(user: InsertBusinessProfile): Promise<SelectBusinessProfile>;
  findBusinessByMerchantAddress(
    address: `0x${string}`,
  ): Promise<SelectBusinessProfile>;
}

export class BusinessRepository implements BusinessRepositoryImpl {
  async save(payload: InsertBusinessProfile): Promise<SelectBusinessProfile> {
    const [error, business] = await to(
      db
        .insert(businessProfileTable)
        .values({
          businessCategory: payload.businessCategory,
          businessName: payload.businessName,
          businessType: payload.businessType,
          businessWebsite: payload.businessWebsite,
          merchantAddress: payload.merchantAddress,
          businessDescription: payload.businessDescription,
        })
        .returning(),
    );
    if (error) {
      throw error;
    }
    return business[0];
  }
  async findBusinessByMerchantAddress(
    address: `0x${string}`,
  ): Promise<SelectBusinessProfile> {
    const [error, business] = await to(
      db
        .select()
        .from(businessProfileTable)
        .where(eq(businessProfileTable.merchantAddress, address)),
    );
    if (error) {
      throw error;
    }
    return business[0];
  }
}
