import { reset, seed } from "drizzle-seed";
import { client, db } from "./index.ts";
import { options } from "./schemas/index.ts";

await reset(db, options);
await seed(db, options).refine((faker) => {
  return {
    rooms: {
      columns: { name: faker.companyName(), description: faker.loremIpsum() },
    },
  };
});
await client.end();
// biome-ignore lint/suspicious/noConsole: development debugging purpose
console.log("Database seeded successfully!");
