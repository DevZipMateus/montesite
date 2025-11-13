import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wand2, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';

// Mapeamento de nomes de categorias para ícones do Lucide
const categoryIconMap: Record<string, string> = {
  'advocacia': 'Scale',
  'agricola': 'Leaf',
  'alimenticio': 'Pizza',
  'aluguel': 'Home',
  'artigos-religiosos': 'Heart',
  'assistencia-tecnica': 'Wrench',
  'associacoes-instituicoes': 'Users',
  'automotivo': 'Car',
  'bebidas': 'Coffee',
  'comercio': 'Store',
  'construcao': 'Hammer',
  'consultoria-e-organizacao': 'Briefcase',
  'contabilidade': 'Calculator',
  'cosmeticos': 'Sparkles',
  'embalagens': 'Package',
  'energia-solar': 'Sun',
  'epis': 'Shield',
  'erp': 'Database',
  'esportes': 'Dumbbell',
  'esquadrias': 'Square',
  'floricultura': 'Flower',
  'fotografia': 'Camera',
  'funerarias': 'Church',
  'graficas': 'Printer',
  'hotelaria': 'Hotel',
  'imobiliaria': 'Building',
  'limpeza-higienizacao': 'Sparkles',
  'linha-automotiva': 'Car',
  'maquinas-equipamentos': 'Settings',
  'marcenaria': 'Hammer',
  'marmorarias': 'Gem',
  'materiais-para-construcao': 'Blocks',
  'moda': 'Shirt',
  'moda-infantil': 'Baby',
  'moveis': 'Sofa',
  'oticas': 'Glasses',
  'padarias': 'Cookie',
  'parque-aquatico': 'Waves',
  'petshop': 'PawPrint',
  'presentes-personalizados': 'Gift',
  'producao': 'Factory',
  'seguranca-eletronica-monitoramento': 'Shield',
  'servicos': 'Wrench',
  'servicos-eletricos': 'Zap',
  'tecnologia': 'Cpu',
  'ti-automacao': 'Code',
  'transporte-logistica': 'Truck',
};

const AutoIconAssigner: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const normalizeSlug = (slug: string): string => {
    return slug
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w\s-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const getIconForCategory = (slug: string): string => {
    const normalized = normalizeSlug(slug);
    return categoryIconMap[normalized] || 'LayoutTemplate';
  };

  const handleAutoAssign = async () => {
    setIsLoading(true);
    
    try {
      // Buscar todas as categorias
      const { data: categories, error: fetchError } = await supabase
        .from('categories')
        .select('*');

      if (fetchError) throw fetchError;

      if (!categories || categories.length === 0) {
        toast({
          title: 'Nenhuma categoria encontrada',
          description: 'Não há categorias para atualizar.',
          variant: 'destructive',
        });
        return;
      }

      let updated = 0;
      let errors = 0;

      // Atualizar cada categoria com o ícone apropriado
      for (const category of categories) {
        const icon = getIconForCategory(category.slug);
        
        const { error: updateError } = await supabase
          .from('categories')
          .update({ icon })
          .eq('id', category.id);

        if (updateError) {
          console.error(`Erro ao atualizar categoria ${category.name}:`, updateError);
          errors++;
        } else {
          updated++;
        }
      }

      // Invalidar queries para atualizar a UI
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['showcase-categories'] });
      queryClient.invalidateQueries({ queryKey: ['templates'] });

      toast({
        title: 'Ícones atualizados!',
        description: `${updated} categorias atualizadas com sucesso. ${errors > 0 ? `${errors} erros.` : ''}`,
      });
      
    } catch (error) {
      console.error('Erro ao atribuir ícones:', error);
      toast({
        title: 'Erro ao atribuir ícones',
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3 className="font-medium mb-2">Atribuir ícones automaticamente</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Atribui ícones personalizados para todas as categorias baseado em seus nomes.
      </p>
      <Button 
        onClick={handleAutoAssign} 
        disabled={isLoading}
        className="w-full sm:w-auto"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Atualizando...
          </>
        ) : (
          <>
            <Wand2 className="mr-2 h-4 w-4" />
            Atribuir Ícones Automaticamente
          </>
        )}
      </Button>
    </div>
  );
};

export default AutoIconAssigner;
