import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../db/index.ts";
import { options } from "../../db/schemas/index.ts";
import { z } from "zod/v4";
import { createDecipheriv } from "crypto";
import { desc, eq } from "drizzle-orm";

export const getRoomQuestions: FastifyPluginCallbackZod = (app) => {
  app.get(
    "/salas/:id/perguntas",
    {
      schema: {
        params: z.object({ id: z.string() }),
      },
    },
    async ({ params }) => {
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
        .orderBy(
          options.questions.createdAt,
          desc(options.questions.createdAt)
        );
      return results;
    }
  );
};
