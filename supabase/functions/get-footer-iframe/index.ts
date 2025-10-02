import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Cache-Control': 'public, max-age=300', // Cache por 5 minutos
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Fetching global active iframe config...');

    // Buscar o iframe configurado como globalmente ativo
    const { data: iframeConfig, error } = await supabase
      .from('template_iframe_configs')
      .select('iframe_code, name, updated_at')
      .eq('is_global_active', true)
      .eq('is_active', true)
      .maybeSingle();

    if (error) {
      console.error('Error fetching iframe config:', error);
      throw error;
    }

    if (!iframeConfig) {
      console.log('No global active iframe found');
      return new Response(
        `console.log('MonteSite Footer: Nenhum iframe globalmente ativo configurado');`,
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/javascript' },
          status: 200
        }
      );
    }

    console.log('Found iframe config:', iframeConfig.name);

    // Criar o JavaScript que injeta o HTML no DOM
    const loaderScript = `
(function() {
  try {
    var container = document.getElementById('montesite-footer-badge');
    if (!container) {
      console.warn('MonteSite Footer: Container #montesite-footer-badge não encontrado');
      return;
    }
    
    var iframeHtml = ${JSON.stringify(iframeConfig.iframe_code)};
    container.innerHTML = iframeHtml;
    console.log('MonteSite Footer: Rodapé carregado com sucesso (${iframeConfig.name})');
  } catch (error) {
    console.error('MonteSite Footer: Erro ao carregar rodapé', error);
  }
})();
`;

    return new Response(loaderScript, {
      headers: { ...corsHeaders, 'Content-Type': 'application/javascript' },
      status: 200,
    });

  } catch (error) {
    console.error('Error in get-footer-iframe function:', error);
    return new Response(
      `console.error('MonteSite Footer: Erro no servidor', ${JSON.stringify(error.message)});`,
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/javascript' },
      }
    );
  }
});
