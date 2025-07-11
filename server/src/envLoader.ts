import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DB_URL: z
    .string()
    .url()
    .startsWith("postgresql://")
    .default("postgresql://docker:docker@localhost:5432/agents"),
  GOOGLE_GENAI_API_KEY: z.string(),
});
export const { PORT, DB_URL, GOOGLE_GENAI_API_KEY } = envSchema.parse(
  process.env
);
