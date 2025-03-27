import React, { useEffect, useState } from 'react';
import FadeIn from '@/components/animations/FadeIn';
import { Button } from '@/components/ui/button';
import TemplateCard from '@/components/TemplateCard';
import TemplateCategories, { TemplateCategory } from '@/components/TemplateCategories';
interface Template {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  formUrl: string;
  previewUrl: string; // Added this property to match TemplateCard's props
  category: string;
}
interface TemplatesSectionProps {
  templates: Template[];
  categories: TemplateCategory[];
}
const TemplatesSection: React.FC<TemplatesSectionProps> = ({
  templates,
  categories
}) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredTemplates, setFilteredTemplates] = useState(templates);
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredTemplates(templates);
    } else {
      setFilteredTemplates(templates.filter(template => template.category === activeCategory));
    }
  }, [activeCategory, templates]);
  return <section id="templates" className="py-14 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Escolha o Template Ideal
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore nossa galeria de templates premium para diversos segmentos de mercado.
          </p>
        </FadeIn>
        
        <FadeIn delay={100}>
          <TemplateCategories categories={categories} activeCategory={activeCategory} onChange={setActiveCategory} />
        </FadeIn>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template, index) => <FadeIn key={template.id} delay={index * 100}>
              <TemplateCard {...template} />
            </FadeIn>)}
        </div>
        
        <FadeIn className="mt-10 text-center">
          
          <Button variant="outline" className="rounded-full" asChild>
            
          </Button>
        </FadeIn>
      </div>
    </section>;
};
export default TemplatesSection;