
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { TemplateFormValues } from '@/schemas/templateSchema';

export async function uploadTemplateImage(
  imageFile: File | null, 
  data: TemplateFormValues
): Promise<TemplateFormValues> {
  try {
    let imageUrl = data.image_url;
    
    // Se já temos uma URL de imagem e não há novo arquivo, mantemos a URL existente
    if (!imageFile && typeof imageUrl === 'string') {
      console.log("No new image file, keeping existing URL:", imageUrl);
      return { ...data, image_url: imageUrl };
    }
    
    // Se temos um novo arquivo de imagem, fazemos o upload para o Supabase Storage
    if (imageFile) {
      // Verificar se o bucket 'images' existe, caso contrário tentar criar
      const { data: buckets } = await supabase.storage.listBuckets();
      const imagesBucketExists = buckets?.some(bucket => bucket.name === 'images');
      
      if (!imagesBucketExists) {
        console.log("Images bucket doesn't exist, attempting to create it");
        const { data: newBucket, error: bucketError } = await supabase.storage.createBucket('images', {
          public: true
        });
        
        if (bucketError) {
          console.error("Error creating images bucket:", bucketError);
          throw new Error("Não foi possível criar o bucket para armazenar imagens.");
        }
      }
      
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
      
      // Obter a URL pública para a imagem enviada
      const { data: publicUrlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
      
      console.log("New template image URL:", publicUrlData.publicUrl);
      imageUrl = publicUrlData.publicUrl;
    }
    
    // Retornar os dados do formulário com a URL da imagem atualizada se uma imagem foi enviada
    const processedData = {
      ...data,
      image_url: imageUrl as string,
    };
    
    console.log("Form data after image upload processing:", processedData);
    
    return processedData;
  } catch (error) {
    console.error("Error uploading image:", error);
    toast({
      title: "Erro ao enviar imagem",
      description: "Ocorreu um erro ao processar a imagem. Tente novamente.",
      variant: "destructive",
    });
    throw error;
  }
}
