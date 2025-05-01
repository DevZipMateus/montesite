
import { supabase } from "@/integrations/supabase/client";
import { Category, Template } from "@/types/database";
import { toast } from "@/hooks/use-toast";

export async function fetchCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    toast({
      title: "Erro ao carregar categorias",
      description: "Não foi possível carregar as categorias. Tente novamente mais tarde.",
      variant: "destructive",
    });
    return [];
  }
}

export async function fetchTemplates(categorySlug?: string): Promise<Template[]> {
  try {
    let query = supabase
      .from('templates')
      .select(`
        *,
        categories(id, name, slug)
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

// New functions for template management
export async function createTemplate(template: Omit<Template, 'id' | 'created_at' | 'updated_at' | 'categories'>) {
  try {
    const { data, error } = await supabase
      .from('templates')
      .insert([template])
      .select();
    
    if (error) {
      throw error;
    }
    
    toast({
      title: "Template criado",
      description: "O template foi criado com sucesso.",
    });
    
    return data[0];
  } catch (error) {
    console.error('Error creating template:', error);
    toast({
      title: "Erro ao criar template",
      description: "Não foi possível criar o template. Tente novamente mais tarde.",
      variant: "destructive",
    });
    throw error;
  }
}

export async function updateTemplate(id: string, template: Partial<Omit<Template, 'id' | 'created_at' | 'updated_at' | 'categories'>>) {
  try {
    const { data, error } = await supabase
      .from('templates')
      .update(template)
      .eq('id', id)
      .select();
    
    if (error) {
      throw error;
    }
    
    toast({
      title: "Template atualizado",
      description: "O template foi atualizado com sucesso.",
    });
    
    return data[0];
  } catch (error) {
    console.error('Error updating template:', error);
    toast({
      title: "Erro ao atualizar template",
      description: "Não foi possível atualizar o template. Tente novamente mais tarde.",
      variant: "destructive",
    });
    throw error;
  }
}

export async function deleteTemplate(id: string) {
  try {
    const { error } = await supabase
      .from('templates')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    
    toast({
      title: "Template removido",
      description: "O template foi removido com sucesso.",
    });
    
    return true;
  } catch (error) {
    console.error('Error deleting template:', error);
    toast({
      title: "Erro ao remover template",
      description: "Não foi possível remover o template. Tente novamente mais tarde.",
      variant: "destructive",
    });
    throw error;
  }
}

export async function fetchAdminTemplates(): Promise<Template[]> {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select(`
        *,
        categories(id, name, slug)
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
