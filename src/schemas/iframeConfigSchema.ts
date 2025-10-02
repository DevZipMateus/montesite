import { z } from 'zod';

export const iframeConfigSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  iframe_code: z.string().min(10, 'Código do iframe deve ter pelo menos 10 caracteres'),
  is_active: z.boolean().default(true),
});

export type IframeConfigFormData = z.infer<typeof iframeConfigSchema>;
