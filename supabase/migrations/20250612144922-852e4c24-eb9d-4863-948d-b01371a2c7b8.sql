
-- Habilitar RLS na tabela templates se ainda não estiver habilitado
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir SELECT público (visualização de templates)
CREATE POLICY "Allow public read access to active templates" 
ON public.templates 
FOR SELECT 
USING (status = 'active');

-- Criar política para permitir acesso total para operações administrativas
-- Como não há sistema de autenticação implementado, permitir todas as operações
CREATE POLICY "Allow all operations for admin" 
ON public.templates 
FOR ALL 
USING (true) 
WITH CHECK (true);
