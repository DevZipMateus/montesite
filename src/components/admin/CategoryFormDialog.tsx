
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryFormSchema, CategoryFormValues } from '@/schemas/showcaseSchema';
import { createCategory, updateCategory } from '@/services/templates';
import { Category } from '@/types/database';
import { Loader2 } from 'lucide-react';

interface CategoryFormDialogProps {
  onSuccess?: () => void;
  category?: Category;
  trigger?: React.ReactNode;
}

const CategoryFormDialog: React.FC<CategoryFormDialogProps> = ({ onSuccess, category, trigger }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const isEditMode = !!category;
  
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: category ? {
      name: category.name,
      slug: category.slug,
      icon: category.icon || ''
    } : {
      name: '',
      slug: '',
      icon: ''
    }
  });
  
  const saveMutation = useMutation({
    mutationFn: async (data: CategoryFormValues) => {
      if (isEditMode && category) {
        return updateCategory(category.id, data);
      }
      return createCategory(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category-usage'] });
      if (onSuccess) onSuccess();
      setOpen(false);
      form.reset();
    },
    onError: (error) => {
      console.error('Error in mutation handler:', error);
    }
  });
  
  const handleSubmit = async (data: CategoryFormValues) => {
    console.log('Submitting category form with data:', data);
    try {
      await saveMutation.mutateAsync(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Nova Categoria
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? 'Editar Categoria' : 'Adicionar Nova Categoria'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Categoria</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: Contabilidade" 
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        // Auto-generate slug when name changes
                        const slug = generateSlug(e.target.value);
                        form.setValue('slug', slug);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: contabilidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ícone (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do ícone (ex: calculator)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={saveMutation.isPending}>
                {saveMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditMode ? 'Atualizar Categoria' : 'Salvar Categoria'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryFormDialog;
