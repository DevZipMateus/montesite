import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useQueryClient } from '@tanstack/react-query';

const ClearCacheButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleClearCache = async () => {
    setIsLoading(true);
    
    try {
      // Invalidar todas as queries relacionadas a categorias
      await queryClient.invalidateQueries({ queryKey: ['categories'] });
      await queryClient.invalidateQueries({ queryKey: ['showcase-categories'] });
      await queryClient.invalidateQueries({ queryKey: ['template-categories'] });
      await queryClient.invalidateQueries({ queryKey: ['templates'] });
      await queryClient.invalidateQueries({ queryKey: ['showcases'] });
      
      // Forçar refetch de todas as queries
      await queryClient.refetchQueries();

      toast({
        title: 'Cache atualizado!',
        description: 'Todas as queries foram atualizadas com sucesso.',
      });
      
    } catch (error) {
      console.error('Erro ao limpar cache:', error);
      toast({
        title: 'Erro ao atualizar cache',
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3 className="font-medium mb-2">Atualizar Cache</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Força a atualização de todos os dados de categorias e templates.
      </p>
      <Button 
        onClick={handleClearCache} 
        disabled={isLoading}
        variant="outline"
        className="w-full sm:w-auto"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Atualizando...
          </>
        ) : (
          <>
            <RefreshCw className="mr-2 h-4 w-4" />
            Atualizar Cache
          </>
        )}
      </Button>
    </div>
  );
};

export default ClearCacheButton;
