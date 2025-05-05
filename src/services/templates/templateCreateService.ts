
import { supabase } from "@/integrations/supabase/client";
import { Template } from "@/types/database";
import { toast } from "@/hooks/use-toast";

// Function for creating template
export async function createTemplate(template: Omit<Template, 'id' | 'created_at' | 'updated_at' | 'categories'>) {
  try {
    console.log("Creating template with data:", template);
    
    // Validate required fields
    if (!template.title || !template.description || !template.image_url || !template.form_url || !template.preview_url) {
      throw new Error("Todos os campos obrigatórios devem ser preenchidos");
    }
    
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
