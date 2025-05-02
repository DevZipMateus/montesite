
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { Form } from '@/components/ui/form';
import { templateFormSchema, TemplateFormValues } from '@/schemas/templateSchema';
import { Template } from '@/types/database';
import { fetchCategories } from '@/services/templateService';
import { toast } from '@/hooks/use-toast';

// Import our refactored components
import TemplateDetails from './template-form/TemplateDetails';
import ImageUploadField from './template-form/ImageUploadField';
import UrlFields from './template-form/UrlFields';
import TemplateMetadata from './template-form/TemplateMetadata';
import SubmitButton from './template-form/SubmitButton';
import { uploadTemplateImage } from './template-form/TemplateUploader';

interface TemplateFormProps {
  template?: Template;
  onSubmit: (data: TemplateFormValues) => Promise<void>;
  isSubmitting: boolean;
}

const TemplateForm: React.FC<TemplateFormProps> = ({ template, onSubmit, isSubmitting }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(template?.image_url || null);

  const form = useForm<TemplateFormValues>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: {
      title: template?.title || '',
      description: template?.description || '',
      image_url: template?.image_url || '',
      form_url: template?.form_url || '',
      preview_url: template?.preview_url || '',
      category_id: template?.category_id || null,
      status: template?.status || 'active',
      order_index: template?.order_index || 0
    }
  });

  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: fetchCategories,
  });

  const handleSubmitForm = async (data: TemplateFormValues) => {
    try {
      const formData = await uploadTemplateImage(imageFile, data);
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
      <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-6">
        <TemplateDetails form={form} />
        
        <ImageUploadField 
          form={form}
          imageFile={imageFile}
          setImageFile={setImageFile}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
        />
        
        <UrlFields form={form} />
        
        <TemplateMetadata 
          form={form}
          categories={categories}
          isCategoriesLoading={isCategoriesLoading}
        />
        
        <SubmitButton isSubmitting={isSubmitting} isEdit={!!template} />
      </form>
    </Form>
  );
};

export default TemplateForm;
