
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
      const fileName = `${timestamp}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      
      // Use the existing 'vitrine-imagens' bucket
      const bucketName = 'vitrine-imagens';
      
      console.log(`Uploading showcase image to bucket: ${bucketName}, path: ${fileName}`);
      
      // Check if the bucket exists
      const { data: bucketData, error: bucketError } = await supabase.storage.getBucket(bucketName);
      
      if (bucketError) {
        if (bucketError.message.includes("not found")) {
          console.log(`Bucket ${bucketName} doesn't exist, creating it...`);
          // Create the bucket if it doesn't exist
          const { error: createBucketError } = await supabase.storage.createBucket(bucketName, {
            public: true
          });
          
          if (createBucketError) {
            console.error("Error creating bucket:", createBucketError);
            throw createBucketError;
          }
          console.log(`Bucket ${bucketName} created successfully`);
        } else {
          console.error("Error checking bucket:", bucketError);
          throw bucketError;
        }
      } else {
        console.log(`Bucket ${bucketName} already exists`);
      }
      
      // Upload the file
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, imageFile, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (uploadError) {
        console.error("Error uploading showcase image:", uploadError);
        throw uploadError;
      }
      
      // Get the public URL for the uploaded image
      const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);
      
      if (!publicUrlData || !publicUrlData.publicUrl) {
        throw new Error("Failed to get public URL for image");
      }
      
      imageUrl = publicUrlData.publicUrl;
      console.log("New showcase image public URL:", imageUrl);
    } else if (!imageFile && !imageUrl) {
      throw new Error("Image file or URL is required");
    }
    
    // Update the form data with the new image URL if an image was uploaded
    return {
      ...data,
      image_url: imageUrl as string,
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    toast({
      title: "Erro no upload da imagem",
      description: error instanceof Error ? error.message : "Ocorreu um erro ao processar a imagem. Por favor, tente novamente.",
      variant: "destructive",
    });
    throw error;
  }
}
