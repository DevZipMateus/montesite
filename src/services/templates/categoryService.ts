
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
