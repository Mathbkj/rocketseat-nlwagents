import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DB_URL: z
    .string()
    .url()
    .startsWith("postgresql://")
    .default("postgresql://docker:docker@localhost:5432/agents"),
});
export const { PORT, DB_URL } = envSchema.parse(process.env);
