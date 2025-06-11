
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useHash } from '@/hooks/useHash';

const HashRouter: React.FC = () => {
  const { hash } = useParams<{ hash: string }>();
  const navigate = useNavigate();
  const { updateHash } = useHash();

  useEffect(() => {
    if (hash) {
      // Validar se é uma hash válida (32 caracteres hexadecimais)
      const isValidHash = /^[a-f0-9]{32}$/i.test(hash);
      
      if (isValidHash) {
        console.log('Hash válida capturada da URL:', hash);
        
        // Armazenar a hash
        updateHash(hash);
        
        // Redirecionar para a página inicial mantendo a hash como query parameter
        navigate(`/?hash=${hash}`, { replace: true });
      } else {
        console.log('Hash inválida na URL:', hash);
        // Redirecionar para página inicial sem hash
        navigate('/', { replace: true });
      }
    }
  }, [hash, navigate, updateHash]);

  // Componente de loading enquanto processa
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Processando...</p>
      </div>
    </div>
  );
};

export default HashRouter;
