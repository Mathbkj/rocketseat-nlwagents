import { reset, seed } from "drizzle-seed";
import { client, db } from "./index.ts";
import { options } from "./schemas/index.ts";

await reset(db, options);
await client.end();
// biome-ignore lint/suspicious/noConsole: development debugging purpose
console.log("Database Successfully Reseted 🚩");
