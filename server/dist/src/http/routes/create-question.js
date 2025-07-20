import { generateAnswer, generateEmbeddings } from "../../services/gemini.js";
import { db } from "../../db/index.js";
import { options } from "../../db/schemas/index.js";
import { z } from "zod/v4";
import { eq, sql, and } from "drizzle-orm";
export const createRoomQuestion = (app) => {
    app.post("/salas/:id/perguntas", {
        schema: {
            params: z.object({
                id: z.string(),
            }),
            body: z.object({
                question: z.string().min(1),
            }),
        },
    }, async ({ body, params }, response) => {
        const { question } = body;
        const { id: roomId } = params;
        const embeddings = await generateEmbeddings(question);
        const embeddingsAsString = `[${embeddings.join(",")}]`;
        const embedding_chunks = await db
            .select({
            id: options.audioChunks.id,
            transcription: options.audioChunks.transcription,
            similarity: sql `1-(${options.audioChunks.embeddings}<=>${embeddingsAsString}::vector)`,
        })
            .from(options.audioChunks)
            .where(and(eq(options.audioChunks.roomId, roomId), sql `1-(${options.audioChunks.embeddings}<=>${embeddingsAsString}::vector) > 0.7`))
            .orderBy(sql `${options.audioChunks.embeddings}<=>${embeddingsAsString}::vector`)
            .limit(3);
        let answer = null;
        if (embedding_chunks.length > 0) {
            const transcriptions = embedding_chunks.map((chunk) => chunk.transcription);
            answer = await generateAnswer(question, transcriptions);
        }
        const result = await db
            .insert(options.questions)
            .values({
            roomId,
            question,
            answer,
        })
            .returning();
        if (!result[0])
            throw new Error("Falha ao criar nova sala");
        return response.status(201).send({ questionId: result[0].id });
    });
};
