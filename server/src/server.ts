import { fastifyCors } from "@fastify/cors";
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

const app = fastify();

app.register(fastifyCors, {
  origin: "http://localhost:5173",
});

app.register(getRooms);
app.register(createRoom);
app.register(getRoomQuestions);
app.register(createRoomQuestion);
app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

async function run() {
  await app.listen({ port: PORT });
  //biome-ignore lint/suspicious/noConsole: development debugging purpose
  console.log(
    `Server is running at 🙋."\n Open in browser at http://localhost:3333"`
  );
}
await run();
