
import React, { useEffect } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { TemplateFormValues } from '@/schemas/templateSchema';
import { useIsMobile } from '@/hooks/use-mobile';

interface UrlFieldsProps {
  form: UseFormReturn<TemplateFormValues>;
}

const UrlFields: React.FC<UrlFieldsProps> = ({ form }) => {
  const isMobile = useIsMobile();
  
  // Debug current form state for URLs
  useEffect(() => {
    const formUrlValue = form.watch('form_url');
    const previewUrlValue = form.watch('preview_url');
    console.log("Current form URLs:", { form: formUrlValue, preview: previewUrlValue });
  }, [form.watch('form_url'), form.watch('preview_url')]);
  
  return (
    <div className={`grid grid-cols-1 ${isMobile ? 'gap-4' : 'md:grid-cols-2 gap-4'}`}>
      <FormField
        control={form.control}
        name="form_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>URL do Formulário</FormLabel>
            <FormControl>
              <Input 
                placeholder="https://forms.example.com/form" 
                {...field} 
                onChange={(e) => {
                  const value = e.target.value.trim();
                  field.onChange(value);
                  form.trigger("form_url");
                  console.log("Form URL updated:", value);
                }}
                onBlur={(e) => {
                  // Ensure the value is trimmed and validate on blur
                  const value = e.target.value.trim();
                  field.onChange(value);
                  form.trigger("form_url");
                  console.log("Form URL finalized:", value);
                }}
                className="focus:border-primary"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="preview_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>URL de Visualização</FormLabel>
            <FormControl>
              <Input 
                placeholder="https://preview.example.com" 
                {...field}
                onChange={(e) => {
                  const value = e.target.value.trim();
                  field.onChange(value);
                  form.trigger("preview_url");
                  console.log("Preview URL updated:", value);
                }}
                onBlur={(e) => {
                  // Ensure the value is trimmed and validate on blur
                  const value = e.target.value.trim();
                  field.onChange(value);
                  form.trigger("preview_url");
                  console.log("Preview URL finalized:", value);
                }}
                className="focus:border-primary"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default UrlFields;
