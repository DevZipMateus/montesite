
import React, { useState, useMemo, useEffect } from 'react';
import Header from '@/components/Header';
import FadeIn from '@/components/animations/FadeIn';
import { Loader2, Search, X, ArrowUpDown, Star } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Showcase } from '@/types/database';
import { fetchShowcases, fetchShowcaseCategories } from '@/services/showcaseService';
import TemplateCategories, { TemplateCategory } from '@/components/TemplateCategories';
import ShowcaseCard from '@/components/ShowcaseCard';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';

type SortOption = 'newest' | 'oldest' | 'name-asc' | 'name-desc';

const ITEMS_PER_PAGE = 9;

const ShowcasePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [goToPageInput, setGoToPageInput] = useState('');

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, sortBy, showOnlyFeatured]);

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

  // Filtrar e ordenar showcases
  const filteredAndSortedShowcases = useMemo(() => {
    // Primeiro aplica o filtro de busca
    let result = showcasesData;
    
    // Filtro de vitrine online (featured)
    if (showOnlyFeatured) {
      result = result.filter((showcase: Showcase) => showcase.featured === true);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((showcase: Showcase) => {
        const clientName = showcase.client_name?.toLowerCase() || '';
        const description = showcase.description?.toLowerCase() || '';
        const siteUrl = showcase.site_url?.toLowerCase() || '';
        
        return clientName.includes(query) || description.includes(query) || siteUrl.includes(query);
      });
    }
    
    // Depois aplica a ordenação
    const sorted = [...result];
    
    switch (sortBy) {
      case 'newest':
        sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.client_name.localeCompare(b.client_name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.client_name.localeCompare(a.client_name));
        break;
    }
    
    return sorted;
  }, [showcasesData, searchQuery, sortBy, showOnlyFeatured]);

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
              <div className="mb-8 space-y-4">
                {/* Campo de busca - linha inteira */}
                <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Buscar por nome, descrição ou link do site..."
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
                
                {/* Ordenação e Categorias lado a lado */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                    <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Ordenar por" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Mais recentes</SelectItem>
                        <SelectItem value="oldest">Mais antigos</SelectItem>
                        <SelectItem value="name-asc">Nome (A-Z)</SelectItem>
                        <SelectItem value="name-desc">Nome (Z-A)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="w-px h-8 bg-border hidden sm:block" />
                  
                  <Button
                    variant={showOnlyFeatured ? "default" : "outline"}
                    size="default"
                    onClick={() => setShowOnlyFeatured(!showOnlyFeatured)}
                    className="flex items-center gap-2"
                  >
                    <Star className={`h-4 w-4 ${showOnlyFeatured ? 'fill-current' : ''}`} />
                    Vitrine online
                  </Button>
                  
                  <div className="w-px h-8 bg-border hidden sm:block" />
                  
                  <TemplateCategories categories={categories} activeCategory={activeCategory} onChange={setActiveCategory} />
                </div>
              </div>
            </FadeIn>
            
            {(isLoadingCategories || isLoadingShowcases) && (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-lg text-muted-foreground">Carregando sites...</span>
              </div>
            )}
            
            {!isLoadingShowcases && filteredAndSortedShowcases.length === 0 && (
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
            
            {!isLoadingShowcases && filteredAndSortedShowcases.length > 0 && (() => {
              const totalPages = Math.ceil(filteredAndSortedShowcases.length / ITEMS_PER_PAGE);
              const safePage = Math.min(currentPage, totalPages);
              const startIdx = (safePage - 1) * ITEMS_PER_PAGE;
              const paginatedShowcases = filteredAndSortedShowcases.slice(startIdx, startIdx + ITEMS_PER_PAGE);

              const getPageNumbers = (): (number | 'ellipsis')[] => {
                const pages: (number | 'ellipsis')[] = [];
                if (totalPages <= 7) {
                  for (let i = 1; i <= totalPages; i++) pages.push(i);
                } else {
                  pages.push(1);
                  if (safePage > 3) pages.push('ellipsis');
                  const start = Math.max(2, safePage - 1);
                  const end = Math.min(totalPages - 1, safePage + 1);
                  for (let i = start; i <= end; i++) pages.push(i);
                  if (safePage < totalPages - 2) pages.push('ellipsis');
                  pages.push(totalPages);
                }
                return pages;
              };

              const goToPage = (page: number) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              };

              return (
                <>
                  {searchQuery && (
                    <div className="text-center mb-6">
                      <p className="text-sm text-muted-foreground">
                        Encontrados {filteredAndSortedShowcases.length} resultado{filteredAndSortedShowcases.length !== 1 ? 's' : ''} para "{searchQuery}"
                      </p>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                    {paginatedShowcases.map((showcase: Showcase, index: number) => (
                      <FadeIn key={showcase.id} delay={index * 50}>
                        <ShowcaseCard {...showcase} />
                      </FadeIn>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-12 flex flex-col items-center gap-3">
                      <Pagination>
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={(e) => {
                                e.preventDefault();
                                if (safePage > 1) goToPage(safePage - 1);
                              }}
                              className={safePage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                            />
                          </PaginationItem>
                          {getPageNumbers().map((p, idx) =>
                            p === 'ellipsis' ? (
                              <PaginationItem key={`ellipsis-${idx}`}>
                                <PaginationEllipsis />
                              </PaginationItem>
                            ) : (
                              <PaginationItem key={p}>
                                <PaginationLink
                                  isActive={p === safePage}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    goToPage(p);
                                  }}
                                  className="cursor-pointer"
                                >
                                  {p}
                                </PaginationLink>
                              </PaginationItem>
                            )
                          )}
                          <PaginationItem>
                            <PaginationNext
                              onClick={(e) => {
                                e.preventDefault();
                                if (safePage < totalPages) goToPage(safePage + 1);
                              }}
                              className={safePage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                      <p className="text-sm text-muted-foreground">
                        Página {safePage} de {totalPages} · {filteredAndSortedShowcases.length} sites
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm text-muted-foreground">Ir para página</span>
                        <Input
                          type="number"
                          min={1}
                          max={totalPages}
                          value={goToPageInput}
                          onChange={(e) => setGoToPageInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              const page = parseInt(goToPageInput, 10);
                              if (page >= 1 && page <= totalPages) {
                                goToPage(page);
                                setGoToPageInput('');
                              }
                            }
                          }}
                          className="w-20 h-9 text-center"
                          placeholder="#"
                        />
                        <Button
                          size="sm"
                          onClick={() => {
                            const page = parseInt(goToPageInput, 10);
                            if (page >= 1 && page <= totalPages) {
                              goToPage(page);
                              setGoToPageInput('');
                            }
                          }}
                        >
                          Ir
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ShowcasePage;
