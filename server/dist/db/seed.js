import { reset, seed } from "drizzle-seed";
import { client, db } from "./index.js";
import { options } from "./schemas/index.js";
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
// biome-ignore lint/suspicious/noConsole: development debugging purpose
console.log("Database seeded successfully!");
