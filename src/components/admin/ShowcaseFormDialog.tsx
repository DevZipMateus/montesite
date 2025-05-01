
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
import ShowcaseForm from './ShowcaseForm';
import { ShowcaseFormValues } from '@/schemas/showcaseSchema';
import { Showcase } from '@/types/database';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createShowcase, updateShowcase } from '@/services/showcaseService';

interface ShowcaseFormDialogProps {
  showcase?: Showcase;
  trigger?: React.ReactNode;
}

const ShowcaseFormDialog: React.FC<ShowcaseFormDialogProps> = ({ showcase, trigger }) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createShowcase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-showcases'] });
      setOpen(false);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Showcase> }) => 
      updateShowcase(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-showcases'] });
      setOpen(false);
    }
  });

  const handleSubmit = async (data: ShowcaseFormValues) => {
    if (showcase) {
      await updateMutation.mutateAsync({ id: showcase.id, data });
    } else {
      // Criar um novo showcase
      await createMutation.mutateAsync(data);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Site para Vitrine
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{showcase ? 'Editar' : 'Adicionar'} Site na Vitrine</DialogTitle>
        </DialogHeader>
        <ShowcaseForm 
          showcase={showcase}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ShowcaseFormDialog;
