
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { ShowcaseFormValues } from "@/schemas/showcaseSchema";

export async function uploadShowcaseImage(imageFile: File | null, formData: ShowcaseFormValues): Promise<ShowcaseFormValues> {
  if (!imageFile) {
    // No image to upload, return unchanged form data
    return formData;
  }

  // Define bucket for showcases
  const bucketName = "showcase-images";

  try {
    console.log("Starting showcase image upload process");

    // Check if bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);

    if (!bucketExists) {
      console.log(`Bucket ${bucketName} doesn't exist, creating it...`);
      
      // Create the bucket if it doesn't exist
      const { error: createError } = await supabase.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 5 * 1024 * 1024 // 5MB limit
      });
      
      if (createError) {
        console.error("Error creating bucket:", createError);
        throw new Error(`Failed to create storage bucket: ${createError.message}`);
      } else {
        console.log(`Bucket ${bucketName} created successfully`);
        
        // Now create RLS policy to allow public access to the bucket
        // Use a properly typed parameter object for the RPC call
        const { error: policyError } = await supabase.rpc(
          'create_bucket_policy',
          { bucket_name: bucketName }
        );
        
        if (policyError) {
          console.error("Error creating bucket policy:", policyError);
          throw new Error(`Failed to create bucket policy: ${policyError.message}`);
        }
      }
    }

    // Generate unique filename
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${fileName}`;

    console.log(`Uploading file to ${bucketName}/${filePath}`);

    // Upload the file
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
      throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    // Get public URL for the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    if (!publicUrlData || !publicUrlData.publicUrl) {
      throw new Error("Failed to get public URL for uploaded image");
    }

    console.log("Showcase image uploaded successfully:", publicUrlData.publicUrl);

    // Return updated form data with the new image URL
    return {
      ...formData,
      image_url: publicUrlData.publicUrl
    };
  } catch (error) {
    console.error("Error in uploadShowcaseImage:", error);
    throw error;
  }
}
