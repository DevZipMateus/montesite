
import React from 'react';
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
                value={field.value}
                onChange={(e) => {
                  const value = e.target.value.trim();
                  field.onChange(value);
                  form.setValue('form_url', value, { shouldValidate: true });
                }}
                onBlur={(e) => {
                  // Ensure the value is trimmed and validate on blur
                  const value = e.target.value.trim();
                  field.onChange(value);
                  form.setValue('form_url', value, { shouldValidate: true, shouldDirty: true });
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
                value={field.value}
                onChange={(e) => {
                  const value = e.target.value.trim();
                  field.onChange(value);
                  form.setValue('preview_url', value, { shouldValidate: true });
                }}
                onBlur={(e) => {
                  // Ensure the value is trimmed and validate on blur
                  const value = e.target.value.trim();
                  field.onChange(value);
                  form.setValue('preview_url', value, { shouldValidate: true, shouldDirty: true });
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
