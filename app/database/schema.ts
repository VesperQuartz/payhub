import { relations, sql } from "drizzle-orm";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { integer, numeric, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { z } from "zod";

export const userTable = sqliteTable("users", {
  walletAddress: text("wallet_address").$type<`0x${string}`>().primaryKey(),
  businessName: text("business_name"),
  email: text("email").unique(),
  role: text("role").$type<"merchant" | "user">().notNull(),
  verifiedSignature: text("verified_signature").$type<`0x${string}`>(),
  updateAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export const businessProfileTable = sqliteTable("business_profile", {
  merchantAddress: text("wallet_address").$type<`0x${string}`>().primaryKey(),
  businessName: text("name").notNull(),
  businessType: text("type").notNull(),
  businessCategory: text("category").notNull(),
  businessDescription: text("description").notNull(),
  businessWebsite: text("web_url"),
  ratings: numeric("rating", { mode: "number" }).default(0),
  image: text("image").default("/store.jpg"),
  updateAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export const productTable = sqliteTable("products", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  productName: text("name").notNull(),
  productDescription: text("description").notNull(),
  productPrice: numeric("amount", { mode: "number" }).notNull(),
  productCategory: text("category").notNull(),
  stock: integer("stock").notNull(),
  merchantAddress: text("merchant_address")
    .$type<`0x${string}`>()
    .references(() => businessProfileTable.merchantAddress),
  updateAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export const reviewTable = sqliteTable("reviews", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  review: text("review"),
  ratings: integer("ratings").notNull().default(1),
  walletAddress: text("wallet_address")
    .$type<`0x${string}`>()
    .unique()
    .references(() => userTable.walletAddress),
  merchantAddress: text("merchant_address")
    .$type<`0x${string}`>()
    .references(() => businessProfileTable.merchantAddress),
  updateAt: text("updated_at").$onUpdate(() => new Date().toISOString()),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export const transactionTable = sqliteTable("transactions", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  productName: text("product_name").notNull(),
  price: integer("amount").notNull(),
  status: text("status")
    .$type<"completed" | "pending" | "disputed">()
    .notNull(),
  txHash: text("tx_hash").$type<`0x${string}`>().notNull(),
  customerAddress: text("customer_address")
    .$type<`0x${string}`>()
    .references(() => userTable.walletAddress)
    .notNull(),
  merchantAddress: text("merchant_address")
    .$type<`0x${string}`>()
    .references(() => businessProfileTable.merchantAddress)
    .notNull(),
  updateAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export const disputeTable = sqliteTable("dispute", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  txHash: text("tx_hash").$type<`0x${string}`>().notNull(),
  customerAddress: text("customer_address").$type<`0x${string}`>().notNull(),
  productName: text("product_name").notNull(),
  price: integer("amount").notNull(),
  issue: text("issue").notNull(),
  resolution: text("resulotion").notNull(),
  merchantAddress: text("merchant_address")
    .$type<`0x${string}`>()
    .references(() => businessProfileTable.merchantAddress)
    .notNull(),
  updateAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export const categoryTable = sqliteTable("category", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  merchantAddress: text("merchant_address")
    .$type<`0x${string}`>()
    .references(() => businessProfileTable.merchantAddress)
    .notNull(),
  updateAt: integer("updated_at", { mode: "timestamp" }).$onUpdate(
    () => new Date(),
  ),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export const businessProfileRelation = relations(
  businessProfileTable,
  ({ many }) => ({
    product: many(productTable),
  }),
);

export const productTableRelation = relations(productTable, ({ one }) => ({
  address: one(businessProfileTable, {
    fields: [productTable.merchantAddress],
    references: [businessProfileTable.merchantAddress],
  }),
}));

export const businessReviewRelation = relations(
  businessProfileTable,
  ({ many }) => ({
    reviews: many(reviewTable),
  }),
);

export const reviewBusinessRelation = relations(reviewTable, ({ one }) => ({
  merchant: one(businessProfileTable, {
    fields: [reviewTable.merchantAddress],
    references: [businessProfileTable.merchantAddress],
  }),
}));

export type InsertUser = typeof userTable.$inferInsert;
export type SelectUser = typeof userTable.$inferSelect;
export const UserInsertSchema = createInsertSchema(userTable, {
  role: z.union([z.literal("merchant"), z.literal("user")]),
  walletAddress: z.custom<`0x${string}`>(),
  verifiedSignature: z.custom<`0x${string}`>().optional(),
});

export type InsertBusinessProfile = typeof businessProfileTable.$inferInsert;
export type SelectBusinessProfile = typeof businessProfileTable.$inferSelect;
export const BusinessProfileInsertSchema = createInsertSchema(
  businessProfileTable,
  {
    merchantAddress: z.custom<`0x${string}`>(),
  },
);

export type InsertTransaction = typeof transactionTable.$inferInsert;
export type SelectTransaction = typeof transactionTable.$inferSelect;
export const TransactionInsertSchema = createInsertSchema(transactionTable, {
  customerAddress: z.custom<`0x${string}`>(),
  merchantAddress: z.custom<`0x${string}`>(),
  status: z.enum(["completed", "pending", "disputed"]),
  txHash: z.custom<`0x${string}`>(),
  price: z.coerce.number(),
});

export type InsertCategory = typeof categoryTable.$inferInsert;
export type SelectCategory = typeof categoryTable.$inferSelect;
export const CategoryInsertSchema = createInsertSchema(categoryTable, {
  merchantAddress: z.custom<`0x${string}`>(),
});

export type InsertProduct = typeof productTable.$inferInsert;
export type SelectProduct = typeof productTable.$inferSelect;
export const ProductInsertSchema = createInsertSchema(productTable, {
  merchantAddress: z.custom<`0x${string}`>(),
});
export const ProductUpdateSchema = createUpdateSchema(productTable, {
  merchantAddress: z.custom<`0x${string}`>(),
});

export type UpdateProduct = z.infer<typeof ProductUpdateSchema>;
export type StoreInfoProduct = SelectBusinessProfile & {
  product?: SelectProduct[];
};

export type InsertReview = typeof reviewTable.$inferInsert;
export type SelectReview = typeof reviewTable.$inferSelect;
export const ReviewInsertSchema = createInsertSchema(reviewTable, {
  walletAddress: z.custom<`0x${string}`>(),
  ratings: z.coerce.number(),
  merchantAddress: z.custom<`0x${string}`>(),
});

export type InsertDispute = typeof disputeTable.$inferInsert;
export type SelectDispute = typeof disputeTable.$inferSelect;
export const DisputeInsertSchema = createInsertSchema(disputeTable, {
  merchantAddress: z.custom<`0x${string}`>(),
  customerAddress: z.custom<`0x${string}`>(),
  txHash: z.custom<`0x${string}`>(),
  price: z.coerce.number(),
});

export type Review = typeof businessProfileTable.$inferSelect & {
  reviews?: SelectReview[];
};
