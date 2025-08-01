import { pgTable, text, uuid, vector } from "drizzle-orm/pg-core";
import { rooms } from "./rooms.ts";

export const audioChunks = pgTable("audio_chunks", {
  id: uuid("id").primaryKey().defaultRandom(),
  roomId: uuid()
    .references(() => rooms.id)
    .notNull(),
  transcription: text().notNull(),
  embeddings: vector({ dimensions: 768 }).notNull(),
});
