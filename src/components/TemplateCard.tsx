import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { AspectRatio } from '@/components/ui/aspect-ratio';

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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { toast } = useToast();
  
  console.log(`TemplateCard rendering: ${title} with image: ${imageUrl}`);
  
  const fallbackImageUrl = '/placeholder.svg';
  
  const handleImageError = () => {
    console.error(`Image failed to load: ${imageUrl} for template: ${title}`);
    setImageError(true);
    
    // Show toast notification
    toast({
      title: "Erro ao carregar imagem",
      description: `Não foi possível carregar a imagem para o template ${title}`,
      variant: "destructive",
    });
  };
  
  const handleImageLoad = () => {
    console.log(`Image loaded successfully: ${imageUrl}`);
    setImageLoaded(true);
  };
  
  // Determine the image source - if the URL is a placeholder, use it directly
  // otherwise attempt to load the actual image with error handling
  const isPlaceholder = imageUrl === '/placeholder.svg';
  const displayImageUrl = isPlaceholder ? imageUrl : (imageError ? fallbackImageUrl : imageUrl);
  
  return (
    <Card className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="relative overflow-hidden bg-gray-100">
        <AspectRatio ratio={16/9}>
          <img 
            id={`template-image-${id}`}
            src={displayImageUrl}
            alt={`Preview of ${title} template`}
            className="w-full h-full object-cover transition-opacity"
            style={{ opacity: imageLoaded || isPlaceholder ? 1 : 0 }}
            onLoad={!isPlaceholder ? handleImageLoad : undefined}
            onError={!isPlaceholder ? handleImageError : undefined}
          />
        </AspectRatio>
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
