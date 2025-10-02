-- Add name column to template_iframe_configs table
ALTER TABLE template_iframe_configs 
ADD COLUMN IF NOT EXISTS name TEXT NOT NULL DEFAULT 'Iframe Config';

-- Make template_id nullable
ALTER TABLE template_iframe_configs 
ALTER COLUMN template_id DROP NOT NULL;