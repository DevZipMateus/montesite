
import React, { useState } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LayoutTemplate, ChevronDown, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
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
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Parse icon string or use provided ReactNode
  const renderIcon = (icon?: string | React.ReactNode) => {
    if (!icon) return <LayoutTemplate className="h-4 w-4" />;
    
    if (typeof icon === 'string') {
      try {
        // If it's a Lucide icon name (assuming format is 'lucide:IconName')
        if (icon.startsWith('lucide:')) {
          const iconName = icon.split(':')[1];
          // This is a simplified approach, in a real app you'd import and use dynamic icons
          return <LayoutTemplate className="h-4 w-4" />;
        }
        
        // If it's an SVG string or URL
        return <span className="h-4 w-4" dangerouslySetInnerHTML={{ __html: icon }} />;
      } catch (e) {
        return <LayoutTemplate className="h-4 w-4" />;
      }
    }
    
    // It's a ReactNode
    return icon;
  };

  // For desktop: show first 5 categories directly, rest in dropdown
  const maxVisibleCategories = 5;
  const visibleCategories = categories.slice(0, maxVisibleCategories);
  const overflowCategories = categories.slice(maxVisibleCategories);
  
  // Filter overflow categories based on search query
  const filteredOverflowCategories = overflowCategories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const CategoryButton: React.FC<{ category: TemplateCategory; isActive: boolean }> = ({ category, isActive }) => (
    <button
      onClick={() => onChange(category.id)}
      className={cn(
        "flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-shrink-0",
        isActive
          ? "bg-white text-foreground shadow-sm"
          : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
      )}
    >
      <span className="hidden sm:inline-block flex-shrink-0">
        {renderIcon(category.icon)}
      </span>
      <span className="truncate">{category.name}</span>
    </button>
  );

  const handleScroll = () => {
    if (showScrollHint) {
      setShowScrollHint(false);
    }
  };

  return (
    <div className="mb-8 sm:mb-12">
      {/* Desktop version with scrollable area and dropdown */}
      <div className="hidden md:flex items-center gap-2 bg-muted/50 p-2 rounded-lg">
        <ScrollArea className="flex-1">
          <div className="flex items-center gap-2 px-2">
            {visibleCategories.map((category) => (
              <CategoryButton
                key={category.id}
                category={category}
                isActive={activeCategory === category.id}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        
        {/* Dropdown for overflow categories */}
        {overflowCategories.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-white hover:bg-gray-50">
                Mais ({overflowCategories.length})
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-72 bg-white shadow-lg border z-50 p-0"
              onCloseAutoFocus={() => setSearchQuery('')}
            >
              {/* Campo de busca fixo */}
              <div className="sticky top-0 bg-white border-b p-3 z-10">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Buscar categoria..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-9 h-9 text-sm"
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
              <ScrollArea className="max-h-[350px]">
                <div className="p-1">
                  {filteredOverflowCategories.length > 0 ? (
                    filteredOverflowCategories.map((category) => (
                      <DropdownMenuItem
                        key={category.id}
                        onClick={() => {
                          onChange(category.id);
                          setSearchQuery('');
                        }}
                        className={cn(
                          "flex items-center gap-2 cursor-pointer hover:bg-gray-100 py-2.5",
                          activeCategory === category.id && "bg-accent"
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
                <ScrollBar orientation="vertical" />
              </ScrollArea>

              {/* Contador de resultados no footer */}
              {searchQuery && (
                <div className="sticky bottom-0 bg-muted/50 border-t px-3 py-2 text-xs text-muted-foreground text-center">
                  {filteredOverflowCategories.length} de {overflowCategories.length} categorias
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Mobile version with improved scrollable area */}
      <div className="md:hidden">
        <div className="bg-muted/50 p-3 rounded-lg">
          {/* Scroll hint */}
          {showScrollHint && categories.length > 3 && (
            <div className="flex items-center justify-center gap-2 mb-2 text-xs text-muted-foreground">
              <ChevronLeft className="h-3 w-3" />
              <span>Deslize para ver mais categorias</span>
              <ChevronRight className="h-3 w-3" />
            </div>
          )}
          
          <ScrollArea className="h-32" onScroll={handleScroll}>
            <div className="flex items-start gap-2 px-2 pb-2">
              <div className="grid grid-cols-2 gap-2 w-full">
                {categories.map((category) => (
                  <CategoryButton
                    key={category.id}
                    category={category}
                    isActive={activeCategory === category.id}
                  />
                ))}
              </div>
            </div>
          </ScrollArea>
          
          {/* Visual scroll indicator */}
          <div className="flex justify-center mt-2">
            <div className="flex gap-1">
              {Array.from({ length: Math.ceil(categories.length / 6) }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-1 w-6 rounded-full transition-colors",
                    index === 0 ? "bg-primary" : "bg-muted-foreground/30"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateCategories;
