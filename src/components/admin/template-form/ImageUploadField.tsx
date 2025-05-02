
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { UseFormReturn } from 'react-hook-form';
import { TemplateFormValues } from '@/schemas/templateSchema';

interface ImageUploadFieldProps {
  form: UseFormReturn<TemplateFormValues>;
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  imagePreview: string | null;
  setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  form,
  imageFile,
  setImageFile,
  imagePreview,
  setImagePreview
}) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Arquivo inválido",
        description: "Por favor, selecione uma imagem válida.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if file size is less than 5MB
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O tamanho máximo permitido é 5MB.",
        variant: "destructive",
      });
      return;
    }
    
    setImageFile(file);
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
    
    // Quando um arquivo é selecionado, atualizamos o valor do campo para "pending-upload"
    // Isso sinaliza que há um upload pendente, mas o processo real acontece em uploadTemplateImage
    form.setValue("image_url", "pending-upload");
    console.log("Image file selected for upload:", file.name);
  };

  const handleUrlChange = (url: string) => {
    form.setValue("image_url", url);
    setImagePreview(url);
    setImageFile(null);
    console.log("Image URL manually set:", url);
  };
  
  return (
    <FormField
      control={form.control}
      name="image_url"
      render={({ field }) => (
        <FormItem>
          <FormLabel>URL da Imagem</FormLabel>
          <div className="space-y-4">
            {imagePreview && (
              <div className="relative w-full h-40 overflow-hidden rounded-md bg-muted">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <div className="flex items-center gap-4">
              <FormControl>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('template-image-upload')?.click()}
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    {imagePreview ? 'Trocar imagem' : 'Enviar imagem'}
                  </Button>
                  
                  {!imageFile && (
                    <Input
                      placeholder="https://exemplo.com/image.jpg"
                      className="flex-1"
                      value={typeof field.value === 'string' && field.value !== "pending-upload" ? field.value : ''}
                      onChange={(e) => {
                        handleUrlChange(e.target.value);
                      }}
                    />
                  )}
                  
                  <Input
                    id="template-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </FormControl>
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ImageUploadField;
