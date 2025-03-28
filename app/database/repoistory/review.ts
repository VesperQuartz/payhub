import { db } from "@/lib/database";
import { InsertReview, Review, reviewTable, SelectReview } from "../schema";
import { to } from "await-to-ts";

interface ReviewRepositoryImpl {
  save(review: InsertReview): Promise<SelectReview>;
  findReviewByBusinessAddress(
    merchantAddress: `0x${string}`,
  ): Promise<Review | undefined>;
}

export class ReviewRepository implements ReviewRepositoryImpl {
  async save(payload: InsertReview): Promise<SelectReview> {
    const [error, user] = await to(
      db.insert(reviewTable).values(payload).returning(),
    );
    if (error) {
      throw error;
    }
    return user[0];
  }

  async findReviewByBusinessAddress(
    merchantAddress: `0x${string}`,
  ): Promise<Review | undefined> {
    const [error, productReview] = await to(
      db.query.businessProfileTable.findFirst({
        where: (table, { eq }) => eq(table.merchantAddress, merchantAddress),
        with: {
          reviews: true,
        },
      }),
    );
    if (error) {
      throw error;
    }
    return productReview;
  }
}
