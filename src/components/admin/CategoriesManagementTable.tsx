
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { fetchCategories, deleteCategory } from '@/services/templates';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import CategoryFormDialog from './CategoryFormDialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const CategoriesManagementTable: React.FC = () => {
  const [categoryToDelete, setCategoryToDelete] = useState<{ id: string; name: string } | null>(null);
  const queryClient = useQueryClient();

  // Fetch all categories
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  // Fetch usage count (templates and showcases)
  const { data: usageData = {} } = useQuery({
    queryKey: ['category-usage'],
    queryFn: async () => {
      const { data: templates } = await supabase
        .from('templates')
        .select('category_id');
      
      const { data: showcases } = await supabase
        .from('showcases')
        .select('category_id');
      
      const usage: Record<string, { templates: number; showcases: number }> = {};
      
      templates?.forEach(t => {
        if (t.category_id) {
          usage[t.category_id] = usage[t.category_id] || { templates: 0, showcases: 0 };
          usage[t.category_id].templates++;
        }
      });
      
      showcases?.forEach(s => {
        if (s.category_id) {
          usage[s.category_id] = usage[s.category_id] || { templates: 0, showcases: 0 };
          usage[s.category_id].showcases++;
        }
      });
      
      return usage;
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category-usage'] });
      setCategoryToDelete(null);
    },
  });

  const handleDelete = async () => {
    if (!categoryToDelete) return;
    
    const usage = usageData[categoryToDelete.id];
    const totalUsage = (usage?.templates || 0) + (usage?.showcases || 0);
    
    if (totalUsage > 0) {
      toast({
        title: "Não é possível excluir",
        description: `Esta categoria está sendo usada por ${totalUsage} item(ns). Remova as referências primeiro.`,
        variant: "destructive",
      });
      setCategoryToDelete(null);
      return;
    }
    
    deleteMutation.mutate(categoryToDelete.id);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Categorias ({categories.length})</h3>
            <p className="text-sm text-muted-foreground">
              Gerencie as categorias usadas em templates e showcases
            </p>
          </div>
          <CategoryFormDialog />
        </div>

        {/* Categories table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Ícone</TableHead>
                <TableHead>Uso</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Nenhuma categoria encontrada. Crie a primeira categoria.
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => {
                  const usage = usageData[category.id] || { templates: 0, showcases: 0 };
                  const totalUsage = usage.templates + usage.showcases;
                  
                  return (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name}</TableCell>
                      <TableCell className="font-mono text-xs">{category.slug}</TableCell>
                      <TableCell>
                        {category.icon ? (
                          <Badge variant="outline">{category.icon}</Badge>
                        ) : (
                          <span className="text-xs text-muted-foreground">Sem ícone</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 flex-wrap">
                          {usage.templates > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {usage.templates} template{usage.templates !== 1 ? 's' : ''}
                            </Badge>
                          )}
                          {usage.showcases > 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {usage.showcases} showcase{usage.showcases !== 1 ? 's' : ''}
                            </Badge>
                          )}
                          {totalUsage === 0 && (
                            <span className="text-xs text-muted-foreground">Não usado</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <CategoryFormDialog 
                            category={category}
                            trigger={
                              <Button variant="ghost" size="sm" title="Editar categoria">
                                <Edit className="h-4 w-4" />
                              </Button>
                            }
                          />
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setCategoryToDelete({ id: category.id, name: category.name })}
                            disabled={totalUsage > 0}
                            title={totalUsage > 0 ? "Esta categoria está em uso" : "Excluir categoria"}
                          >
                            <Trash2 className={`h-4 w-4 ${totalUsage > 0 ? 'text-muted-foreground' : 'text-destructive'}`} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={!!categoryToDelete} onOpenChange={() => setCategoryToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Excluir Categoria
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir a categoria <strong>{categoryToDelete?.name}</strong>?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="bg-destructive hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Excluindo...
                </>
              ) : (
                'Excluir'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CategoriesManagementTable;
