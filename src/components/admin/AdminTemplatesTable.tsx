
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
import { fetchAdminTemplates } from '@/services/templates';
import { Loader2, Eye, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import TemplateFormDialog from './TemplateFormDialog';
import DeleteTemplateDialog from './DeleteTemplateDialog';
import CategoryFormDialog from './CategoryFormDialog';

const AdminTemplatesTable: React.FC = () => {
  const { data: templates = [], isLoading, isError } = useQuery({
    queryKey: ['admin-templates'],
    queryFn: fetchAdminTemplates,
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
        Erro ao carregar templates. Por favor, tente novamente mais tarde.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end gap-2">
        <CategoryFormDialog />
        <TemplateFormDialog />
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>Lista de templates disponíveis</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ordem</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Nenhum template encontrado. Adicione um novo template.
                </TableCell>
              </TableRow>
            ) : (
              templates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell className="font-mono text-xs">
                    {template.id.substring(0, 8)}...
                  </TableCell>
                  <TableCell className="font-medium">{template.title}</TableCell>
                  <TableCell>
                    {template.categories ? template.categories.name : 'Sem categoria'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      template.status === 'active' 
                        ? 'default' 
                        : template.status === 'inactive'
                        ? 'secondary'
                        : 'outline'
                    }>
                      {template.status === 'active' 
                        ? 'Ativo' 
                        : template.status === 'inactive' 
                        ? 'Inativo' 
                        : 'Arquivado'}
                    </Badge>
                  </TableCell>
                  <TableCell>{template.order_index}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={template.preview_url} target="_blank" rel="noopener noreferrer" title="Visualizar">
                          <Eye className="h-4 w-4" />
                        </a>
                      </Button>
                      
                      <TemplateFormDialog 
                        template={template}
                        trigger={
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        }
                      />
                      
                      <DeleteTemplateDialog 
                        templateId={template.id}
                        templateTitle={template.title}
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

export default AdminTemplatesTable;
