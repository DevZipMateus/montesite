
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';

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
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className="overflow-hidden rounded-xl border border-gray-200 bg-white h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden bg-gray-100">
        <AspectRatio ratio={16/8}>
          <div className="relative">
            <div className={`absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl blur-xl transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-50'}`}></div>
            <img 
              id={`template-image-${id}`}
              src={imageUrl}
              alt={`Preview of ${title} template`}
              className={`relative w-full h-full object-contain z-10 p-1 transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
            />
          </div>
        </AspectRatio>
      </div>
      
      <div className="p-3">
        <h3 className="text-sm font-semibold mb-0.5 transition-colors duration-300">{title}</h3>
        <p className="text-muted-foreground text-xs mb-2 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-xs h-7 px-2.5 transition-colors duration-300 hover:text-primary hover:border-primary"
                asChild
              >
                <a href={`#template-${id}`} onClick={(e) => e.preventDefault()}>
                  Visualizar
                </a>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="p-2">
              <p className="text-xs">Visualize os detalhes deste template</p>
            </HoverCardContent>
          </HoverCard>
          
          <Button 
            size="sm"
            className="rounded-full text-xs h-7 px-2.5 btn-hover-effect"
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
