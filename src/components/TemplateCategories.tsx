
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutTemplate } from 'lucide-react';

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

  return (
    <div className="mb-12">
      <Tabs 
        defaultValue={activeCategory} 
        value={activeCategory}
        onValueChange={onChange}
        className="w-full"
      >
        <TabsList className="w-full bg-muted/50 p-1 rounded-lg grid grid-cols-2 sm:grid-cols-3 md:flex md:justify-center gap-1">
          {categories.map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm hover:bg-white/50"
            >
              <span className="hidden sm:inline-block flex-shrink-0">
                {renderIcon(category.icon)}
              </span>
              <span className="truncate text-center">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TemplateCategories;
