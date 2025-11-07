import React, { useState, useMemo } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X, LayoutTemplate } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconPickerProps {
  value?: string;
  onChange: (iconName: string) => void;
  onClear: () => void;
}

// Lista curada de ícones populares para categorias de negócios
const POPULAR_ICONS = [
  'Calculator', 'Scale', 'Heart', 'Stethoscope', 'Home', 'Building2',
  'ShoppingCart', 'Store', 'Shirt', 'Pizza', 'Coffee', 'Utensils',
  'Car', 'Wrench', 'Hammer', 'Paintbrush', 'Music', 'Camera',
  'Book', 'GraduationCap', 'Briefcase', 'Laptop', 'Smartphone', 'Cpu',
  'Leaf', 'Trees', 'Flower', 'Dog', 'Cat', 'Paw',
  'Plane', 'Ship', 'Train', 'Bike', 'Dumbbell', 'Trophy',
  'Palette', 'Scissors', 'Glasses', 'Watch', 'Gem', 'Crown',
  'Church', 'Cross', 'Star', 'Sun', 'Moon', 'Sparkles',
  'Shield', 'Lock', 'Key', 'Bell', 'Phone', 'Mail',
  'Users', 'User', 'Baby', 'HeartPulse', 'Pill', 'Syringe',
  'Banknote', 'Receipt', 'CreditCard', 'Wallet', 'PiggyBank', 'TrendingUp',
  'FileText', 'Folder', 'Archive', 'Package', 'Box', 'Gift',
  'Map', 'MapPin', 'Globe', 'Compass', 'Navigation', 'Anchor'
];

export const IconPicker: React.FC<IconPickerProps> = ({ value, onChange, onClear }) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrar ícones baseado na busca
  const filteredIcons = useMemo(() => {
    if (!searchQuery) return POPULAR_ICONS;
    return POPULAR_ICONS.filter(iconName => 
      iconName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Obter o componente de ícone do Lucide
  const getIconComponent = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent || LucideIcons.LayoutTemplate;
  };

  // Renderizar o ícone atual
  const CurrentIcon = value ? getIconComponent(value) : LayoutTemplate;

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        {/* Popover com grid de ícones */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="flex-1 justify-start gap-2 h-10"
            >
              <CurrentIcon className="h-4 w-4" />
              <span className="text-sm">
                {value ? value : 'Selecione um ícone'}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            className="w-[400px] p-0" 
            align="start"
            onCloseAutoFocus={() => setSearchQuery('')}
          >
            {/* Campo de busca */}
            <div className="p-3 border-b bg-muted/30">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar ícone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-9 h-9"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Grid de ícones */}
            <div 
              className="max-h-[320px] overflow-y-auto p-3"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'hsl(var(--muted-foreground)) hsl(var(--muted))'
              }}
            >
              {filteredIcons.length > 0 ? (
                <div className="grid grid-cols-8 gap-1">
                  {filteredIcons.map((iconName) => {
                    const Icon = getIconComponent(iconName);
                    const isSelected = value === iconName;
                    
                    return (
                      <button
                        key={iconName}
                        type="button"
                        onClick={() => {
                          onChange(iconName);
                          setOpen(false);
                          setSearchQuery('');
                        }}
                        className={cn(
                          "flex items-center justify-center p-2 rounded hover:bg-accent transition-colors",
                          "focus:outline-none focus:ring-2 focus:ring-ring",
                          isSelected && "bg-accent ring-2 ring-ring"
                        )}
                        title={iconName}
                      >
                        <Icon className="h-5 w-5" />
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center text-sm text-muted-foreground">
                  <Search className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p>Nenhum ícone encontrado</p>
                  <p className="text-xs mt-1">Tente outro termo</p>
                </div>
              )}
            </div>

            {/* Footer com contador */}
            <div className="border-t px-3 py-2 text-xs text-muted-foreground bg-muted/30">
              {searchQuery ? (
                <span>{filteredIcons.length} de {POPULAR_ICONS.length} ícones</span>
              ) : (
                <span>{POPULAR_ICONS.length} ícones disponíveis</span>
              )}
            </div>
          </PopoverContent>
        </Popover>

        {/* Botão para limpar */}
        {value && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onClear}
            title="Remover ícone"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Preview do ícone selecionado */}
      {value && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CurrentIcon className="h-3 w-3" />
          <span>Ícone selecionado: <strong>{value}</strong></span>
        </div>
      )}
    </div>
  );
};
