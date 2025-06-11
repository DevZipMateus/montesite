
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface HashLogEntry {
  id: string;
  partner_hash: string;
  client_name: string;
  telefone: string | null;
  cnpj: string | null;
  status: string | null;
  created_at: string;
  formulario_preenchido: boolean;
  modelo_escolhido: string | null;
}

const fetchHashLogs = async (): Promise<HashLogEntry[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select('id, partner_hash, client_name, telefone, cnpj, status, created_at, formulario_preenchido, modelo_escolhido')
    .not('partner_hash', 'is', null)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching hash logs:', error);
    throw error;
  }
  
  return data || [];
};

const getStatusColor = (status: string | null, formularioPreenchido: boolean): string => {
  if (!status) return 'secondary';
  
  switch (status.toLowerCase()) {
    case 'finalizado':
    case 'entregue':
      return 'default';
    case 'em andamento':
    case 'em desenvolvimento':
      return 'secondary';
    case 'pausado':
      return 'destructive';
    default:
      return formularioPreenchido ? 'secondary' : 'outline';
  }
};

const HashLogsTable: React.FC = () => {
  const { data: hashLogs = [], isLoading, error } = useQuery({
    queryKey: ['hash-logs'],
    queryFn: fetchHashLogs,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Carregando logs de hash...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Erro ao carregar logs de hash. Tente novamente.
      </div>
    );
  }

  if (hashLogs.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Nenhuma hash recebida ainda.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">
          Total de hash recebidas: {hashLogs.length}
        </h3>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hash</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>CNPJ</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Formulário</TableHead>
              <TableHead>Template</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hashLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-mono text-sm">
                  {log.partner_hash.substring(0, 8)}...
                </TableCell>
                <TableCell>{log.client_name}</TableCell>
                <TableCell>{log.telefone || '-'}</TableCell>
                <TableCell>{log.cnpj || '-'}</TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(log.status, log.formulario_preenchido) as any}>
                    {log.status || 'Pendente'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={log.formulario_preenchido ? 'default' : 'outline'}>
                    {log.formulario_preenchido ? 'Preenchido' : 'Pendente'}
                  </Badge>
                </TableCell>
                <TableCell>{log.modelo_escolhido || '-'}</TableCell>
                <TableCell>
                  {format(new Date(log.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default HashLogsTable;
