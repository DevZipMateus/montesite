
import { supabase } from "@/integrations/supabase/client";
import { Template } from "@/types/database";
import { toast } from "@/hooks/use-toast";

export async function fetchTemplates(categorySlug?: string): Promise<Template[]> {
  try {
    let query = supabase
      .from('templates')
      .select(`
        *,
        categories(id, name, slug, icon, created_at, updated_at)
      `)
      .eq('status', 'active')
      .order('order_index');
    
    if (categorySlug && categorySlug !== 'all') {
      query = query.eq('categories.slug', categorySlug);
    }
    
    const { data, error } = await query;
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching templates:', error);
    toast({
      title: "Erro ao carregar templates",
      description: "Não foi possível carregar os templates. Tente novamente mais tarde.",
      variant: "destructive",
    });
    return [];
  }
}

export async function fetchAdminTemplates(): Promise<Template[]> {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select(`
        *,
        categories(id, name, slug, icon, created_at, updated_at)
      `)
      .order('order_index');
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching all templates:', error);
    toast({
      title: "Erro ao carregar templates",
      description: "Não foi possível carregar os templates. Tente novamente mais tarde.",
      variant: "destructive",
    });
    return [];
  }
}
