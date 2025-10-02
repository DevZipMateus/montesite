import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Settings, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { fetchAdminTemplates } from '@/services/templates/templateFetchService';
import { 
  fetchAllIframeConfigs, 
  createIframeConfig, 
  updateIframeConfig, 
  deleteIframeConfig 
} from '@/services/templates/iframeConfigService';
import IframeConfigDialog from './IframeConfigDialog';
import { Template, IframeConfig } from '@/types/database';

const IframeConfigManager: React.FC = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: templates = [], isLoading: templatesLoading } = useQuery({
    queryKey: ['admin-templates'],
    queryFn: fetchAdminTemplates,
  });

  const { data: iframeConfigs = [], isLoading: configsLoading } = useQuery({
    queryKey: ['iframe-configs'],
    queryFn: fetchAllIframeConfigs,
  });

  const saveMutation = useMutation({
    mutationFn: async ({ 
      templateId, 
      iframeCode, 
      isActive, 
      configId 
    }: { 
      templateId: string; 
      iframeCode: string; 
      isActive: boolean; 
      configId?: string; 
    }) => {
      if (configId) {
        return updateIframeConfig(configId, { iframe_code: iframeCode, is_active: isActive });
      } else {
        return createIframeConfig({ template_id: templateId, iframe_code: iframeCode, is_active: isActive });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['iframe-configs'] });
      toast({
        title: 'Sucesso',
        description: 'Configuração de iframe salva com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro',
        description: 'Erro ao salvar configuração de iframe.',
        variant: 'destructive',
      });
      console.error(error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteIframeConfig,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['iframe-configs'] });
      toast({
        title: 'Sucesso',
        description: 'Configuração de iframe excluída com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro',
        description: 'Erro ao excluir configuração de iframe.',
        variant: 'destructive',
      });
      console.error(error);
    },
  });

  const handleConfigureTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setDialogOpen(true);
  };

  const handleSave = async (
    templateId: string, 
    iframeCode: string, 
    isActive: boolean, 
    configId?: string
  ) => {
    await saveMutation.mutateAsync({ templateId, iframeCode, isActive, configId });
  };

  const handleDelete = async (configId: string) => {
    if (confirm('Tem certeza que deseja excluir esta configuração de iframe?')) {
      await deleteMutation.mutateAsync(configId);
    }
  };

  const getConfigForTemplate = (templateId: string): IframeConfig | undefined => {
    return iframeConfigs.find(config => config.template_id === templateId);
  };

  if (templatesLoading || configsLoading) {
    return <div className="p-4">Carregando...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Template</TableHead>
              <TableHead>Status do iframe</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates.map((template) => {
              const config = getConfigForTemplate(template.id);
              return (
                <TableRow key={template.id}>
                  <TableCell className="font-medium">{template.title}</TableCell>
                  <TableCell>
                    {config ? (
                      <Badge variant={config.is_active ? 'default' : 'secondary'}>
                        {config.is_active ? 'Ativo' : 'Inativo'}
                      </Badge>
                    ) : (
                      <Badge variant="outline">Sem iframe</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleConfigureTemplate(template)}
                      >
                        <Settings className="h-4 w-4 mr-1" />
                        {config ? 'Editar' : 'Configurar'}
                      </Button>
                      {config && (
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(config.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {selectedTemplate && (
        <IframeConfigDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          template={selectedTemplate}
          existingConfig={getConfigForTemplate(selectedTemplate.id)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default IframeConfigManager;
