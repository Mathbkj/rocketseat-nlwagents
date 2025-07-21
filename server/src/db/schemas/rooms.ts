<<<<<<< HEAD
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
=======
import { pgTable, text, timestamp, date, uuid } from "drizzle-orm/pg-core";
>>>>>>> 5f1a0ac (Initial commit)

export const rooms = pgTable("rooms", {
  id: uuid("id").primaryKey().defaultRandom().unique(),
  name: text("name").notNull().unique(),
  description: text(),
<<<<<<< HEAD
  createdAt: timestamp("created_at").notNull().defaultNow(),
=======
  createdAt: timestamp("created_at", { mode: "date" })
    .$defaultFn(() => new Date())
    .notNull(),
>>>>>>> 5f1a0ac (Initial commit)
});
