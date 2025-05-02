
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { TemplateFormValues } from '@/schemas/templateSchema';

export async function uploadTemplateImage(
  imageFile: File | null, 
  data: TemplateFormValues
): Promise<TemplateFormValues> {
  try {
    let imageUrl = data.image_url;
    
    // Se temos uma URL válida ou não temos imagem, apenas retornamos os dados
    if (typeof imageUrl === 'string' && imageUrl !== "pending-upload") {
      console.log("Using existing image URL:", imageUrl);
      return { ...data, image_url: imageUrl };
    }
    
    // Se temos um novo arquivo de imagem, fazemos o upload para o Supabase Storage
    if (imageFile) {
      console.log("Starting image upload process for file:", imageFile.name);
      
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
        console.log("Images bucket created successfully");
      }
      
      const timestamp = new Date().getTime();
      const fileName = `${timestamp}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filePath = `templates/${fileName}`;
      
      console.log("Uploading template image to path:", filePath);
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, imageFile);
      
      if (uploadError) {
        console.error("Error uploading template image:", uploadError);
        throw uploadError;
      }
      
      console.log("Image uploaded successfully:", uploadData);
      
      // Obter a URL pública para a imagem enviada
      const { data: publicUrlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
      
      if (!publicUrlData || !publicUrlData.publicUrl) {
        throw new Error("Falha ao obter URL pública da imagem");
      }
      
      console.log("New template image public URL:", publicUrlData.publicUrl);
      imageUrl = publicUrlData.publicUrl;
    } else if (imageUrl === "pending-upload") {
      // Se não temos um arquivo, mas o valor é "pending-upload", algo deu errado
      console.error("No image file was provided but image_url is 'pending-upload'");
      throw new Error("Nenhuma imagem foi selecionada para upload.");
    }
    
    // Retornar os dados do formulário com a URL da imagem atualizada
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
      description: error instanceof Error ? error.message : "Ocorreu um erro ao processar a imagem. Tente novamente.",
      variant: "destructive",
    });
    throw error;
  }
}
