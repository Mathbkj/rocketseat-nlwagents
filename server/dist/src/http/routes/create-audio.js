import { db } from "../../db/index.js";
import { generateEmbeddings, transcribeAudio } from "../../services/gemini.js";
import { z } from "zod/v4";
import { options } from "../../db/schemas/index.js";
export const createRoomAudio = (app) => {
    app.post("/salas/:roomId/audios", {
        schema: {
            params: z.object({
                roomId: z.string(),
            }),
        },
    }, async (request, reply) => {
        const { roomId } = request.params;
        const audio = await request.file();
        if (!audio) {
            throw new Error("Nenhum arquivo de áudio enviado");
        }
        const audioBuffer = await audio.toBuffer();
        const audioAsBase64 = audioBuffer.toString("base64");
        const transcription = await transcribeAudio(audioAsBase64, audio.mimetype);
        const embeddings = await generateEmbeddings(transcription);
        const result = await db
            .insert(options.audioChunks)
            .values({ transcription, embeddings, roomId })
            .returning();
        const chunk = result[0];
        if (!chunk) {
            throw new Error("Erro ao salvar o áudio transcrito no banco de dados");
        }
        return reply.status(201).send({
            message: "Áudio transcrito e salvo com sucesso",
        });
    });
};
