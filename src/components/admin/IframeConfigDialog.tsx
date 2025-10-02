import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { IframeConfig } from '@/types/database';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface IframeConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  existingConfig?: IframeConfig | null;
  onSave: (name: string, iframeCode: string, isActive: boolean, isGlobalActive: boolean, configId?: string) => Promise<void>;
}

const IframeConfigDialog: React.FC<IframeConfigDialogProps> = ({
  open,
  onOpenChange,
  existingConfig,
  onSave,
}) => {
  const { toast } = useToast();
  const [name, setName] = useState(existingConfig?.name || '');
  const [iframeCode, setIframeCode] = useState(existingConfig?.iframe_code || '');
  const [isActive, setIsActive] = useState(existingConfig?.is_active ?? true);
  const [isGlobalActive, setIsGlobalActive] = useState(existingConfig?.is_global_active ?? false);
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (existingConfig) {
      setName(existingConfig.name || '');
      setIframeCode(existingConfig.iframe_code);
      setIsActive(existingConfig.is_active);
      setIsGlobalActive(existingConfig.is_global_active);
    } else {
      setName('');
      setIframeCode('');
      setIsActive(true);
      setIsGlobalActive(false);
    }
  }, [existingConfig, open]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(iframeCode);
      setCopied(true);
      toast({
        title: 'Código copiado!',
        description: 'O código do iframe foi copiado para a área de transferência.',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: 'Erro ao copiar',
        description: 'Não foi possível copiar o código.',
        variant: 'destructive',
      });
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast({
        title: 'Erro',
        description: 'Digite um nome para identificar este iframe.',
        variant: 'destructive',
      });
      return;
    }

    if (!iframeCode.trim()) {
      toast({
        title: 'Erro',
        description: 'Cole o código do iframe.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    try {
      await onSave(name, iframeCode, isActive, isGlobalActive, existingConfig?.id);
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving iframe config:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {existingConfig ? `Editar iframe - ${existingConfig.name}` : 'Adicionar novo iframe'}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="iframe-name">Nome do iframe</Label>
              <Input
                id="iframe-name"
                placeholder="Ex: Chat de Atendimento, Mapa, Vídeo..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Nome para identificar este iframe na lista
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="iframe-code">Código do iframe</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyCode}
                  disabled={!iframeCode.trim()}
                  className="h-8 px-2"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      Copiar
                    </>
                  )}
                </Button>
              </div>
              <Textarea
                id="iframe-code"
                placeholder='<iframe src="..." width="100%" height="400"></iframe>'
                value={iframeCode}
                onChange={(e) => setIframeCode(e.target.value)}
                className="font-mono text-sm min-h-[300px]"
              />
              <p className="text-xs text-muted-foreground">
                Cole o código HTML do iframe que deseja incorporar. Você pode obter este código de plataformas como YouTube, Vimeo, Google Maps, etc.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is-active"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
              <Label htmlFor="is-active">Ativo</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is-global-active"
                checked={isGlobalActive}
                onCheckedChange={setIsGlobalActive}
              />
              <Label htmlFor="is-global-active" className="font-semibold">
                Usar como rodapé global (atualizações automáticas)
              </Label>
            </div>

            {isGlobalActive && (
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950 p-4 space-y-2">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  📌 Rodapé Global Ativado
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Este iframe será usado como rodapé em todos os sites que incluírem o código de integração.
                  Apenas um iframe pode estar ativo globalmente por vez.
                </p>
                <div className="mt-3 p-3 bg-white dark:bg-gray-900 rounded border border-blue-200 dark:border-blue-800">
                  <p className="text-xs font-mono text-gray-600 dark:text-gray-400 mb-2">
                    Adicione este código no rodapé dos seus sites:
                  </p>
                  <code className="block text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
                    {`<div id="montesite-footer-badge"></div>\n<script src="https://vaabpicspdbolvutnscp.supabase.co/functions/v1/get-footer-iframe"></script>`}
                  </code>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Preview</Label>
            <div className="border rounded-lg p-4 bg-muted min-h-[300px]">
              {iframeCode ? (
                <div dangerouslySetInnerHTML={{ __html: iframeCode }} />
              ) : (
                <p className="text-muted-foreground text-sm">Cole o código do iframe para ver o preview</p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={isSaving || !iframeCode.trim() || !name.trim()}>
            {isSaving ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IframeConfigDialog;
