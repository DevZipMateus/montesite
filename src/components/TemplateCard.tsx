
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TemplateCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  formUrl: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  formUrl
}) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden rounded-xl border border-gray-200 transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1 bg-white"
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
        <img 
          src={imageUrl}
          alt={`Preview of ${title} template`}
          className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
        />
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full hover:bg-secondary text-xs"
            asChild
          >
            <a href={`#template-${id}`} onClick={(e) => e.preventDefault()}>
              Visualizar
            </a>
          </Button>
          
          <Button 
            className="btn-hover-effect rounded-full"
            asChild
          >
            <a href={formUrl} target="_blank" rel="noopener noreferrer">
              Personalizar Agora
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TemplateCard;
