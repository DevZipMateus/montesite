
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { LayoutTemplate, ChevronDown } from 'lucide-react';
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

  const CategoryButton: React.FC<{ category: TemplateCategory; isActive: boolean }> = ({ category, isActive }) => (
    <button
      onClick={() => onChange(category.id)}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
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

  return (
    <div className="mb-12">
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
        </ScrollArea>
        
        {/* Dropdown for overflow categories */}
        {overflowCategories.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                Mais
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {overflowCategories.map((category) => (
                <DropdownMenuItem
                  key={category.id}
                  onClick={() => onChange(category.id)}
                  className={cn(
                    "flex items-center gap-2 cursor-pointer",
                    activeCategory === category.id && "bg-accent"
                  )}
                >
                  <span className="flex-shrink-0">
                    {renderIcon(category.icon)}
                  </span>
                  <span>{category.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Mobile version with scrollable area */}
      <div className="md:hidden bg-muted/50 p-2 rounded-lg">
        <ScrollArea className="h-20">
          <div className="flex items-center gap-2 px-2">
            {categories.map((category) => (
              <CategoryButton
                key={category.id}
                category={category}
                isActive={activeCategory === category.id}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default TemplateCategories;
