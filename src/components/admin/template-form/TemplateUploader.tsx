
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { TemplateFormValues } from '@/schemas/templateSchema';

export async function uploadTemplateImage(
  imageFile: File | null, 
  data: TemplateFormValues
): Promise<TemplateFormValues> {
  try {
    let imageUrl = data.image_url;
    
    // If there's a new image file, upload it to Supabase Storage
    if (imageFile) {
      const timestamp = new Date().getTime();
      const fileName = `${timestamp}-${imageFile.name}`;
      const filePath = `templates/${fileName}`;
      
      console.log("Uploading template image to path:", filePath);
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, imageFile);
      
      if (uploadError) {
        console.error("Error uploading template image:", uploadError);
        throw uploadError;
      }
      
      // Get the public URL for the uploaded image
      const { data: publicUrlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
      
      console.log("New template image URL:", publicUrlData.publicUrl);
      imageUrl = publicUrlData.publicUrl;
    }
    
    // Return the form data with the updated image URL if an image was uploaded
    console.log("Form data after image upload processing:", {
      ...data, 
      image_url: imageUrl
    });
    
    return {
      ...data,
      image_url: imageUrl as string,
    };
  } catch (error) {
    toast({
      title: "Erro ao enviar imagem",
      description: "Ocorreu um erro ao processar a imagem. Tente novamente.",
      variant: "destructive",
    });
    console.error("Error uploading image:", error);
    throw error;
  }
}
