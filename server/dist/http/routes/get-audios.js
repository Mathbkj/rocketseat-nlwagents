import { db } from "../../db/index.js";
import { options } from "../../db/schemas/index.js";
import { z } from "zod/v4";
import { eq } from "drizzle-orm";
export const getRoomAudios = (app) => {
    app.get("/salas/:id/audios", {
        schema: {
            params: z.object({ id: z.string() }),
        },
    }, async ({ params }) => {
        const { id } = params;
        const results = await db
            .select({
            id: options.audioChunks.id,
            vectors: options.audioChunks.embeddings,
            audio: options.audioChunks.transcription,
        })
            .from(options.audioChunks)
            .where(eq(options.audioChunks.roomId, id));
        return results;
    });
};
