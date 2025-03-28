import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "../app/database/schema";
import { createClient } from "@libsql/client";

config({ path: ".env" }); // or .env.local

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.TURSO_TOKEN!,
});

export const db = drizzle({ schema: { ...schema }, client });
