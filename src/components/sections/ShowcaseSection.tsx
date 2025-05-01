
import React from 'react';
import FadeIn from '@/components/animations/FadeIn';
import { Button } from '@/components/ui/button';
import ShowcaseCard from '@/components/ShowcaseCard';
import { useQuery } from '@tanstack/react-query';
import { Loader2, ExternalLink } from 'lucide-react';
import { fetchShowcases } from '@/services/showcaseService';
import { Link } from 'react-router-dom';

const ShowcaseSection: React.FC = () => {
  const { data: showcasesData = [], isLoading: isLoadingShowcases } = useQuery({
    queryKey: ['featured-showcases'],
    queryFn: () => fetchShowcases(undefined, true, 3), // Get only featured items, limit to 3
  });
  
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
        
        {isLoadingShowcases && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg text-muted-foreground">Carregando sites...</span>
          </div>
        )}
        
        {!isLoadingShowcases && showcasesData.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground mb-4">
              Nenhum site em destaque no momento.
            </p>
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
        
        <FadeIn delay={300} className="flex justify-center mt-12">
          <Button 
            size="lg" 
            className="rounded-full gap-2 bg-gradient-to-r from-primary to-indigo-500 hover:from-indigo-500 hover:to-primary"
            asChild
          >
            <Link to="/vitrine">
              Ver todos os sites
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
};

export default ShowcaseSection;
