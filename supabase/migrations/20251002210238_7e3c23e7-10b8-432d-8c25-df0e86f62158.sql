-- Add is_global_active column to template_iframe_configs
ALTER TABLE template_iframe_configs 
ADD COLUMN IF NOT EXISTS is_global_active BOOLEAN NOT NULL DEFAULT false;

-- Create function to ensure only one iframe can be globally active
CREATE OR REPLACE FUNCTION ensure_single_global_active_iframe()
RETURNS TRIGGER AS $$
BEGIN
  -- If setting this iframe as globally active, deactivate all others
  IF NEW.is_global_active = true THEN
    UPDATE template_iframe_configs 
    SET is_global_active = false 
    WHERE id != NEW.id AND is_global_active = true;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to enforce single global active iframe
DROP TRIGGER IF EXISTS ensure_single_global_active_iframe_trigger ON template_iframe_configs;
CREATE TRIGGER ensure_single_global_active_iframe_trigger
  BEFORE INSERT OR UPDATE ON template_iframe_configs
  FOR EACH ROW
  EXECUTE FUNCTION ensure_single_global_active_iframe();

-- Create index for faster lookups of global active iframe
CREATE INDEX IF NOT EXISTS idx_template_iframe_configs_global_active 
ON template_iframe_configs(is_global_active) 
WHERE is_global_active = true;