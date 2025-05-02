
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { TemplateFormValues } from '@/schemas/templateSchema';

export async function uploadTemplateImage(
  imageFile: File | null, 
  data: TemplateFormValues
): Promise<TemplateFormValues> {
  try {
    let imageUrl = data.image_url;
    
    // If we have a valid URL or no image, just return the data
    if (typeof imageUrl === 'string' && imageUrl !== "pending-upload") {
      console.log("Using existing image URL:", imageUrl);
      return { ...data, image_url: imageUrl };
    }
    
    // If we have a new image file, upload it to Supabase Storage
    if (imageFile) {
      console.log("Starting image upload process for file:", imageFile.name);
      
      // Use the existing 'template-images' bucket
      const bucketName = 'template-images';
      
      const timestamp = new Date().getTime();
      const fileName = `${timestamp}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filePath = fileName;
      
      console.log(`Uploading template image to bucket: ${bucketName}, path: ${filePath}`);
      
      // First check if the bucket exists, create it if not
      const { data: bucketExists } = await supabase.storage.getBucket(bucketName);
      
      if (!bucketExists) {
        console.log(`Bucket ${bucketName} doesn't exist, creating it...`);
        const { error: createBucketError } = await supabase.storage.createBucket(bucketName, {
          public: true
        });
        
        if (createBucketError) {
          console.error("Error creating bucket:", createBucketError);
          throw createBucketError;
        }
        console.log(`Bucket ${bucketName} created successfully`);
      }
      
      // Upload the file
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, imageFile, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (uploadError) {
        console.error("Error uploading template image:", uploadError);
        throw uploadError;
      }
      
      console.log("Image uploaded successfully:", uploadData);
      
      // Get the public URL for the uploaded image
      const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);
      
      if (!publicUrlData || !publicUrlData.publicUrl) {
        throw new Error("Failed to get public URL for image");
      }
      
      console.log("New template image public URL:", publicUrlData.publicUrl);
      imageUrl = publicUrlData.publicUrl;
    } else if (imageUrl === "pending-upload") {
      // If we don't have a file, but the value is "pending-upload", something went wrong
      console.error("No image file was provided but image_url is 'pending-upload'");
      throw new Error("No image was selected for upload.");
    }
    
    // Return the form data with the updated image URL
    const processedData = {
      ...data,
      image_url: imageUrl as string,
    };
    
    console.log("Form data after image upload processing:", processedData);
    
    return processedData;
  } catch (error) {
    console.error("Error uploading image:", error);
    toast({
      title: "Error uploading image",
      description: error instanceof Error ? error.message : "An error occurred while processing the image. Please try again.",
      variant: "destructive",
    });
    throw error;
  }
}
