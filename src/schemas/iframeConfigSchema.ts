import { z } from 'zod';

export const iframeConfigSchema = z.object({
  template_id: z.string().uuid('ID do template inválido'),
  iframe_code: z.string().min(10, 'Código do iframe deve ter pelo menos 10 caracteres'),
  is_active: z.boolean().default(true),
});

export type IframeConfigFormData = z.infer<typeof iframeConfigSchema>;
