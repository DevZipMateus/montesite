
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.42.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // First, seed the categories
    const categories = [
      {
        name: 'Contabilidade',
        slug: 'contabilidade',
        icon: 'lucide:Calculator'
      }
    ];

    // Insert categories
    const { data: categoriesData, error: categoriesError } = await supabaseClient
      .from('categories')
      .upsert(categories, { onConflict: 'slug' })
      .select();

    if (categoriesError) {
      throw categoriesError;
    }

    // Get the category IDs
    const categoryMap = categoriesData.reduce((acc, category) => {
      acc[category.slug] = category.id;
      return acc;
    }, {});

    // Seed the templates
    const templates = [
      {
        title: 'Modelo 1',
        description: 'Template completo que transforma contabilidade em um diferencial competitivo para sua empresa.',
        image_url: '/imagens/contabilidade-harmonica.png',
        form_url: 'https://forms.gle/ZfjYVLSiq6yCAbLG8',
        preview_url: 'https://contabilidade1.montesite.com.br',
        category_id: categoryMap['contabilidade'],
        status: 'active',
        order_index: 1
      },
      {
        title: 'Modelo 2',
        description: 'Design sofisticado para serviços contábeis personalizados para o sucesso do seu negócio.',
        image_url: '/imagens/contabilidade-template.png',
        form_url: 'https://forms.gle/2LTx1sApPFp24msV9',
        preview_url: 'https://contabilidade2.montesite.com.br',
        category_id: categoryMap['contabilidade'],
        status: 'active',
        order_index: 2
      },
      {
        title: 'Modelo 3',
        description: 'Layout profissional para soluções contábeis inteligentes para empresas de todos os portes.',
        image_url: '/imagens/easy-financial-solutions.png',
        form_url: 'https://forms.gle/FWVGcuiVP7zsiUUu9',
        preview_url: 'https://contabilidade3.montesite.com.br',
        category_id: categoryMap['contabilidade'],
        status: 'active',
        order_index: 3
      },
      {
        title: 'Modelo 4',
        description: 'Template com foco em simplicidade e precisão para escritórios contábeis.',
        image_url: '/imagens/conta-connection-hub.png',
        form_url: 'https://forms.gle/pa7nVYZPm2HWinoD7',
        preview_url: 'https://contabilidade4.montesite.com.br',
        category_id: categoryMap['contabilidade'],
        status: 'active',
        order_index: 4
      },
      {
        title: 'Modelo 5',
        description: 'Design para empresas de contabilidade digital com soluções simplificadas para negócios.',
        image_url: '/imagens/contador-simplicity.png',
        form_url: 'https://forms.gle/CkZAbnaLdGDG9D3QA',
        preview_url: 'https://contabilidade5.montesite.com.br',
        category_id: categoryMap['contabilidade'],
        status: 'active',
        order_index: 5
      },
      {
        title: 'Modelo 6',
        description: 'Template moderno para escritórios de contabilidade, com design clean e profissional.',
        image_url: '/imagens/contabilify-modern-site.png',
        form_url: 'https://forms.gle/kx8rWGWVXR4ZGCxY8',
        preview_url: 'https://contabilidade6.montesite.com.br',
        category_id: categoryMap['contabilidade'],
        status: 'active',
        order_index: 6
      }
    ];

    // Insert templates
    const { error: templatesError } = await supabaseClient
      .from('templates')
      .upsert(templates);

    if (templatesError) {
      throw templatesError;
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Data seeded successfully' }),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        },
        status: 400,
      }
    );
  }
});
