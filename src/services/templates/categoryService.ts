
import { supabase } from "@/integrations/supabase/client";
import { Category } from "@/types/database";
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

export async function createCategory(category: CategoryFormValues): Promise<Category | null> {
  try {
    // Ensure required fields are present before insertion
    if (!category.name || !category.slug) {
      throw new Error("Nome e slug são obrigatórios");
    }
    
    // Log the category being created
    console.log("Creating category with data:", category);
    
    // Format data for insertion
    const insertData = {
      name: category.name,
      slug: category.slug,
      icon: category.icon || null
    };
    
    const { data, error } = await supabase
      .from('categories')
      .insert(insertData)
      .select()
      .single();
    
    if (error) {
      console.error("Supabase error during category creation:", error);
      throw error;
    }
    
    console.log("Category created successfully:", data);
    
    toast({
      title: "Categoria criada",
      description: "A categoria foi criada com sucesso.",
    });
    
    return data;
  } catch (error: any) {
    console.error('Error creating category:', error);
    
    let errorMessage = "Não foi possível criar a categoria. Tente novamente mais tarde.";
    
    // Check for specific errors
    if (error.code === '23505') {
      errorMessage = "Esta categoria já existe. Escolha outro nome ou slug.";
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    toast({
      title: "Erro ao criar categoria",
      description: errorMessage,
      variant: "destructive",
    });
    
    throw error;
  }
}

export async function updateCategory(id: string, category: CategoryFormValues): Promise<Category | null> {
  try {
    // Ensure required fields are present before update
    if (!category.name || !category.slug) {
      throw new Error("Nome e slug são obrigatórios");
    }
    
    console.log(`Updating category ${id} with data:`, category);
    
    const updateData = {
      name: category.name,
      slug: category.slug,
      icon: category.icon || null
    };
    
    const { data, error } = await supabase
      .from('categories')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    toast({
      title: "Categoria atualizada",
      description: "A categoria foi atualizada com sucesso.",
    });
    
    return data;
  } catch (error: any) {
    console.error('Error updating category:', error);
    
    let errorMessage = "Não foi possível atualizar a categoria. Tente novamente mais tarde.";
    
    if (error.code === '23505') {
      errorMessage = "Esta categoria já existe. Escolha outro nome ou slug.";
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    toast({
      title: "Erro ao atualizar categoria",
      description: errorMessage,
      variant: "destructive",
    });
    
    throw error;
  }
}

export async function deleteCategory(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    
    toast({
      title: "Categoria excluída",
      description: "A categoria foi excluída com sucesso.",
    });
    
    return true;
  } catch (error) {
    console.error('Error deleting category:', error);
    toast({
      title: "Erro ao excluir categoria",
      description: "Não foi possível excluir a categoria. Tente novamente mais tarde.",
      variant: "destructive",
    });
    
    throw error;
  }
}
