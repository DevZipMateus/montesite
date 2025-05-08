
import { supabase } from "@/integrations/supabase/client";
import { Showcase } from "@/types/database";
import { toast } from "@/hooks/use-toast";

export async function fetchShowcases(categorySlug?: string, featuredOnly?: boolean, limit?: number): Promise<Showcase[]> {
  try {
    let query = supabase
      .from('showcases')
      .select(`
        *,
        categories(id, name, slug, icon, created_at, updated_at)
      `);
    
    if (categorySlug && categorySlug !== 'all') {
      query = query.eq('categories.slug', categorySlug);
    }
    
    if (featuredOnly) {
      query = query.eq('featured', true);
    }
    
    if (limit) {
      query = query.limit(limit);
    }
    
    query = query.order('client_name');
    
    const { data, error } = await query;
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching showcases:', error);
    toast({
      title: "Erro ao carregar vitrines",
      description: "Não foi possível carregar os sites da vitrine. Tente novamente mais tarde.",
      variant: "destructive",
    });
    return [];
  }
}

// Funções para gerenciamento de Vitrines
export async function createShowcase(showcase: Omit<Showcase, 'id' | 'created_at' | 'updated_at'>) {
  try {
    console.log("Creating showcase with data:", showcase);
    
    const { data, error } = await supabase
      .from('showcases')
      .insert([showcase])
      .select();
    
    if (error) {
      console.error("Error creating showcase:", error);
      throw error;
    }
    
    console.log("Showcase created successfully:", data);
    
    toast({
      title: "Site adicionado à vitrine",
      description: "O site foi adicionado à vitrine com sucesso.",
    });
    
    return data[0];
  } catch (error) {
    console.error('Error creating showcase:', error);
    toast({
      title: "Erro ao adicionar site",
      description: "Não foi possível adicionar o site à vitrine. Tente novamente mais tarde.",
      variant: "destructive",
    });
    throw error;
  }
}

export async function updateShowcase(id: string, showcase: Partial<Omit<Showcase, 'id' | 'created_at' | 'updated_at'>>) {
  try {
    console.log("Updating showcase with ID:", id);
    console.log("Update payload:", showcase);
    
    const { data, error } = await supabase
      .from('showcases')
      .update(showcase)
      .eq('id', id)
      .select();
    
    if (error) {
      console.error("Error updating showcase:", error);
      throw error;
    }
    
    console.log("Showcase updated successfully:", data);
    
    toast({
      title: "Vitrine atualizada",
      description: "O site da vitrine foi atualizado com sucesso.",
    });
    
    return data[0];
  } catch (error) {
    console.error('Error updating showcase:', error);
    toast({
      title: "Erro ao atualizar vitrine",
      description: "Não foi possível atualizar o site da vitrine. Tente novamente mais tarde.",
      variant: "destructive",
    });
    throw error;
  }
}

export async function deleteShowcase(id: string) {
  try {
    const { error } = await supabase
      .from('showcases')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error("Error deleting showcase:", error);
      throw error;
    }
    
    toast({
      title: "Site removido da vitrine",
      description: "O site foi removido da vitrine com sucesso.",
    });
    
    return true;
  } catch (error) {
    console.error('Error deleting showcase:', error);
    toast({
      title: "Erro ao remover site",
      description: "Não foi possível remover o site da vitrine. Tente novamente mais tarde.",
      variant: "destructive",
    });
    throw error;
  }
}

export async function fetchAdminShowcases(): Promise<Showcase[]> {
  try {
    const { data, error } = await supabase
      .from('showcases')
      .select(`
        *,
        categories(id, name, slug, icon, created_at, updated_at)
      `)
      .order('client_name');
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching all showcases:', error);
    toast({
      title: "Erro ao carregar vitrine",
      description: "Não foi possível carregar os sites da vitrine. Tente novamente mais tarde.",
      variant: "destructive",
    });
    return [];
  }
}
