import { db } from "../../db/index.js";
import { options } from "../../db/schemas/index.js";
import { z } from "zod/v4";
import { desc, eq } from "drizzle-orm";
export const getRoomQuestions = (app) => {
    app.get("/salas/:id/perguntas", {
        schema: {
            params: z.object({ id: z.string() }),
        },
    }, async ({ params }) => {
        const { id } = params;
        const results = await db
            .select({
            id: options.questions.id,
            question: options.questions.question,
            answer: options.questions.answer,
            createdAt: options.questions.createdAt,
            description: options.questions.description,
        })
            .from(options.questions)
            .where(eq(options.questions.roomId, id))
            .orderBy(desc(options.questions.createdAt));
        return results;
    });
};
