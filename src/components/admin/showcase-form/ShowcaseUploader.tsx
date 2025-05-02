
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
      
      // Use the existing 'vitrine-imagens' bucket
      const bucketName = 'vitrine-imagens';
      
      console.log(`Uploading showcase image to bucket: ${bucketName}, path: ${fileName}`);
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, imageFile);
      
      if (uploadError) {
        console.error("Error uploading showcase image:", uploadError);
        throw uploadError;
      }
      
      // Get the public URL for the uploaded image
      const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);
      
      if (!publicUrlData || !publicUrlData.publicUrl) {
        throw new Error("Falha ao obter URL pública da imagem");
      }
      
      imageUrl = publicUrlData.publicUrl;
      console.log("New showcase image public URL:", imageUrl);
    }
    
    // Update the form data with the new image URL if an image was uploaded
    return {
      ...data,
      image_url: imageUrl as string,
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    toast({
      title: "Erro ao enviar imagem",
      description: error instanceof Error ? error.message : "Ocorreu um erro ao processar a imagem. Tente novamente.",
      variant: "destructive",
    });
    throw error;
  }
}
