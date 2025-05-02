
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { ShowcaseFormValues } from '@/schemas/showcaseSchema';
import { Category } from '@/types/database';
import CategoryFormDialog from '../CategoryFormDialog';

interface CategoryFieldProps {
  form: UseFormReturn<ShowcaseFormValues>;
  categories: Category[];
  isLoadingCategories: boolean;
  refetchCategories: () => void;
}

const CategoryField: React.FC<CategoryFieldProps> = ({
  form,
  categories,
  isLoadingCategories,
  refetchCategories
}) => {
  return (
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
  );
};

export default CategoryField;
