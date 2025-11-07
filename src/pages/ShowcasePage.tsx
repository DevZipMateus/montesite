
import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import FadeIn from '@/components/animations/FadeIn';
import { Loader2, Search, X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Showcase } from '@/types/database';
import { fetchShowcases, fetchShowcaseCategories } from '@/services/showcaseService';
import TemplateCategories, { TemplateCategory } from '@/components/TemplateCategories';
import ShowcaseCard from '@/components/ShowcaseCard';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ShowcasePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: categoriesData = [],
    isLoading: isLoadingCategories
  } = useQuery({
    queryKey: ['showcase-categories'],
    queryFn: fetchShowcaseCategories
  });

  const {
    data: showcasesData = [],
    isLoading: isLoadingShowcases
  } = useQuery({
    queryKey: ['showcases', activeCategory],
    queryFn: () => fetchShowcases(activeCategory !== 'all' ? activeCategory : undefined)
  });

  const categories: TemplateCategory[] = [
    {
      id: 'all',
      name: 'Todos'
    },
    ...categoriesData.map(category => ({
      id: category.slug,
      name: category.name,
      icon: category.icon
    }))
  ];

  // Filtrar showcases pela busca
  const filteredShowcases = useMemo(() => {
    if (!searchQuery.trim()) return showcasesData;
    
    const query = searchQuery.toLowerCase().trim();
    return showcasesData.filter((showcase: Showcase) => {
      const clientName = showcase.client_name?.toLowerCase() || '';
      const description = showcase.description?.toLowerCase() || '';
      
      return clientName.includes(query) || description.includes(query);
    });
  }, [showcasesData, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <section className="px-8 md:px-14 py-14 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="text-center mb-14">
              <h1 className="text-4xl md:text-5xl font-bold mb-5">Vitrine de Sites Desenvolvidos para nossos clientes</h1>
              <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
                Explore os sites que já desenvolvemos para nossos clientes e inspire-se para o seu próximo projeto.
                Cada site é único e personalizado de acordo com as necessidades do cliente.
              </p>
            </FadeIn>
            
            <FadeIn delay={100}>
              <div className="mb-8">
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Buscar por nome do cliente ou descrição..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-10 h-12 text-base"
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10"
                      title="Limpar busca"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={200}>
              <TemplateCategories categories={categories} activeCategory={activeCategory} onChange={setActiveCategory} />
            </FadeIn>
            
            {(isLoadingCategories || isLoadingShowcases) && (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-lg text-muted-foreground">Carregando sites...</span>
              </div>
            )}
            
            {!isLoadingShowcases && filteredShowcases.length === 0 && (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">
                  {searchQuery ? (
                    <>Nenhum site encontrado para "{searchQuery}".</>
                  ) : (
                    <>Nenhum site encontrado para esta categoria.</>
                  )}
                </p>
              </div>
            )}
            
            {!isLoadingShowcases && filteredShowcases.length > 0 && (
              <>
                {searchQuery && (
                  <div className="text-center mb-6">
                    <p className="text-sm text-muted-foreground">
                      Encontrados {filteredShowcases.length} resultado{filteredShowcases.length !== 1 ? 's' : ''} para "{searchQuery}"
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                  {filteredShowcases.map((showcase: Showcase, index: number) => (
                    <FadeIn key={showcase.id} delay={index * 100}>
                      <ShowcaseCard {...showcase} />
                    </FadeIn>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ShowcasePage;
