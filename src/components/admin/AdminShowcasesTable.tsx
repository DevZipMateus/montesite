
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  SelectSeparator 
} from '@/components/ui/select';
import { Loader2, Eye, Edit, Star, Search, X, Filter } from 'lucide-react';
import { fetchAdminShowcases } from '@/services/showcaseService';
import { fetchCategories } from '@/services/templates';
import ShowcaseFormDialog from './ShowcaseFormDialog';
import DeleteShowcaseDialog from './DeleteShowcaseDialog';

const AdminShowcasesTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [featuredFilter, setFeaturedFilter] = useState<'all' | 'featured' | 'not-featured'>('all');

  const { data: showcases = [], isLoading, isError } = useQuery({
    queryKey: ['admin-showcases'],
    queryFn: fetchAdminShowcases,
  });

  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  // Filter logic
  const filteredShowcases = showcases.filter((showcase) => {
    // Search by name or URL
    const matchesSearch = 
      showcase.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      showcase.site_url.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by category
    const matchesCategory = 
      categoryFilter === 'all' || 
      showcase.category_id === categoryFilter ||
      (categoryFilter === 'uncategorized' && !showcase.category_id);
    
    // Filter by featured
    const matchesFeatured = 
      featuredFilter === 'all' ||
      (featuredFilter === 'featured' && showcase.featured) ||
      (featuredFilter === 'not-featured' && !showcase.featured);
    
    return matchesSearch && matchesCategory && matchesFeatured;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center p-8 text-destructive">
        Erro ao carregar sites da vitrine. Por favor, tente novamente mais tarde.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters Section */}
      <div className="space-y-4 mb-6">
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar por nome do cliente ou URL do site..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-9"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 hover:bg-accent rounded-sm p-1"
            >
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <Filter className="h-4 w-4 text-muted-foreground" />
          
          {/* Category filter */}
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Todas as categorias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              <SelectItem value="uncategorized">Sem categoria</SelectItem>
              <SelectSeparator />
              {isLoadingCategories ? (
                <div className="flex items-center justify-center p-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              ) : (
                categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

          {/* Featured filter */}
          <Select value={featuredFilter} onValueChange={(value: any) => setFeaturedFilter(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Todos os sites" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os sites</SelectItem>
              <SelectItem value="featured">Vitrine online</SelectItem>
              <SelectItem value="not-featured">Fora da vitrine</SelectItem>
            </SelectContent>
          </Select>

          {/* Clear filters button */}
          {(searchQuery || categoryFilter !== 'all' || featuredFilter !== 'all') && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
                setFeaturedFilter('all');
              }}
            >
              <X className="h-4 w-4 mr-1" />
              Limpar filtros
            </Button>
          )}

          <div className="ml-auto">
            <ShowcaseFormDialog />
          </div>
        </div>

        {/* Result counter */}
        <div className="text-sm text-muted-foreground">
          Mostrando <strong>{filteredShowcases.length}</strong> de <strong>{showcases.length}</strong> sites
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>Lista de sites na vitrine</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>URL do Site</TableHead>
              <TableHead>Vitrine online</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredShowcases.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  {showcases.length === 0 
                    ? "Nenhum site encontrado na vitrine. Adicione um novo site."
                    : "Nenhum site encontrado com os filtros aplicados."}
                </TableCell>
              </TableRow>
            ) : (
              filteredShowcases.map((showcase) => (
                <TableRow key={showcase.id}>
                  <TableCell className="font-medium">{showcase.client_name}</TableCell>
                  <TableCell>
                    {showcase.categories?.name || 'Sem categoria'}
                  </TableCell>
                  <TableCell className="font-mono text-xs max-w-[200px] truncate">
                    {showcase.site_url}
                  </TableCell>
                  <TableCell>
                    {showcase.featured && (
                      <Badge variant="outline" className="flex items-center gap-1 border-amber-500 text-amber-500">
                        <Star className="h-3 w-3 fill-amber-500" />
                        Vitrine online
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={showcase.site_url} target="_blank" rel="noopener noreferrer" title="Visualizar">
                          <Eye className="h-4 w-4" />
                        </a>
                      </Button>
                      
                      <ShowcaseFormDialog 
                        showcase={showcase}
                        trigger={
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        }
                      />
                      
                      <DeleteShowcaseDialog 
                        showcaseId={showcase.id}
                        clientName={showcase.client_name}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminShowcasesTable;
