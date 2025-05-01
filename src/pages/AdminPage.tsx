
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import SeedDataButton from '@/components/admin/SeedDataButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import AdminTemplatesTable from '@/components/admin/AdminTemplatesTable';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  
  const { data: session, isLoading: isLoadingSession } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      return data.session;
    },
  });

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoadingSession && !session) {
      navigate('/');
    }
  }, [session, isLoadingSession, navigate]);

  if (isLoadingSession) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2 text-muted-foreground">Verificando autenticação...</p>
      </div>
    );
  }

  // If not authenticated and not loading, don't render the admin content
  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <Tabs defaultValue="data-management" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="data-management">Gestão de Dados</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
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
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
