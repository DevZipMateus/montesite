import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { ShowcaseFormValues } from "@/schemas/showcaseSchema";

// Define the type for the RPC function parameters
type CreateBucketPolicyParams = {
  bucket_name: string;
};

export async function uploadShowcaseImage(imageFile: File | null, formData: ShowcaseFormValues): Promise<ShowcaseFormValues> {
  if (!imageFile) {
    // No image to upload, return unchanged form data
    return formData;
  }

  // Use the existing bucket for vitrine images
  const bucketName = "vitrine-imagens";

  try {
    console.log("Starting showcase image upload process");

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
