import { z } from "zod";

const envSchema = z.object({
  HOST: z.string().default("0.0.0.0"),
  PORT: z.coerce.number().default(3333),
  DB_URL: z.string().url().startsWith("postgres"),
  GOOGLE_GENAI_API_KEY: z.string(),
});
export const { HOST, PORT, DB_URL, GOOGLE_GENAI_API_KEY } = envSchema.parse(
  process.env
);
