
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
  category: string;
}

interface TemplatesSectionProps {
  templates: Template[];
  categories: TemplateCategory[];
}

const TemplatesSection: React.FC<TemplatesSectionProps> = ({ templates, categories }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredTemplates, setFilteredTemplates] = useState(templates);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredTemplates(templates);
    } else {
      setFilteredTemplates(templates.filter(template => template.category === activeCategory));
    }
  }, [activeCategory, templates]);

  return (
    <section id="templates" className="py-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Escolha o Template Ideal
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore nossa galeria de templates premium para diversos segmentos de mercado.
          </p>
        </FadeIn>
        
        <FadeIn delay={100}>
          <TemplateCategories 
            categories={categories} 
            activeCategory={activeCategory} 
            onChange={setActiveCategory} 
          />
        </FadeIn>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 md:gap-6">
          {filteredTemplates.map((template, index) => (
            <FadeIn key={template.id} delay={index * 100}>
              <TemplateCard {...template} />
            </FadeIn>
          ))}
        </div>
        
        <FadeIn className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Não encontrou o que precisava? Temos outras opções para seu negócio.
          </p>
          <Button 
            variant="outline" 
            className="rounded-full"
            asChild
          >
            <a href="#contato">Solicitar template personalizado</a>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
};

export default TemplatesSection;
