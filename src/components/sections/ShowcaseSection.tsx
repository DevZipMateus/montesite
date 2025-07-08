import React from 'react';
import FadeIn from '@/components/animations/FadeIn';
import { Button } from '@/components/ui/button';
import ShowcaseCard from '@/components/ShowcaseCard';
import { useQuery } from '@tanstack/react-query';
import { Loader2, ExternalLink } from 'lucide-react';
import { fetchShowcases } from '@/services/showcaseService';
import { Link } from 'react-router-dom';
const ShowcaseSection: React.FC = () => {
  const {
    data: showcasesData = [],
    isLoading: isLoadingShowcases
  } = useQuery({
    queryKey: ['featured-showcases'],
    queryFn: () => fetchShowcases(undefined, true, 3) // Get only featured items, limit to 3
  });

  if (isLoadingShowcases) {
    return (
      <section className="py-28 px-8 md:px-14">
        <div className="max-w-7xl mx-auto text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
        </div>
      </section>
    );
  }

  if (!showcasesData.length) {
    return null;
  }

  return (
    <section className="py-28 px-8 md:px-14 bg-background">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">
            Nossos Projetos em Destaque
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Veja alguns dos projetos que desenvolvemos para nossos clientes.
          </p>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {showcasesData.map((showcase, index) => (
            <FadeIn key={showcase.id} delay={index * 100}>
              <ShowcaseCard
                id={showcase.id}
                client_name={showcase.client_name}
                description={showcase.description}
                image_url={showcase.image_url}
                site_url={showcase.site_url}
              />
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/vitrine" className="flex items-center gap-2">
              Ver Todos os Projetos
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
};
export default ShowcaseSection;