import { fastifyCors } from "@fastify/cors";
import { fastifyMultipart } from "@fastify/multipart";
import { fastify } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { PORT } from "./envLoader.ts";
import { getRooms } from "./http/routes/get-rooms.ts";
import { createRoom } from "./http/routes/create-room.ts";
import { getRoomQuestions } from "./http/routes/get-room-questions.ts";
import { createRoomQuestion } from "./http/routes/create-question.ts";
import { createRoomAudio } from "./http/routes/create-audio.ts";
import { getRoomAudios } from "./http/routes/get-audios.ts";

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
  console.log(`Server is running`);
}
await run();
