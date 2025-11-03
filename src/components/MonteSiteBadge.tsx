import { useEffect, useState } from 'react';

export const MonteSiteBadge = () => {
  const [badgeHtml, setBadgeHtml] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBadge = async () => {
      try {
        const response = await fetch('https://vaabpicspdbolvutnscp.supabase.co/functions/v1/get-footer-iframe');
        const scriptText = await response.text();
        
        // Criar um elemento temporário para executar o script
        const tempDiv = document.createElement('div');
        tempDiv.id = 'montesite-footer-badge';
        tempDiv.style.display = 'none';
        document.body.appendChild(tempDiv);
        
        // Executar o script
        const scriptFunc = new Function(scriptText);
        scriptFunc();
        
        // Aguardar um momento para o script popular o conteúdo
        setTimeout(() => {
          const content = tempDiv.innerHTML;
          if (content) {
            setBadgeHtml(content);
          }
          document.body.removeChild(tempDiv);
          setLoading(false);
        }, 100);
        
      } catch (error) {
        console.error('Erro ao carregar MonteSite badge:', error);
        setLoading(false);
      }
    };

    loadBadge();
  }, []);

  if (loading || !badgeHtml) return null;

  return (
    <div 
      className="mt-6 pt-6 border-t border-border text-center"
      dangerouslySetInnerHTML={{ __html: badgeHtml }}
    />
  );
};
