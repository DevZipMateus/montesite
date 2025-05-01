
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
        
        <Tabs defaultValue="data-management" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="data-management">Gestão de Dados</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="showcases">Vitrine de Sites</TabsTrigger>
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
