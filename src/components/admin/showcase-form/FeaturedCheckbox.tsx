
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';
import { ShowcaseFormValues } from '@/schemas/showcaseSchema';

interface FeaturedCheckboxProps {
  form: UseFormReturn<ShowcaseFormValues>;
}

const FeaturedCheckbox: React.FC<FeaturedCheckboxProps> = ({ form }) => {
  return (
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
  );
};

export default FeaturedCheckbox;
