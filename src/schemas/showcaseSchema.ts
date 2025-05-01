
import * as z from "zod";

export const showcaseFormSchema = z.object({
  client_name: z.string().min(3, "O nome do cliente deve ter pelo menos 3 caracteres"),
  description: z.string().optional(),
  image_url: z.string().url("Informe uma URL válida para a imagem"),
  site_url: z.string().url("Informe uma URL válida para o site"),
  category_id: z.string().nullable(),
  featured: z.boolean().default(false)
});

export type ShowcaseFormValues = z.infer<typeof showcaseFormSchema>;
