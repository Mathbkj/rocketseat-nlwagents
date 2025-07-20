import { db } from "../../db/index.js";
import { options } from "../../db/schemas/index.js";
import { count, eq, ilike } from "drizzle-orm";
import { z } from "zod/v4";
export const getRooms = (app) => {
    app.get("/salas", {
        schema: {
            querystring: z.object({
                name: z.string().optional(),
            }),
        },
    }, async ({ query }) => {
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
            .leftJoin(options.questions, eq(options.questions.roomId, options.rooms.id))
            .groupBy(options.rooms.id, options.rooms.name)
            .orderBy(options.rooms.createdAt)
            .where(ilike(options.rooms.name, `%${name ?? ""}%`));
        return results;
    });
};
