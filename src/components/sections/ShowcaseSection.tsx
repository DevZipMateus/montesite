
import React, { useState } from 'react';
import FadeIn from '@/components/animations/FadeIn';
import { Button } from '@/components/ui/button';
import ShowcaseCard from '@/components/ShowcaseCard';
import TemplateCategories, { TemplateCategory } from '@/components/TemplateCategories';
import { Showcase } from '@/types/database';
import { fetchCategories } from '@/services/templateService';
import { fetchShowcases } from '@/services/showcaseService';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

const ShowcaseSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const { data: categoriesData = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
  
  const { data: showcasesData = [], isLoading: isLoadingShowcases } = useQuery({
    queryKey: ['showcases', activeCategory],
    queryFn: () => fetchShowcases(activeCategory !== 'all' ? activeCategory : undefined),
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
    <section id="showcase" className="px-8 md:px-14 py-[47px] bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">
            Vitrine de Sites Prontos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Confira alguns dos sites que já desenvolvemos para nossos clientes.
          </p>
        </FadeIn>
        
        <FadeIn delay={100}>
          <TemplateCategories 
            categories={categories} 
            activeCategory={activeCategory} 
            onChange={setActiveCategory} 
          />
        </FadeIn>
        
        {(isLoadingCategories || isLoadingShowcases) && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg text-muted-foreground">Carregando sites...</span>
          </div>
        )}
        
        {!isLoadingShowcases && showcasesData.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground mb-4">
              Nenhum site encontrado para esta categoria.
            </p>
            <Button onClick={() => setActiveCategory('all')}>Ver todos os sites</Button>
          </div>
        )}
        
        {!isLoadingShowcases && showcasesData.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {showcasesData.map((showcase, index) => (
              <FadeIn key={showcase.id} delay={index * 100}>
                <ShowcaseCard {...showcase} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ShowcaseSection;
