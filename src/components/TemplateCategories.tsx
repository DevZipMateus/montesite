
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
        <TabsList className="w-full max-w-full mx-auto bg-muted/50 p-1.5 rounded-lg md:rounded-full flex flex-wrap md:flex-nowrap gap-1 md:gap-0 h-auto md:h-auto">
          {categories.map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="flex items-center gap-2 px-3 py-2 md:px-5 md:py-2.5 rounded-md md:rounded-full text-xs md:text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm flex-1 md:flex-initial min-w-0"
            >
              <span className="hidden sm:inline-block">
                {renderIcon(category.icon)}
              </span>
              <span className="truncate">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TemplateCategories;
