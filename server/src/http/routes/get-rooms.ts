import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../db/index.ts";
import { options } from "../../db/schemas/index.ts";
import { count, eq } from "drizzle-orm";

export const getRooms: FastifyPluginCallbackZod = (app) => {
  app.get("/salas", async () => {
    const results = await db
      .select({
        id: options.rooms.id,
        name: options.rooms.name,
        description: options.rooms.description,
        createdAt: options.rooms.createdAt,
        questionsCount: count(options.questions.id),
      })
      .from(options.rooms)
      .leftJoin(
        options.questions,
        eq(options.questions.roomId, options.rooms.id)
      )
      .groupBy(options.rooms.id, options.rooms.name)
      .orderBy(options.rooms.createdAt);
    return results;
  });
};
