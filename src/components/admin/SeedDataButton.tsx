
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SeedDataButton = () => {
  const [loading, setLoading] = useState(false);

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
      
      // Reload the page to refresh the data
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
    <Button 
      onClick={handleSeedData}
      disabled={loading}
      className="flex items-center gap-2"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : null}
      {loading ? 'Carregando dados...' : 'Carregar dados iniciais'}
    </Button>
  );
};

export default SeedDataButton;
