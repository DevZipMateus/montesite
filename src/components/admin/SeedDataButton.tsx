
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
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
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SeedDataButton = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSeedData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('seed-data');
      
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Dados carregados com sucesso!',
        description: 'Os templates, categorias e cases foram adicionados ao banco de dados.',
      });
      console.log('Seed data result:', data);
      
      // Close the dialog and reload the page
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error seeding data:', error);
      toast({
        title: 'Erro ao carregar dados',
        description: `Houve um erro ao carregar os dados: ${error.message}`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="flex items-center gap-2">
          Carregar dados iniciais
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar carregamento de dados</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação irá carregar os templates, categorias e cases de exemplo no banco de dados.
            Os dados existentes não serão sobrescritos, apenas novos dados serão adicionados.
            Deseja continuar?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSeedData}
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : null}
            {loading ? 'Carregando...' : 'Sim, carregar dados'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SeedDataButton;
