
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import TemplateForm from './TemplateForm';
import { TemplateFormValues } from '@/schemas/templateSchema';
import { Template } from '@/types/database';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTemplate, updateTemplate } from '@/services/templateService';

interface TemplateFormDialogProps {
  template?: Template;
  trigger?: React.ReactNode;
}

const TemplateFormDialog: React.FC<TemplateFormDialogProps> = ({ template, trigger }) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

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
    const processedData = {
      ...data,
      image_url: typeof data.image_url === 'string' ? data.image_url : '' // This should be replaced by the actual URL from storage
    };
    
    if (template) {
      await updateMutation.mutateAsync({ 
        id: template.id, 
        data: processedData as unknown as Partial<Template> 
      });
    } else {
      // Ensure all required fields are set for a new template
      await createMutation.mutateAsync(processedData as unknown as Omit<Template, 'id' | 'created_at' | 'updated_at'>);
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
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{template ? 'Editar' : 'Adicionar'} Template</DialogTitle>
        </DialogHeader>
        <TemplateForm 
          template={template}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};

export default TemplateFormDialog;
