
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import TemplateForm from './TemplateForm';
import { TemplateFormValues } from '@/schemas/templateSchema';
import { Template } from '@/types/database';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTemplate, updateTemplate } from '@/services/templateService';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';

interface TemplateFormDialogProps {
  template?: Template;
  trigger?: React.ReactNode;
}

const TemplateFormDialog: React.FC<TemplateFormDialogProps> = ({ template, trigger }) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();

  const createMutation = useMutation({
    mutationFn: createTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-templates'] });
      setOpen(false);
      toast({
        title: "Sucesso!",
        description: "Template criado com sucesso.",
      });
    },
    onError: (error) => {
      console.error("Error creating template:", error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o template. Tente novamente.",
        variant: "destructive",
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Template> }) => 
      updateTemplate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-templates'] });
      setOpen(false);
      // Note: Success toast is now handled in the service function
    },
    onError: (error) => {
      console.error("Error updating template:", error);
      // Note: Error toast is now handled in the service function
    }
  });

  const handleSubmit = async (data: TemplateFormValues) => {
    console.log("TemplateFormDialog - Form data before submitting:", data);
    
    try {
      if (template) {
        // Convert form data to the format expected by the update function
        const templateData: Partial<Template> = {
          title: data.title,
          description: data.description,
          image_url: data.image_url as string,
          form_url: data.form_url,
          preview_url: data.preview_url,
          category_id: data.category_id,
          status: data.status,
          order_index: data.order_index
        };
        
        console.log("Updating template with ID:", template.id);
        console.log("Update payload:", templateData);
        
        await updateMutation.mutateAsync({ 
          id: template.id, 
          data: templateData
        });
      } else {
        // For creation, ensure all required fields are present
        const newTemplateData = {
          title: data.title,
          description: data.description,
          image_url: data.image_url as string,
          form_url: data.form_url,
          preview_url: data.preview_url,
          category_id: data.category_id,
          status: data.status,
          order_index: data.order_index
        };
        
        console.log("Creating new template with data:", newTemplateData);
        
        await createMutation.mutateAsync(newTemplateData as unknown as Omit<Template, 'id' | 'created_at' | 'updated_at'>);
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      // Toast notification is already handled in the mutation's onError
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Template
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className={`${isMobile ? 'w-[95vw] p-4' : 'max-w-3xl'} overflow-y-auto max-h-[90vh]`}>
        <DialogHeader>
          <DialogTitle>{template ? 'Editar' : 'Adicionar'} Template</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para {template ? 'editar' : 'adicionar'} um template.
          </DialogDescription>
        </DialogHeader>
        <div className="py-2">
          <TemplateForm 
            template={template}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateFormDialog;
