
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FormData {
  modelo?: string;
  observacoes?: string;
  email?: string;
  hash?: string;
  client_name?: string;
  telefone?: string;
  cnpj?: string;
  email_complementar?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const formData: FormData = await req.json();
    console.log('Received form data:', formData);

    // Validate required fields
    if (!formData.hash) {
      return new Response(
        JSON.stringify({ error: 'Hash is required' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    // Check if project with this hash exists
    const { data: existingProject, error: findError } = await supabase
      .from('projects')
      .select('*')
      .eq('partner_hash', formData.hash)
      .single();

    if (findError && findError.code !== 'PGRST116') {
      console.error('Error finding project:', findError);
      return new Response(
        JSON.stringify({ error: 'Database error' }),
        { 
          status: 500, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    let projectData = {
      client_name: formData.client_name || 'Cliente via MonteSite',
      modelo_escolhido: formData.modelo,
      observacoes_cliente: formData.observacoes,
      email_complementar: formData.email,
      telefone: formData.telefone,
      cnpj: formData.cnpj,
      partner_hash: formData.hash,
      project_source: 'montesite',
      formulario_preenchido: true,
      data_formulario: new Date().toISOString(),
      status: 'Em andamento'
    };

    let result;
    if (existingProject) {
      // Update existing project
      const { data, error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', existingProject.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating project:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to update project' }),
          { 
            status: 500, 
            headers: { 'Content-Type': 'application/json', ...corsHeaders } 
          }
        );
      }
      result = data;
      console.log('Project updated:', result);
    } else {
      // Create new project
      const { data, error } = await supabase
        .from('projects')
        .insert(projectData)
        .select()
        .single();

      if (error) {
        console.error('Error creating project:', error);
        return new Response(
          JSON.stringify({ error: 'Failed to create project' }),
          { 
            status: 500, 
            headers: { 'Content-Type': 'application/json', ...corsHeaders } 
          }
        );
      }
      result = data;
      console.log('Project created:', result);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Form data received successfully',
        project_id: result.id,
        hash: formData.hash
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );

  } catch (error) {
    console.error('Error in receive-form-data function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);
