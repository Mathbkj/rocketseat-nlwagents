import { defineConfig } from "drizzle-kit";
import { DB_URL } from "./src/envLoader.ts";

export default defineConfig({
  dialect: "postgresql",
  casing: "snake_case",
  schema: "./src/db/schemas/**.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    url: DB_URL,
  },
});
