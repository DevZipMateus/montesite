
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
  
  // Simplified image path handling - use exactly what's provided
  const imagePath = imageUrl;
  
  return (
    <Card 
      className="overflow-hidden rounded-xl border border-gray-200 bg-white"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img 
          id={`template-image-${id}`}
          src={imageError ? 'https://placehold.co/600x400/gray/white?text=Template+Image' : imagePath}
          alt={`Preview of ${title} template`}
          className="w-full h-full object-cover"
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
            className="rounded-full text-xs"
            asChild
          >
            <a href={`#template-${id}`} onClick={(e) => e.preventDefault()}>
              Visualizar
            </a>
          </Button>
          
          <Button 
            className="rounded-full"
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
