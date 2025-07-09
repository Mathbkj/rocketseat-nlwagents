import { db } from "db/index.ts";
import { options } from "db/schemas/index.ts";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";

export const getRooms: FastifyPluginCallbackZod = (app) => {
  app.get("/rooms", async () => {
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
