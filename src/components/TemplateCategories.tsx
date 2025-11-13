
import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LayoutTemplate, ChevronDown, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TemplateCategory = {
  id: string;
  name: string;
  icon?: string | React.ReactNode;
};

interface TemplateCategoriesProps {
  categories: TemplateCategory[];
  activeCategory: string;
  onChange: (categoryId: string) => void;
}

const TemplateCategories: React.FC<TemplateCategoriesProps> = ({
  categories,
  activeCategory,
  onChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Parse icon string or use provided ReactNode
  const renderIcon = (icon?: string | React.ReactNode) => {
    if (!icon) return <LayoutTemplate className="h-4 w-4" />;
    
    // Se for ReactNode, retorna diretamente
    if (typeof icon !== 'string') {
      return icon;
    }
    
    // Remover prefixo "lucide:" se existir
    let iconName = icon;
    if (icon.startsWith('lucide:')) {
      iconName = icon.split(':')[1];
    }
    
    // Se for string, buscar no Lucide Icons
    const IconComponent = (LucideIcons as any)[iconName];
    
    if (IconComponent && typeof IconComponent === 'function') {
      return <IconComponent className="h-4 w-4" />;
    }
    
    // Fallback para ícone padrão
    return <LayoutTemplate className="h-4 w-4" />;
  };

  // Encontrar a categoria ativa
  const activecat = categories.find(cat => cat.id === activeCategory);
  
  // Filtrar categorias baseado na busca
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="inline-block">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="default" 
            className="flex items-center gap-3 bg-background hover:bg-accent min-w-[200px] justify-between shadow-sm"
          >
            <div className="flex items-center gap-2">
              {activecat && renderIcon(activecat.icon)}
              <span className="font-medium text-sm">{activecat?.name || 'Categoria'}</span>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="center" 
            className="w-[400px] bg-background shadow-lg border z-[100] p-0"
            onCloseAutoFocus={() => setSearchQuery('')}
            sideOffset={8}
            collisionPadding={10}
          >
            {/* Campo de busca fixo */}
            <div className="sticky top-0 bg-background border-b p-3 z-10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar categoria..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-9 h-10 text-sm bg-background"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Lista com scroll */}
            <div 
              className="max-h-[400px] overflow-y-auto overflow-x-hidden"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'hsl(var(--muted-foreground) / 0.3) transparent'
              }}
            >
              <div className="p-1">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <DropdownMenuItem
                      key={category.id}
                      onClick={() => {
                        onChange(category.id);
                        setSearchQuery('');
                      }}
                      className={cn(
                        "flex items-center gap-3 cursor-pointer hover:bg-accent py-3 px-3 transition-colors rounded-md",
                        activeCategory === category.id && "bg-accent font-medium"
                      )}
                    >
                      <span className="flex-shrink-0">
                        {renderIcon(category.icon)}
                      </span>
                      <span className="truncate">{category.name}</span>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <div className="p-8 text-center text-sm text-muted-foreground">
                    <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Nenhuma categoria encontrada</p>
                    <p className="text-xs mt-1">Tente buscar por outro termo</p>
                  </div>
                )}
              </div>
            </div>

            {/* Contador de resultados no footer */}
            {searchQuery && (
              <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t px-3 py-2 text-xs text-muted-foreground text-center">
                {filteredCategories.length} de {categories.length} categorias
              </div>
            )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TemplateCategories;
