
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

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
