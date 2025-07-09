import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { rooms } from "./rooms.ts";

export const questions = pgTable("questions", {
  id: uuid("id").primaryKey().defaultRandom(),
  roomId: uuid()
    .references(() => rooms.id)
    .notNull(),
  question: text().notNull(),
  answer: text(),
  description: text(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});
