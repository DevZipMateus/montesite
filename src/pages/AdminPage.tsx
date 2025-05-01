
import React from 'react';
import Header from '@/components/Header';
import SeedDataButton from '@/components/admin/SeedDataButton';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const AdminPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid gap-6">
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
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
