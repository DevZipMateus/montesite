
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Copy, ExternalLink, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const PublicUrlGenerator: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  // URL base que será usada em produção
  const baseUrl = 'https://montesite.com.br';
  const publicUrl = `${baseUrl}/vitrine-publica`;
  
  // URL para preview local
  const currentUrl = window.location.origin;
  const localPreviewUrl = `${currentUrl}/vitrine-publica`;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      toast({
        title: "URL copiada!",
        description: "A URL da vitrine pública foi copiada para a área de transferência.",
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar a URL. Tente selecionar e copiar manualmente.",
        variant: "destructive",
      });
    }
  };

  const handlePreview = () => {
    window.open(localPreviewUrl, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>URL Pública da Vitrine</CardTitle>
        <CardDescription>
          Gere e compartilhe a URL pública da vitrine com seus clientes. 
          Esta URL mostra apenas os sites da vitrine, sem acesso a outras páginas.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="public-url">URL de Produção</Label>
          <div className="flex gap-2">
            <Input
              id="public-url"
              value={publicUrl}
              readOnly
              className="font-mono text-sm"
            />
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleCopyUrl}
              className="flex-shrink-0"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Esta é a URL que será usada quando o site estiver em produção.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="preview-url">Preview Local</Label>
          <div className="flex gap-2">
            <Input
              id="preview-url"
              value={localPreviewUrl}
              readOnly
              className="font-mono text-sm"
            />
            <Button 
              variant="outline" 
              size="icon"
              onClick={handlePreview}
              className="flex-shrink-0"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Use esta URL para testar a vitrine pública localmente.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Como usar:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Copie a URL de produção e compartilhe com seus clientes</li>
            <li>• Os clientes verão apenas a vitrine de sites, sem acesso ao menu</li>
            <li>• Todos os filtros e funcionalidades da vitrine estarão disponíveis</li>
            <li>• Use o preview local para testar antes de compartilhar</li>
          </ul>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleCopyUrl} className="flex-1">
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copiar URL de Produção
              </>
            )}
          </Button>
          <Button variant="outline" onClick={handlePreview}>
            <ExternalLink className="h-4 w-4 mr-2" />
            Preview Local
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PublicUrlGenerator;
