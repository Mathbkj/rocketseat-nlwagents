import { z } from "zod";

const envSchema = z.object({
<<<<<<< HEAD
  HOST: z.string().default("0.0.0.0"),
  PORT: z.coerce.number().default(3333),
  DB_URL: z.string().url().startsWith("postgres"),
  GOOGLE_GENAI_API_KEY: z.string(),
});
export const { HOST, PORT, DB_URL, GOOGLE_GENAI_API_KEY } = envSchema.parse(
=======
  PORT: z.coerce.number().default(3333),
  DB_URL: z
    .string()
    .url()
    .startsWith("postgresql://")
    .default("postgresql://docker:docker@localhost:5432/agents"),
  GOOGLE_GENAI_API_KEY: z.string(),
});
export const { PORT, DB_URL, GOOGLE_GENAI_API_KEY } = envSchema.parse(
>>>>>>> 5f1a0ac (Initial commit)
  process.env
);
