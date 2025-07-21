import { reset, seed } from "drizzle-seed";
import { client, db } from "./index.ts";
import { options } from "./schemas/index.ts";

await reset(db, options);
await seed(db, options).refine((faker) => {
  return {
    rooms: {
      columns: {
        name: faker.companyName(),
        description: faker.loremIpsum(),
      },
      with: {
        questions: 10,
      },
    },
  };
});
await client.end();
