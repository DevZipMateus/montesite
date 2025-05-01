
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
import { fetchTemplates } from '@/services/templateService';
import { Loader2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const AdminTemplatesTable: React.FC = () => {
  const { data: templates = [], isLoading } = useQuery({
    queryKey: ['admin-templates'],
    queryFn: () => fetchTemplates(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
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
          {templates.map((template) => (
            <TableRow key={template.id}>
              <TableCell className="font-mono text-xs">{template.id.substring(0, 8)}...</TableCell>
              <TableCell className="font-medium">{template.title}</TableCell>
              <TableCell>
                {template.category_id ? template.category_id : 'Sem categoria'}
              </TableCell>
              <TableCell>
                <Badge variant={template.status === 'active' ? 'default' : 'secondary'}>
                  {template.status === 'active' ? 'Ativo' : template.status === 'inactive' ? 'Inativo' : 'Arquivado'}
                </Badge>
              </TableCell>
              <TableCell>{template.order_index}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" asChild>
                  <a href={template.preview_url} target="_blank" rel="noopener noreferrer" title="Visualizar">
                    <Eye className="h-4 w-4" />
                  </a>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminTemplatesTable;
