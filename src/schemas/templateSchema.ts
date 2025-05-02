
import * as z from "zod";

export const templateFormSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  image_url: z.union([
    z.string().url("Informe uma URL válida para a imagem"),
    z.instanceof(File)
  ]),
  form_url: z.string().url("Informe uma URL válida para o formulário"),
  preview_url: z.string().url("Informe uma URL válida para a visualização"),
  category_id: z.string().nullable(),
  status: z.enum(["active", "inactive", "archived"]),
  order_index: z.coerce.number().int().nonnegative()
});

export type TemplateFormValues = z.infer<typeof templateFormSchema>;
