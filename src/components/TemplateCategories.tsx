
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutTemplate, Tag } from 'lucide-react';

export type TemplateCategory = {
  id: string;
  name: string;
  icon?: React.ReactNode;
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
  return (
    <div className="mb-8">
      <Tabs 
        defaultValue={activeCategory} 
        value={activeCategory}
        onValueChange={onChange}
        className="w-full"
      >
        <TabsList className="w-full max-w-md mx-auto bg-muted/50 p-1 rounded-full">
          {categories.map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="flex items-center gap-2 px-4 py-2 rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              {category.icon}
              <span>{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TemplateCategories;
