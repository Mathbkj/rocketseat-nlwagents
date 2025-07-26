import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../db/index.ts";
import { options } from "../../db/schemas/index.ts";
import { count, eq, ilike, sql } from "drizzle-orm";
import { z } from "zod/v4";

export const getRooms: FastifyPluginCallbackZod = (app) => {
  app.get(
    "/salas",
    {
      schema: {
        querystring: z.object({
          name: z.string().optional(),
        }),
      },
    },
    async ({ query }) => {
      const { name } = query;
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
        .orderBy(options.rooms.createdAt)
        .where(ilike(options.rooms.name, `%${name ?? ""}%`));

      return results;
    }
  );
};
