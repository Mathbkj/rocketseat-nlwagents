<<<<<<< HEAD
import { pgTable, text, uuid, vector } from "drizzle-orm/pg-core";
=======
import { pgTable, text, timestamp, uuid, vector } from "drizzle-orm/pg-core";
>>>>>>> 5f1a0ac (Initial commit)
import { rooms } from "./rooms.ts";

export const audioChunks = pgTable("audio_chunks", {
  id: uuid("id").primaryKey().defaultRandom(),
  roomId: uuid()
    .references(() => rooms.id)
    .notNull(),
  transcription: text().notNull(),
  embeddings: vector({ dimensions: 768 }).notNull(),
});
