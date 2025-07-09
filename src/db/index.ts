import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { DB_URL } from "../envLoader.ts";
import { options } from "./schemas/index.ts";

export const client = postgres(DB_URL);
export const db = drizzle(client, { schema: options, casing: "snake_case" });
