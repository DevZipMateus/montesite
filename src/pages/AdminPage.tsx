
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from '@/components/Header';
import SeedDataButton from '@/components/admin/SeedDataButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import AdminTemplatesTable from '@/components/admin/AdminTemplatesTable';
import AdminShowcasesTable from '@/components/admin/AdminShowcasesTable';

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
      description: 'Você foi desconectado com sucesso.',
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
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
        
        <Tabs defaultValue="data-management" className="w-full">
          <TabsList className="mb-6 w-full overflow-x-auto flex flex-wrap">
            <TabsTrigger value="data-management" className="flex-grow md:flex-grow-0">Gestão de Dados</TabsTrigger>
            <TabsTrigger value="templates" className="flex-grow md:flex-grow-0">Templates</TabsTrigger>
            <TabsTrigger value="showcases" className="flex-grow md:flex-grow-0">Vitrine de Sites</TabsTrigger>
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
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
