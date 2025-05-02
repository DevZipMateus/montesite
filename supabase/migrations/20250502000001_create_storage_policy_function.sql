
-- Create a function to add storage policies for a bucket
CREATE OR REPLACE FUNCTION public.create_bucket_policy(bucket_name TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Create policy to allow all operations on the specified bucket
  EXECUTE format('
    CREATE POLICY IF NOT EXISTS "Allow full access for %1$s" 
    ON storage.objects 
    FOR ALL 
    USING (bucket_id = %2$L)
    WITH CHECK (bucket_id = %2$L)
  ', bucket_name, bucket_name);
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RAISE NOTICE 'Error creating policy: %', SQLERRM;
    RETURN FALSE;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.create_bucket_policy(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.create_bucket_policy(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.create_bucket_policy(TEXT) TO service_role;
