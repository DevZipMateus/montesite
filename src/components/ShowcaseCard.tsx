
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ExternalLink } from 'lucide-react';
import { Showcase } from '@/types/database';

type ShowcaseCardProps = Pick<Showcase, 'id' | 'client_name' | 'image_url' | 'site_url' | 'description'>;

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({
  id,
  client_name,
  description,
  image_url,
  site_url
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className="overflow-hidden rounded-xl border border-gray-100 bg-white h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-indigo-50">
        <AspectRatio ratio={16/9}>
          <div className="relative">
            <div className={`absolute -inset-4 bg-gradient-to-r from-primary/20 via-indigo-200/30 to-primary/10 rounded-xl blur-xl transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-50'}`}></div>
            <img 
              id={`showcase-image-${id}`}
              src={image_url}
              alt={`Screenshot of ${client_name} website`}
              className={`relative w-full h-full object-cover z-10 p-3 transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
            />
          </div>
        </AspectRatio>
        
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2 transition-colors duration-300 group-hover:text-primary">{client_name}</h3>
        {description && <p className="text-muted-foreground text-sm mb-6 line-clamp-2">{description}</p>}
        
        <div className="flex justify-end items-center">
          <Button 
            size="sm"
            className="rounded-full text-xs h-9 px-4 btn-hover-effect bg-gradient-to-r from-primary to-indigo-500 hover:from-indigo-500 hover:to-primary"
            asChild
          >
            <a href={site_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
              Visitar Site
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ShowcaseCard;
