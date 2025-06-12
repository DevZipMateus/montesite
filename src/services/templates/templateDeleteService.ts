
import { supabase } from "@/integrations/supabase/client";

export async function deleteTemplate(id: string) {
  console.log('deleteTemplate called with ID:', id);
  
  try {
    const { error } = await supabase
      .from('templates')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }
    
    console.log('Template deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting template:', error);
    throw error;
  }
}
