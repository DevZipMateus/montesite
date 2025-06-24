import { supabase } from "@/integrations/supabase/client";
import { Showcase, Category } from "@/types/database";
import { toast } from "@/hooks/use-toast";

export async function fetchShowcases(categorySlug?: string, featuredOnly?: boolean, limit?: number): Promise<Showcase[]> {
  try {
    let query = supabase
      .from('showcases')
      .select(`
        *,
        categories(id, name, slug, icon, created_at, updated_at)
      `);
    
    // If filtering by category, first get the category ID
    if (categorySlug && categorySlug !== 'all') {
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', categorySlug)
        .single();
      
      if (categoryError) {
        console.error('Error fetching category:', categoryError);
        // If category not found, return empty array
        return [];
      }
      
      if (categoryData) {
        query = query.eq('category_id', categoryData.id);
      }
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

export async function fetchShowcaseCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from('showcases')
      .select(`
        categories!inner(
          id,
          name,
          slug,
          icon,
          created_at,
          updated_at
        )
      `)
      .not('category_id', 'is', null);
    
    if (error) {
      console.error("Error fetching showcase categories:", error);
      throw error;
    }
    
    // Extract unique categories from the data
    const uniqueCategories = new Map();
    data?.forEach(item => {
      const category = item.categories;
      if (category && !uniqueCategories.has(category.id)) {
        uniqueCategories.set(category.id, category);
      }
    });
    
    return Array.from(uniqueCategories.values()).sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error fetching showcase categories:', error);
    toast({
      title: "Erro ao carregar categorias de vitrine",
      description: "Não foi possível carregar as categorias. Tente novamente mais tarde.",
      variant: "destructive",
    });
    return [];
  }
}

export async function createShowcase(showcase: Omit<Showcase, 'id' | 'created_at' | 'updated_at'>) {
  try {
    console.log("Creating showcase with data:", showcase);
    
    // Ensure category_id is null if it's "null" string
    const processedShowcase = {
      ...showcase,
      category_id: showcase.category_id === "null" ? null : showcase.category_id
    };
    
    const { data, error } = await supabase
      .from('showcases')
      .insert([processedShowcase])
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
    
    // Ensure category_id is null if it's "null" string
    const processedShowcase = {
      ...showcase,
      category_id: showcase.category_id === "null" ? null : showcase.category_id
    };
    
    const { data, error } = await supabase
      .from('showcases')
      .update(processedShowcase)
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
