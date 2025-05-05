
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Define the expected request payload structure
interface CreateBucketPolicyRequest {
  bucket_name: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Auth context of the logged in user
    const supabaseClient = createClient(
      // Supabase API URL - env var exported by default
      Deno.env.get("SUPABASE_URL") ?? "",
      // Supabase API SERVICE ROLE KEY - env var exported by default
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Extract the bucket name from the request and ensure it's properly typed
    const requestData = await req.json() as CreateBucketPolicyRequest;
    const { bucket_name } = requestData;

    if (!bucket_name) {
      return new Response(
        JSON.stringify({ error: "Bucket name is required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Create RLS policy for the bucket to allow public access
    const { data, error } = await supabaseClient.rpc('create_bucket_policy', {
      bucket_name
    });

    if (error) {
      throw error;
    }

    return new Response(
      JSON.stringify({ success: true, message: `Policy created for bucket: ${bucket_name}` }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
