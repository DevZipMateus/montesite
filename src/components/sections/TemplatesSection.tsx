import React, { useState } from 'react';
import FadeIn from '@/components/animations/FadeIn';
import { Button } from '@/components/ui/button';
import TemplateCard from '@/components/TemplateCard';
import TemplateCategories, { TemplateCategory } from '@/components/TemplateCategories';
import { Template } from '@/types/database';
import { fetchCategories, fetchTemplates } from '@/services/templates';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

interface TemplatesSectionProps {
  templates?: Template[];
  categories?: TemplateCategory[];
}

const TemplatesSection: React.FC<TemplatesSectionProps> = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const { data: categoriesData = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
  
  const { data: templatesData = [], isLoading: isLoadingTemplates } = useQuery({
    queryKey: ['templates', activeCategory],
    queryFn: () => fetchTemplates(activeCategory !== 'all' ? activeCategory : undefined),
  });
  
  const categories: TemplateCategory[] = [
    { id: 'all', name: 'Todos' },
    ...categoriesData.map((category) => ({
      id: category.slug,
      name: category.name,
      icon: category.icon
    }))
  ];
  
  return (
    <section id="templates" className="px-8 md:px-14 py-[47px]">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">
            Escolha o Template Ideal
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore nossa galeria de templates premium para diversos segmentos de mercado.
          </p>
        </FadeIn>
        
        <FadeIn delay={100}>
          <TemplateCategories 
            categories={categories} 
            activeCategory={activeCategory} 
            onChange={setActiveCategory} 
          />
        </FadeIn>
        
        {(isLoadingCategories || isLoadingTemplates) && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg text-muted-foreground">Carregando templates...</span>
          </div>
        )}
        
        {!isLoadingTemplates && templatesData.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground mb-4">
              Nenhum template encontrado para esta categoria.
            </p>
            <Button onClick={() => setActiveCategory('all')}>Ver todos os templates</Button>
          </div>
        )}
        
        {!isLoadingTemplates && templatesData.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {templatesData.map((template, index) => (
              <FadeIn key={template.id} delay={index * 100}>
                <TemplateCard {...template} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TemplatesSection;
