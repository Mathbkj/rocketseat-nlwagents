import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { DB_URL } from "../envLoader.js";
import { options } from "./schemas/index.js";
export const client = postgres(DB_URL);
export const db = drizzle(client, { schema: options, casing: "snake_case" });
