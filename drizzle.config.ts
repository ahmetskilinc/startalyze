import { defineConfig } from "drizzle-kit";
import "dotenv/config";
import { env } from "@/lib/env";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
