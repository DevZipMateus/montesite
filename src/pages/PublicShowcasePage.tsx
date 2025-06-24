
import React, { useState } from 'react';
import PublicShowcaseHeader from '@/components/PublicShowcaseHeader';
import FadeIn from '@/components/animations/FadeIn';
import { Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Showcase } from '@/types/database';
import { fetchShowcases } from '@/services/showcaseService';
import ShowcaseCard from '@/components/ShowcaseCard';

const PublicShowcasePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const {
    data: showcasesData = [],
    isLoading: isLoadingShowcases
  } = useQuery({
    queryKey: ['showcases', activeCategory],
    queryFn: () => fetchShowcases(activeCategory !== 'all' ? activeCategory : undefined)
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <PublicShowcaseHeader 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <main className="flex-grow pt-28 sm:pt-32 md:pt-40">
        <section className="px-4 sm:px-8 md:px-14 py-8 sm:py-14">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="text-center mb-8 sm:mb-14">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-5">
                Sites Desenvolvidos para Nossos Clientes
              </h1>
              <p className="text-muted-foreground max-w-3xl mx-auto text-base sm:text-lg">
                Explore nossa vitrine de sites desenvolvidos. Cada projeto é único e 
                personalizado de acordo com as necessidades específicas de cada cliente.
              </p>
            </FadeIn>
            
            {isLoadingShowcases && (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-lg text-muted-foreground">Carregando sites...</span>
              </div>
            )}
            
            {!isLoadingShowcases && showcasesData.length === 0 && (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">
                  Nenhum site encontrado para esta categoria.
                </p>
              </div>
            )}
            
            {!isLoadingShowcases && showcasesData.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-6 sm:mt-10">
                {showcasesData.map((showcase: Showcase, index: number) => (
                  <FadeIn key={showcase.id} delay={index * 100}>
                    <ShowcaseCard {...showcase} />
                  </FadeIn>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default PublicShowcasePage;
