
import React from 'react';
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
import { Loader2, Eye, Edit, Star } from 'lucide-react';
import { fetchAdminShowcases } from '@/services/showcaseService';
import ShowcaseFormDialog from './ShowcaseFormDialog';
import DeleteShowcaseDialog from './DeleteShowcaseDialog';

const AdminShowcasesTable: React.FC = () => {
  const { data: showcases = [], isLoading, isError } = useQuery({
    queryKey: ['admin-showcases'],
    queryFn: fetchAdminShowcases,
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
      <div className="flex justify-end">
        <ShowcaseFormDialog />
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>Lista de sites na vitrine</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>URL do Site</TableHead>
              <TableHead>Destaque</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {showcases.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Nenhum site encontrado na vitrine. Adicione um novo site.
                </TableCell>
              </TableRow>
            ) : (
              showcases.map((showcase) => (
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
                        Destaque
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
