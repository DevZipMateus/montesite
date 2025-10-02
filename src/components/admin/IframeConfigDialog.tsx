import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Template, IframeConfig } from '@/types/database';
import { Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface IframeConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: Template;
  existingConfig?: IframeConfig | null;
  onSave: (templateId: string, iframeCode: string, isActive: boolean, configId?: string) => Promise<void>;
}

const IframeConfigDialog: React.FC<IframeConfigDialogProps> = ({
  open,
  onOpenChange,
  template,
  existingConfig,
  onSave,
}) => {
  const { toast } = useToast();
  const [iframeCode, setIframeCode] = useState(existingConfig?.iframe_code || '');
  const [isActive, setIsActive] = useState(existingConfig?.is_active ?? true);
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);

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
    setIsSaving(true);
    try {
      await onSave(template.id, iframeCode, isActive, existingConfig?.id);
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
          <DialogTitle>Configurar iframe - {template.title}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
          <div className="space-y-4">
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
          <Button onClick={handleSave} disabled={isSaving || !iframeCode.trim()}>
            {isSaving ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IframeConfigDialog;
