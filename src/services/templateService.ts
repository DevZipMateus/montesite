import { supabase } from "@/integrations/supabase/client";
import { Category, Template } from "@/types/database";
import { CategoryFormValues } from "@/schemas/showcaseSchema";
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

export async function createCategory(category: CategoryFormValues): Promise<Category> {
  try {
    // Ensure required fields are present before insertion
    if (!category.name || !category.slug) {
      throw new Error("Nome e slug são obrigatórios");
    }
    
    const { data, error } = await supabase
      .from('categories')
      .insert({
        name: category.name,
        slug: category.slug,
        icon: category.icon
      })
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    toast({
      title: "Categoria criada",
      description: "A categoria foi criada com sucesso.",
    });
    
    return data;
  } catch (error) {
    console.error('Error creating category:', error);
    toast({
      title: "Erro ao criar categoria",
      description: "Não foi possível criar a categoria. Tente novamente mais tarde.",
      variant: "destructive",
    });
    throw error;
  }
}

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

// Função modificada para criar template
export async function createTemplate(template: Omit<Template, 'id' | 'created_at' | 'updated_at' | 'categories'>) {
  try {
    console.log("Creating template with data:", template);
    
    const { data, error } = await supabase
      .from('templates')
      .insert([template])
      .select();
    
    if (error) {
      console.error('Error response from Supabase:', error);
      throw error;
    }
    
    console.log("Template created successfully:", data);
    
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

// Função modificada para atualizar template
export async function updateTemplate(id: string, template: Partial<Template>) {
  try {
    console.log("Updating template with ID:", id);
    console.log("Update data:", template);
    
    // Remover campos que não podem ser enviados na atualização
    const { categories, created_at, updated_at, ...updateData } = template as any;
    
    const { data, error } = await supabase
      .from('templates')
      .update(updateData)
      .eq('id', id)
      .select();
    
    if (error) {
      console.error('Error response from Supabase:', error);
      throw error;
    }
    
    console.log("Template updated successfully:", data);
    
    if (!data || data.length === 0) {
      throw new Error("Nenhum dado retornado após a atualização");
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
