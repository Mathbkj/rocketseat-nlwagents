<<<<<<< HEAD
import { reset } from "drizzle-seed";
=======
import { reset, seed } from "drizzle-seed";
>>>>>>> 5f1a0ac (Initial commit)
import { client, db } from "./index.ts";
import { options } from "./schemas/index.ts";

await reset(db, options);
await client.end();
<<<<<<< HEAD
=======
// biome-ignore lint/suspicious/noConsole: development debugging purpose
console.log("Database Successfully Reseted 🚩");
>>>>>>> 5f1a0ac (Initial commit)
