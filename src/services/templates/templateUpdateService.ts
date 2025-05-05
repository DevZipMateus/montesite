
import { supabase } from "@/integrations/supabase/client";
import { Template } from "@/types/database";
import { toast } from "@/hooks/use-toast";

// Function for updating template
export async function updateTemplate(id: string, template: Partial<Template>) {
  try {
    console.log("Updating template with ID:", id);
    console.log("Update data:", template);
    
    // Validate data
    if (template.title === "" || template.description === "" || template.image_url === "" 
        || template.form_url === "" || template.preview_url === "") {
      throw new Error("Os campos fornecidos não podem estar vazios");
    }
    
    // Remove fields that should not be sent in the update
    const { categories, created_at, updated_at, ...updateData } = template as any;
    
    // Force update of form_url with explicit check and debug info
    if (template.form_url) {
      console.log(`Setting form_url to: ${template.form_url}`);
      updateData.form_url = template.form_url;
    }
    
    // Add a timestamp to force update
    updateData.updated_at = new Date().toISOString();
    
    console.log("Final update payload:", updateData);
    
    // Execute the update operation with proper returning and debugging
    const { data, error, status } = await supabase
      .from('templates')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    console.log("Update response status:", status);
    
    if (error) {
      console.error('Error response from Supabase:', error);
      throw error;
    }
    
    // Enhanced verification if the update was successful
    if (!data) {
      console.error('Update may have failed: No data returned');
      
      // Double check if the update actually happened
      const { data: verifyData, error: verifyError } = await supabase
        .from('templates')
        .select('*')
        .eq('id', id)
        .single();
        
      if (verifyError) {
        console.error('Failed to verify update status:', verifyError);
        throw new Error('Não foi possível verificar se o template foi atualizado');
      }
      
      if (!verifyData) {
        console.error('Template not found after update attempt');
        throw new Error('Template não encontrado após tentativa de atualização');
      }
      
      // Check if form_url was updated correctly (important field that was failing)
      if (template.form_url && verifyData.form_url !== template.form_url) {
        console.error('Update validation failed: form_url not updated correctly');
        console.error(`Expected: ${template.form_url}, Got: ${verifyData.form_url}`);
        throw new Error('A URL do formulário não foi atualizada corretamente');
      }
      
      console.log("Template exists but no data returned from update. Verify data:", verifyData);
      
      // Return the verified data as our result
      toast({
        title: "Template atualizado",
        description: "O template foi atualizado com sucesso (verificado).",
      });
      
      return verifyData;
    }
    
    console.log("Template updated successfully. Returned data:", data);
    
    toast({
      title: "Template atualizado",
      description: "O template foi atualizado com sucesso.",
    });
    
    // Return the data we got from the update
    return data;
    
  } catch (error) {
    console.error('Error updating template:', error);
    toast({
      title: "Erro ao atualizar template",
      description: error instanceof Error 
        ? error.message 
        : "Não foi possível atualizar o template. Tente novamente mais tarde.",
      variant: "destructive",
    });
    throw error;
  }
}
