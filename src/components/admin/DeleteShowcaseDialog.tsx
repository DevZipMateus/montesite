
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
import { deleteShowcase } from '@/services/showcaseService';

interface DeleteShowcaseDialogProps {
  showcaseId: string;
  clientName: string;
}

const DeleteShowcaseDialog: React.FC<DeleteShowcaseDialogProps> = ({
  showcaseId,
  clientName,
}) => {
  const queryClient = useQueryClient();
  
  const deleteMutation = useMutation({
    mutationFn: deleteShowcase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-showcases'] });
    }
  });
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remover Site da Vitrine</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja remover o site <strong>{clientName}</strong> da vitrine?
            Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={() => deleteMutation.mutate(showcaseId)}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Remover Site
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteShowcaseDialog;
