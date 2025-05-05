
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { TemplateFormValues } from "@/schemas/templateSchema";

// Define the type for the RPC function parameters
type CreateBucketPolicyParams = {
  bucket_name: string;
};

export async function uploadTemplateImage(imageFile: File | null, formData: TemplateFormValues): Promise<TemplateFormValues> {
  if (!imageFile && formData.image_url !== "pending-upload") {
    // No new image to upload, return unchanged form data
    return formData;
  }

  // Define bucket for templates
  const bucketName = "template-images";

  try {
    if (!imageFile) {
      throw new Error("No image file provided");
    }

    console.log("Starting template image upload process");

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
        const createBucketParams: CreateBucketPolicyParams = { bucket_name: bucketName };
        const { error: policyError } = await supabase.functions.invoke<{ success: boolean }>(
          'create_storage_policy',
          {
            method: 'POST',
            body: createBucketParams
          }
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

    console.log("Template image uploaded successfully:", publicUrlData.publicUrl);

    // Return updated form data with the new image URL
    return {
      ...formData,
      image_url: publicUrlData.publicUrl
    };
  } catch (error) {
    console.error("Error in uploadTemplateImage:", error);
    throw error;
  }
}
