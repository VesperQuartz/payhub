import { db } from "@/lib/database";
import { InsertUser, SelectUser, userTable } from "../schema";
import { to } from "await-to-ts";
import { eq } from "drizzle-orm";

interface UserRepositoryImpl {
  save(user: InsertUser): Promise<SelectUser>;
  findUserByWalletAddress(walletAddress: string): Promise<SelectUser>;
}

export class UserRepository implements UserRepositoryImpl {
  async save(payload: InsertUser): Promise<SelectUser> {
    const [error, user] = await to(
      db
        .insert(userTable)
        .values({
          walletAddress: payload.walletAddress,
          businessName: payload.businessName,
          role: payload.role,
          email: payload.email,
          verifiedSignature: payload.verifiedSignature,
        })
        .returning(),
    );
    if (error) {
      throw error;
    }
    return user[0];
  }

  async findUserByWalletAddress(
    walletAddress: `0x${string}`,
  ): Promise<SelectUser> {
    const [error, user] = await to(
      db
        .select()
        .from(userTable)
        .where(eq(userTable.walletAddress, walletAddress)),
    );
    if (error) {
      throw error;
    }
    return user[0];
  }
}
