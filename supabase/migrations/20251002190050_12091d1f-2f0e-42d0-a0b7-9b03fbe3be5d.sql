-- Create table for template iframe configurations
CREATE TABLE IF NOT EXISTS public.template_iframe_configs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  template_id UUID NOT NULL REFERENCES public.templates(id) ON DELETE CASCADE,
  iframe_code TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.template_iframe_configs ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (active configs only)
CREATE POLICY "Public can view active iframe configs"
ON public.template_iframe_configs
FOR SELECT
USING (is_active = true);

-- Create policies for authenticated users (full access)
CREATE POLICY "Authenticated users can manage iframe configs"
ON public.template_iframe_configs
FOR ALL
USING (true)
WITH CHECK (true);

-- Create index for performance
CREATE INDEX idx_template_iframe_configs_template_id ON public.template_iframe_configs(template_id);
CREATE INDEX idx_template_iframe_configs_active ON public.template_iframe_configs(is_active);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_template_iframe_configs_updated_at
BEFORE UPDATE ON public.template_iframe_configs
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();