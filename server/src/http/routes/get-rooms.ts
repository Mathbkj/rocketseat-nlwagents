import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { db } from "../../db/index.ts";
import { options } from "../../db/schemas/index.ts";

export const getRooms: FastifyPluginCallbackZod = (app) => {
  app.get("/salas", async () => {
    const results = await db
      .select({
        id: options.rooms.id,
        name: options.rooms.name,
        description: options.rooms.description,
      })
      .from(options.rooms)
      .orderBy(options.rooms.createdAt);
    return results;
  });
};
