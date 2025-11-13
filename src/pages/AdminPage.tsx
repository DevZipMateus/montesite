
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from '@/components/Header';
import SeedDataButton from '@/components/admin/SeedDataButton';
import AutoIconAssigner from '@/components/admin/AutoIconAssigner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import AdminTemplatesTable from '@/components/admin/AdminTemplatesTable';
import AdminShowcasesTable from '@/components/admin/AdminShowcasesTable';
import CategoriesManagementTable from '@/components/admin/CategoriesManagementTable';
import HashLogsTable from '@/components/admin/HashLogsTable';
import PublicUrlGenerator from '@/components/admin/PublicUrlGenerator';
import IframeConfigManager from '@/components/admin/IframeConfigManager';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    // Remove login state from localStorage
    localStorage.removeItem('admin_logged_in');

    // Show success toast
    toast({
      title: 'Logout realizado',
      description: 'Você foi desconectado com sucesso.'
    });

    // Redirect to home page
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto py-6 px-4 md:px-6 lg:py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 py-0 my-[25px]">
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
        
        <Tabs defaultValue="data-management" className="w-full">
          <TabsList className="mb-6 w-full overflow-x-auto flex flex-wrap">
            <TabsTrigger value="data-management" className="flex-grow md:flex-grow-0">Gestão de Dados</TabsTrigger>
            <TabsTrigger value="templates" className="flex-grow md:flex-grow-0">Templates</TabsTrigger>
            <TabsTrigger value="iframe-config" className="flex-grow md:flex-grow-0">Configuração de iframes</TabsTrigger>
            <TabsTrigger value="showcases" className="flex-grow md:flex-grow-0">Vitrine de Sites</TabsTrigger>
            <TabsTrigger value="categories" className="flex-grow md:flex-grow-0">Categorias</TabsTrigger>
            <TabsTrigger value="public-url" className="flex-grow md:flex-grow-0">URL Pública</TabsTrigger>
            <TabsTrigger value="hash-logs" className="flex-grow md:flex-grow-0">Logs de Hash</TabsTrigger>
          </TabsList>
          
          <TabsContent value="data-management">
            <Card>
              <CardHeader>
                <CardTitle>Gestão de dados</CardTitle>
                <CardDescription>
                  Use esta seção para adicionar ou atualizar os dados da aplicação.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Carregar dados iniciais</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Clique no botão abaixo para carregar os templates, categorias e cases de exemplo.
                      Esta ação irá adicionar os dados ao banco de dados Supabase.
                    </p>
                    <SeedDataButton />
                  </div>
                  <div className="pt-6 border-t">
                    <AutoIconAssigner />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Templates</CardTitle>
                <CardDescription>
                  Visualize e gerencie todos os templates disponíveis na plataforma.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdminTemplatesTable />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="iframe-config">
            <Card>
              <CardHeader>
                <CardTitle>Configuração de iframes</CardTitle>
                <CardDescription>
                  Configure códigos de iframe para cada template. Quando configurado, o iframe será exibido no lugar da imagem estática do template.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <IframeConfigManager />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="showcases">
            <Card>
              <CardHeader>
                <CardTitle>Vitrine de Sites</CardTitle>
                <CardDescription>
                  Visualize e gerencie os sites disponíveis na vitrine.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdminShowcasesTable />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciamento de Categorias</CardTitle>
                <CardDescription>
                  Edite ou exclua categorias existentes. Categorias em uso não podem ser excluídas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CategoriesManagementTable />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="public-url">
            <PublicUrlGenerator />
          </TabsContent>
          
          <TabsContent value="hash-logs">
            <Card>
              <CardHeader>
                <CardTitle>Logs de Hash</CardTitle>
                <CardDescription>
                  Monitore todas as hash recebidas e o status dos projetos associados.
                  Use esta seção para acompanhar o tráfego de parceiros e identificar problemas de integração.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <HashLogsTable />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
