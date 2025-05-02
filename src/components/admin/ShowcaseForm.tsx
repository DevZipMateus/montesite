
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { showcaseFormSchema, ShowcaseFormValues } from '@/schemas/showcaseSchema';
import { Category, Showcase } from '@/types/database';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@/services/templateService';
import { Loader2, Upload, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import CategoryFormDialog from './CategoryFormDialog';

interface ShowcaseFormProps {
  showcase?: Showcase;
  onSubmit: (data: ShowcaseFormValues) => Promise<void>;
  isSubmitting: boolean;
}

const ShowcaseForm: React.FC<ShowcaseFormProps> = ({ showcase, onSubmit, isSubmitting }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(showcase?.image_url || null);
  
  const form = useForm<ShowcaseFormValues>({
    resolver: zodResolver(showcaseFormSchema),
    defaultValues: {
      client_name: showcase?.client_name || '',
      description: showcase?.description || '',
      image_url: showcase?.image_url || '',
      site_url: showcase?.site_url || '',
      category_id: showcase?.category_id || null,
      featured: showcase?.featured || false
    }
  });
  
  const { data: categories = [], isLoading: isLoadingCategories, refetch: refetchCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });
  
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
    form.setValue('image_url', file as any);
  };
  
  const handleSubmit = async (data: ShowcaseFormValues) => {
    try {
      let imageUrl = data.image_url;
      
      // If there's a new image file, upload it to Supabase Storage
      if (imageFile) {
        const timestamp = new Date().getTime();
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${timestamp}-${imageFile.name}`;
        const filePath = `showcases/${fileName}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, imageFile);
        
        if (uploadError) {
          throw uploadError;
        }
        
        // Get the public URL for the uploaded image
        const { data: publicUrlData } = supabase.storage
          .from('images')
          .getPublicUrl(filePath);
        
        imageUrl = publicUrlData.publicUrl;
      }
      
      // Update the form data with the new image URL if an image was uploaded
      const formData = {
        ...data,
        image_url: imageUrl as string,
      };
      
      await onSubmit(formData);
    } catch (error) {
      toast({
        title: "Erro ao enviar formulário",
        description: "Ocorreu um erro ao processar a imagem. Tente novamente.",
        variant: "destructive",
      });
      console.error("Error submitting form:", error);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="client_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Cliente</FormLabel>
                <FormControl>
                  <Input placeholder="Contabilidade ABC" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="site_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL do Site</FormLabel>
                <FormControl>
                  <Input placeholder="https://www.exemplo.com.br" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="image_url"
          render={({ field: { onChange, value, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Imagem do Site</FormLabel>
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
                        onClick={() => document.getElementById('image-upload')?.click()}
                        className="flex items-center gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        {imagePreview ? 'Trocar imagem' : 'Enviar imagem'}
                      </Button>
                      {!imageFile && (
                        <Input
                          placeholder="https://exemplo.com/image.jpg"
                          className="flex-1"
                          value={typeof value === 'string' ? value : ''}
                          onChange={(e) => {
                            onChange(e.target.value);
                            if (e.target.value) {
                              setImagePreview(e.target.value);
                            } else {
                              setImagePreview(null);
                            }
                          }}
                        />
                      )}
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                        {...fieldProps}
                      />
                    </div>
                  </FormControl>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Uma breve descrição sobre o site..." 
                  className="resize-none" 
                  {...field} 
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <FormLabel>Categoria</FormLabel>
              <CategoryFormDialog onSuccess={refetchCategories} />
            </div>
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <Select 
                    onValueChange={(value) => field.onChange(value === "null" ? null : value)} 
                    defaultValue={field.value || "null"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoadingCategories ? (
                        <div className="flex items-center justify-center p-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                      ) : (
                        <>
                          <SelectItem value="null">Sem categoria</SelectItem>
                          {categories.map((category: Category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Destacado</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {showcase ? 'Atualizar' : 'Adicionar'} Site
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ShowcaseForm;
