import z from "zod/v4";

export const createFormSchema = z.object({
  name: z.string().min(1, "Inclua no mínimo 3 caracteres"),
  description: z.string().optional(),
});

export type DataForm = z.infer<typeof createFormSchema>;