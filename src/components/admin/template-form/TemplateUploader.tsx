
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { TemplateFormValues } from '@/schemas/templateSchema';

export async function uploadTemplateImage(
  imageFile: File | null, 
  data: TemplateFormValues
): Promise<TemplateFormValues> {
  try {
    let imageUrl = data.image_url;
    
    // If there's no new image file and we have a valid URL that's not "pending-upload",
    // just return the data with the existing image URL
    if (!imageFile && typeof imageUrl === 'string' && imageUrl !== "pending-upload") {
      console.log("Using existing image URL:", imageUrl);
      return { ...data, image_url: imageUrl };
    }
    
    // If there's a new image file, upload it to Supabase Storage
    if (imageFile) {
      console.log("Starting image upload process for file:", imageFile.name);
      
      // Use the existing 'template-images' bucket
      const bucketName = 'template-images';
      
      const timestamp = new Date().getTime();
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${timestamp}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      
      console.log(`Uploading template image to bucket: ${bucketName}, path: ${fileName}`);
      
      try {
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
            
            // Now create RLS policy to allow public access to the bucket
            // Fix: Pass bucket_name as an object parameter instead of a string
            // Converting the type to 'any' to bypass the type checking error
            const { error: policyError } = await supabase.rpc('create_bucket_policy', {
              bucket_name: bucketName
            } as any);
            
            if (policyError) {
              console.error("Error creating bucket policy:", policyError);
              // Continue anyway, as the upload might still work
            }
          } else {
            console.error("Error checking bucket:", bucketError);
            throw bucketError;
          }
        } else {
          console.log(`Bucket ${bucketName} already exists`);
        }
      } catch (error) {
        console.error("Error with bucket operations:", error);
        // Continue with upload attempt even if bucket check fails
      }
      
      // Upload the file with multiple retries
      let uploadAttempt = 0;
      const maxAttempts = 3;
      let uploadData;
      let uploadError;
      
      while (uploadAttempt < maxAttempts) {
        try {
          uploadAttempt++;
          console.log(`Upload attempt ${uploadAttempt} of ${maxAttempts}`);
          
          const result = await supabase.storage
            .from(bucketName)
            .upload(fileName, imageFile, {
              cacheControl: '3600',
              upsert: true
            });
            
          uploadData = result.data;
          uploadError = result.error;
          
          if (!uploadError) {
            break; // Success! Exit the retry loop
          } else {
            console.error(`Upload attempt ${uploadAttempt} failed:`, uploadError);
            if (uploadAttempt < maxAttempts) {
              // Wait a bit before retrying (exponential backoff)
              await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, uploadAttempt - 1)));
            }
          }
        } catch (error) {
          console.error(`Unexpected error in upload attempt ${uploadAttempt}:`, error);
          uploadError = error;
        }
      }
      
      if (uploadError) {
        console.error("All upload attempts failed:", uploadError);
        throw uploadError;
      }
      
      console.log("Image uploaded successfully:", uploadData);
      
      // Get the public URL for the uploaded image
      const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);
      
      if (!publicUrlData || !publicUrlData.publicUrl) {
        throw new Error("Failed to get public URL for image");
      }
      
      console.log("New template image public URL:", publicUrlData.publicUrl);
      imageUrl = publicUrlData.publicUrl;
    } else if (data.image_url === "pending-upload") {
      // This means the user selected an image but then removed it
      throw new Error("A imagem foi selecionada mas não foi fornecida. Por favor, selecione uma imagem ou forneça uma URL.");
    }
    
    // Return the form data with the updated image URL
    const updatedData = {
      ...data,
      image_url: imageUrl as string,
    };
    
    console.log("Form data after image upload processing:", updatedData);
    
    return updatedData;
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
