import { db } from "../../db/index.ts";
import { options } from "../../db/schemas/index.ts";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";

export const createRoom: FastifyPluginCallbackZod = (app) => {
  app.post(
    "/salas",
    {
      schema: {
        body: z.object({
          name: z.string().min(1),
          description: z.string().optional(),
        }),
      },
    },
    async ({ body }, response) => {
      const { name, description } = body;
      const result = await db
        .insert(options.rooms)
        .values({
<<<<<<< HEAD
          name: name.split(" ").join("").trim(),
          description: description ?? null,
        })
        .onConflictDoNothing()
=======
          name,
          description: description ?? null,
        })
>>>>>>> 5f1a0ac (Initial commit)
        .returning();

      if (!result[0]) throw new Error("Falha ao criar nova sala");
      return response.status(201).send({ id: result[0].id });
    }
  );
};
