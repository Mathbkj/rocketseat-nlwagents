import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { PORT } from "./envLoader.ts";
import { getRooms } from "./http/routes/get-rooms.ts";

const app = fastify();

app.register(fastifyCors, {
  origin: "http://localhost:8000",
});

app.register(getRooms);

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

async function run() {
  await app.listen({ port: PORT });
  //biome-ignore lint/suspicious/noConsole: development debugging purpose
  console.log(`Server is running 🙋.\n PORT:${PORT}`);
}
await run();
