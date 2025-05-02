
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { showcaseFormSchema, ShowcaseFormValues } from '@/schemas/showcaseSchema';
import { Showcase } from '@/types/database';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '@/services/templateService';
import { toast } from '@/hooks/use-toast';

// Import our refactored components
import ClientDetails from './showcase-form/ClientDetails';
import ImageUploadField from './showcase-form/ImageUploadField';
import CategoryField from './showcase-form/CategoryField';
import FeaturedCheckbox from './showcase-form/FeaturedCheckbox';
import SubmitButton from './showcase-form/SubmitButton';
import { uploadShowcaseImage } from './showcase-form/ShowcaseUploader';

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
  
  const handleSubmit = async (data: ShowcaseFormValues) => {
    try {
      const formData = await uploadShowcaseImage(imageFile, data);
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
        <ClientDetails form={form} />
        
        <ImageUploadField 
          form={form}
          imageFile={imageFile}
          setImageFile={setImageFile}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CategoryField 
            form={form}
            categories={categories}
            isLoadingCategories={isLoadingCategories}
            refetchCategories={refetchCategories}
          />
          
          <FeaturedCheckbox form={form} />
        </div>
        
        <SubmitButton isSubmitting={isSubmitting} isEdit={!!showcase} />
      </form>
    </Form>
  );
};

export default ShowcaseForm;
