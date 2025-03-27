
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Eye } from 'lucide-react';

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
      className="overflow-hidden rounded-xl border border-gray-100 bg-white h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
        <AspectRatio ratio={16/8}>
          <div className="relative">
            <div className={`absolute -inset-4 bg-gradient-to-r from-primary/20 via-indigo-200/30 to-primary/10 rounded-xl blur-xl transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-50'}`}></div>
            <img 
              id={`template-image-${id}`}
              src={imageUrl}
              alt={`Preview of ${title} template`}
              className={`relative w-full h-full object-contain z-10 p-2 transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
            />
          </div>
        </AspectRatio>
        
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 transition-colors duration-300 group-hover:text-primary">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full text-xs h-8 px-3 transition-all duration-300 border-primary/30 text-primary hover:bg-primary/10 hover:text-primary hover:border-primary group"
                asChild
              >
                <a href={`#template-${id}`} onClick={(e) => e.preventDefault()}>
                  <Eye className="h-3.5 w-3.5 mr-1 transition-transform group-hover:scale-110" />
                  <span>Visualizar</span>
                </a>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="p-0 bg-transparent shadow-none border-none">
              {/* Tooltip content removido */}
            </HoverCardContent>
          </HoverCard>
          
          <Button 
            size="sm"
            className="rounded-full text-xs h-8 px-3 btn-hover-effect bg-gradient-to-r from-primary to-indigo-500 hover:from-indigo-500 hover:to-primary"
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
