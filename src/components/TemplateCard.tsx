
import React, { useState } from 'react';
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
  const [imageError, setImageError] = useState(false);
  
  // Determinar se a imagem é uma URL externa ou um recurso local
  const isExternalUrl = imageUrl.startsWith('http');
  const imagePath = isExternalUrl ? imageUrl : `${window.location.origin}${imageUrl}`;
  
  console.log(`Loading image from: ${imagePath}`);
  
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
          id={`template-image-${id}`}
          src={imageError ? 'https://placehold.co/600x400/gray/white?text=Template+Image' : imagePath}
          alt={`Preview of ${title} template`}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          data-editable="image"
          data-editable-id={`template-image-${id}`}
          onError={(e) => {
            console.error(`Image failed to load: ${imageUrl}`);
            console.error(e);
            setImageError(true);
          }}
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
