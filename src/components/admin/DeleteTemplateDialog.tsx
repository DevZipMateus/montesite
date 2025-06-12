
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTemplate } from '@/services/templateService';
import { toast } from '@/hooks/use-toast';

interface DeleteTemplateDialogProps {
  templateId: string;
  templateTitle: string;
}

const DeleteTemplateDialog: React.FC<DeleteTemplateDialogProps> = ({ 
  templateId, 
  templateTitle 
}) => {
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-templates'] });
      setOpen(false);
      toast({
        title: "Template removido",
        description: "O template foi removido com sucesso.",
      });
    },
    onError: (error) => {
      console.error('Error deleting template:', error);
      toast({
        title: "Erro ao remover template",
        description: "Não foi possível remover o template. Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  });

  const handleDelete = async () => {
    console.log('Deleting template with ID:', templateId);
    try {
      await deleteMutation.mutateAsync(templateId);
    } catch (error) {
      console.error('Failed to delete template:', error);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente o template{' '}
            <span className="font-semibold">{templateTitle}</span> do servidor.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? 'Excluindo...' : 'Sim, excluir template'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTemplateDialog;
