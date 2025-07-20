import { db } from "../../db/index.js";
import { options } from "../../db/schemas/index.js";
import { z } from "zod/v4";
export const createRoom = (app) => {
    app.post("/salas", {
        schema: {
            body: z.object({
                name: z.string().min(1),
                description: z.string().optional(),
            }),
        },
    }, async ({ body }, response) => {
        const { name, description } = body;
        const result = await db
            .insert(options.rooms)
            .values({
            name,
            description: description ?? null,
        })
            .returning();
        if (!result[0])
            throw new Error("Falha ao criar nova sala");
        return response.status(201).send({ id: result[0].id });
    });
};
