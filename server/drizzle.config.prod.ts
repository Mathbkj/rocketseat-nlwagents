import { defineConfig } from "drizzle-kit";
import { DB_URL } from "./src/envLoader.ts";

export default defineConfig({
  dialect: "postgresql",
  casing: "snake_case",
  schema: "./dist/db/schemas/**.js",
  out: "./dist/db/migrations",
  dbCredentials: {
    url: DB_URL,
  },
});
