import { fastifyCors } from "@fastify/cors";
import { fastifyMultipart } from "@fastify/multipart";
import { fastify } from "fastify";
import { serializerCompiler, validatorCompiler, } from "fastify-type-provider-zod";
import { PORT } from "./envLoader.js";
import { getRooms } from "./http/routes/get-rooms.js";
import { createRoom } from "./http/routes/create-room.js";
import { getRoomQuestions } from "./http/routes/get-room-questions.js";
import { createRoomQuestion } from "./http/routes/create-question.js";
import { createRoomAudio } from "./http/routes/create-audio.js";
import { getRoomAudios } from "./http/routes/get-audios.js";
const app = fastify();
app.register(fastifyCors, {
    origin: "http://localhost:5173",
});
app.register(fastifyMultipart);
app.register(getRooms);
app.register(getRoomQuestions);
app.register(getRoomAudios);
app.register(createRoom);
app.register(createRoomQuestion);
app.register(createRoomAudio);
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);
async function run() {
    await app.listen({ port: PORT });
}
await run();
