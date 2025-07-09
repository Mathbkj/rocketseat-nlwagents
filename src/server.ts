import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { getRooms } from "http/routes/get-rooms.ts";
import { PORT } from "./envLoader.ts";

const app = fastify();

app.register(fastifyCors, {
  origin: "http://localhost:8000",
});

app.register(getRooms);

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

async function run() {
  await app.listen({ port: PORT });
}
await run();
