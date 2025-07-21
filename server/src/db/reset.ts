import { reset, seed } from "drizzle-seed";
import { client, db } from "./index.ts";
import { options } from "./schemas/index.ts";

await reset(db, options);
await client.end();
