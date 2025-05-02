
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
                {...field} 
                onChange={(e) => {
                  field.onChange(e);
                  console.log("Form URL updated:", e.target.value);
                }}
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
                  field.onChange(e);
                  console.log("Preview URL updated:", e.target.value);
                }}
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
