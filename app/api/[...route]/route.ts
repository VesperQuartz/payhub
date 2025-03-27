import { Hono } from "hono";
import { handle } from "hono/vercel";
import { zValidator } from "@hono/zod-validator";
import {
  BusinessProfileInsertSchema,
  CategoryInsertSchema,
  ProductInsertSchema,
  ProductUpdateSchema,
  TransactionInsertSchema,
  UserInsertSchema,
} from "@/app/database/schema";
import { UserRepository } from "@/app/database/repoistory/user";
import { to } from "await-to-ts";
import { BusinessRepository } from "@/app/database/repoistory/business";
import { z } from "zod";
import { ProductRepository } from "@/app/database/repoistory/product";
import { CategoryRepository } from "@/app/database/repoistory/category";
import { TransactionRepository } from "@/app/database/repoistory/payment";
import { StoreRepository } from "@/app/database/repoistory/store";

export const maxDuration = 30;

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

app.post("/register", zValidator("json", UserInsertSchema), async (c) => {
  const payload = c.req.valid("json");
  const user = new UserRepository();
  const [_error, wallet] = await to(
    user.findUserByWalletAddress(payload.walletAddress),
  );
  if (wallet) {
    return c.json({ error: "User already exists" }, 400);
  }
  const [error, result] = await to(user.save(payload));
  if (error) {
    return c.json({ error: error.message }, 500);
  }
  return c.json(result);
});

app.get(
  "/user/:walletAddress",
  zValidator(
    "param",
    z.object({
      walletAddress: z.custom<`0x${string}`>(),
    }),
  ),
  async (c) => {
    const payload = c.req.valid("param");
    const users = new UserRepository();
    const [error, user] = await to(
      users.findUserByWalletAddress(payload.walletAddress),
    );
    if (error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json(user);
  },
);

app.post(
  "/business",
  zValidator("json", BusinessProfileInsertSchema),
  async (c) => {
    const payload = c.req.valid("json");
    const business = new BusinessRepository();
    const [error, result] = await to(business.save(payload));
    if (error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json(result);
  },
);

app.post("/product", zValidator("json", ProductInsertSchema), async (c) => {
  const payload = c.req.valid("json");
  const product = new ProductRepository();
  const [error, result] = await to(product.save(payload));
  if (error) {
    return c.json({ error: error.message }, 500);
  }
  return c.json(result);
});

// app.get(
//   "/product/:id",
//   zValidator(
//     "param",
//     z.object({
//       id: z.number(),
//     }),
//   ),
//   async (c) => {
//     const payload = c.req.valid("param");
//     const product = new ProductRepository();
//     const [error] = await to(product.deleteProductById(payload.id));
//     if (error) {
//       return c.json({ error: error.message }, 500);
//     }
//     return c.json({ message: "Product deleted" });
//   },
// );
//
app.put(
  "/product/:id",
  zValidator(
    "param",
    z.object({
      id: z.coerce.number(),
    }),
  ),
  zValidator("json", ProductUpdateSchema),
  async (c) => {
    const payload = c.req.valid("param");
    const data = c.req.valid("json");
    const product = new ProductRepository();
    const [error] = await to(product.updateProductById(payload.id, data));
    if (error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ message: "Product updated" });
  },
);

app.delete(
  "/product/:id",
  zValidator(
    "param",
    z.object({
      id: z.coerce.number(),
    }),
  ),
  async (c) => {
    const payload = c.req.valid("param");
    const product = new ProductRepository();
    const [error] = await to(product.deleteProductById(payload.id));
    if (error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json({ message: "Product deleted" });
  },
);

app.get(
  "/product/:merchantAddress",
  zValidator(
    "param",
    z.object({
      merchantAddress: z.custom<`0x${string}`>(),
    }),
  ),
  async (c) => {
    const payload = c.req.valid("param");
    const product = new ProductRepository();
    const [error, result] = await to(
      product.getProductByMerchantAddress(payload.merchantAddress),
    );
    if (error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json(result);
  },
);

app.get(
  "/category/:merchantAddress",
  zValidator(
    "param",
    z.object({
      merchantAddress: z.custom<`0x${string}`>(),
    }),
  ),
  async (c) => {
    const payload = c.req.valid("param");
    const category = new CategoryRepository();
    const [error, result] = await to(
      category.findCategoryByWalletAddress(payload.merchantAddress),
    );
    if (error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json(result);
  },
);

app.post("/category", zValidator("json", CategoryInsertSchema), async (c) => {
  const payload = c.req.valid("json");
  const category = new CategoryRepository();
  const [error, result] = await to(category.save(payload));
  if (error) {
    return c.json({ error: error.message }, 500);
  }
  return c.json(result);
});

app.post(
  "/transaction",
  zValidator("json", TransactionInsertSchema),
  async (c) => {
    const payload = c.req.valid("json");
    const payment = new TransactionRepository();
    const [error, result] = await to(payment.save(payload));
    if (error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json(result);
  },
);

app.get(
  "/transaction/:merchantAddress",
  zValidator(
    "param",
    z.object({
      merchantAddress: z.custom<`0x${string}`>(),
    }),
  ),
  async (c) => {
    const payload = c.req.valid("param");
    const payment = new TransactionRepository();
    const [error, result] = await to(
      payment.findTransactionByMerchantAddress(payload.merchantAddress),
    );
    if (error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json(result);
  },
);

app.get(
  "/transaction/users/:customerAddress",
  zValidator(
    "param",
    z.object({
      customerAddress: z.custom<`0x${string}`>(),
    }),
  ),
  async (c) => {
    const payload = c.req.valid("param");
    const payment = new TransactionRepository();
    const [error, result] = await to(
      payment.findTransactionByCustomerAddress(payload.customerAddress),
    );
    if (error) {
      return c.json({ error: error.message }, 500);
    }
    return c.json(result);
  },
);

app.get("/store", async (c) => {
  const store = new StoreRepository();
  const [error, result] = await to(store.getAllStoreItems());
  if (error) {
    return c.json({ error: error.message }, 500);
  }
  return c.json(result);
});

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
