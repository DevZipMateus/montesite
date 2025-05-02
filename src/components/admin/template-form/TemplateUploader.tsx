
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
      
      // Usar o bucket existente 'template-images' em vez de tentar criar um novo
      const bucketName = 'template-images';
      
      const timestamp = new Date().getTime();
      const fileName = `${timestamp}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const filePath = `${fileName}`;
      
      console.log(`Uploading template image to bucket: ${bucketName}, path: ${filePath}`);
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, imageFile);
      
      if (uploadError) {
        console.error("Error uploading template image:", uploadError);
        throw uploadError;
      }
      
      console.log("Image uploaded successfully:", uploadData);
      
      // Obter a URL pública para a imagem enviada
      const { data: publicUrlData } = supabase.storage
        .from(bucketName)
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
