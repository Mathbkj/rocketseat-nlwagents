import { db } from "../../db/index.ts";
import { options } from "../../db/schemas/index.ts";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";

export const createRoomQuestion: FastifyPluginCallbackZod = (app) => {
  app.post(
    "/salas/:id/perguntas",
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          question: z.string().min(1),
        }),
      },
    },
    async ({ body, params }, response) => {
      const { question } = body;
      const { id: roomId } = params;
      const result = await db
        .insert(options.questions)
        .values({
          roomId,
          question,
        })
        .returning();

      if (!result[0]) throw new Error("Falha ao criar nova sala");
      return response.status(201).send({ questionId: result[0].id });
    }
  );
};
