
import { useQuery } from '@tanstack/react-query';
import { fetchTemplates } from '@/services/templates';
import { fetchShowcases } from '@/services/showcaseService';

export interface HeroImage {
  id: string;
  url: string;
  title: string;
  type: 'template' | 'showcase';
}

export const useHeroImages = () => {
  const { data: templates = [], isLoading: isLoadingTemplates } = useQuery({
    queryKey: ['hero-templates'],
    queryFn: () => fetchTemplates(),
  });

  const { data: showcases = [], isLoading: isLoadingShowcases } = useQuery({
    queryKey: ['hero-showcases'],
    queryFn: () => fetchShowcases(undefined, true), // Only featured showcases
  });

  const isLoading = isLoadingTemplates || isLoadingShowcases;

  const heroImages: HeroImage[] = [
    // Add active templates
    ...templates
      .filter(template => template.status === 'active' && template.image_url)
      .map(template => ({
        id: template.id,
        url: template.image_url,
        title: template.title,
        type: 'template' as const,
      })),
    
    // Add featured showcases
    ...showcases
      .filter(showcase => showcase.image_url)
      .map(showcase => ({
        id: showcase.id,
        url: showcase.image_url,
        title: showcase.client_name,
        type: 'showcase' as const,
      })),
  ];

  return {
    heroImages,
    isLoading,
    isEmpty: heroImages.length === 0,
  };
};
