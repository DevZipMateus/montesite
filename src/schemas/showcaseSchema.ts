
import * as z from "zod";

export const showcaseFormSchema = z.object({
  client_name: z.string().min(3, "O nome do cliente deve ter pelo menos 3 caracteres"),
  description: z.string().optional(),
  image_url: z.union([
    z.string().url("Informe uma URL válida para a imagem"),
    z.instanceof(File)
  ]),
  site_url: z.string().url("Informe uma URL válida para o site"),
  category_id: z.string().nullable(),
  featured: z.boolean().default(false)
});

export type ShowcaseFormValues = z.infer<typeof showcaseFormSchema>;

export const categoryFormSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  slug: z.string().min(2, "O slug deve ter pelo menos 2 caracteres")
    .regex(/^[a-z0-9-]+$/, "O slug deve conter apenas letras minúsculas, números e hífens"),
  icon: z.string().optional()
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
