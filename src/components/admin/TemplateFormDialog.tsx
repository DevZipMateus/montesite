
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
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Template> }) => 
      updateTemplate(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-templates'] });
      setOpen(false);
    }
  });

  const handleSubmit = async (data: TemplateFormValues) => {
    // Process the data (file uploads were already handled in TemplateForm)
    console.log("TemplateFormDialog - Form data before submitting:", data);
    
    if (template) {
      await updateMutation.mutateAsync({ 
        id: template.id, 
        data: data as unknown as Partial<Template> 
      });
    } else {
      // Ensure all required fields are set for a new template
      await createMutation.mutateAsync(data as unknown as Omit<Template, 'id' | 'created_at' | 'updated_at'>);
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
