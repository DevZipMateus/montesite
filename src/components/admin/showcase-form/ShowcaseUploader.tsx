
import React from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { ShowcaseFormValues } from '@/schemas/showcaseSchema';

export async function uploadShowcaseImage(
  imageFile: File | null, 
  data: ShowcaseFormValues
): Promise<ShowcaseFormValues> {
  try {
    let imageUrl = data.image_url;
    
    // If there's a new image file, upload it to Supabase Storage
    if (imageFile) {
      const timestamp = new Date().getTime();
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${timestamp}-${imageFile.name}`;
      const filePath = `showcases/${fileName}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, imageFile);
      
      if (uploadError) {
        throw uploadError;
      }
      
      // Get the public URL for the uploaded image
      const { data: publicUrlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
      
      imageUrl = publicUrlData.publicUrl;
    }
    
    // Update the form data with the new image URL if an image was uploaded
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
