import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
export const rooms = pgTable("rooms", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    name: text("name").notNull().unique(),
    description: text(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});
