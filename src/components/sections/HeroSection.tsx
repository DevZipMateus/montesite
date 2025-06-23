
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Loader2 } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import { useHeroImages } from '@/hooks/useHeroImages';

interface HeroSectionProps {
  scrollToTemplates: (e: React.MouseEvent) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  scrollToTemplates
}) => {
  const { heroImages, isLoading, isEmpty } = useHeroImages();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Update interval based on number of images (minimum 4 seconds, maximum 6 seconds)
  const intervalDuration = heroImages.length > 0 
    ? Math.max(4000, Math.min(6000, heroImages.length * 800))
    : 5000;

  useEffect(() => {
    if (heroImages.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % heroImages.length);
    }, intervalDuration);
    
    return () => clearInterval(interval);
  }, [heroImages.length, intervalDuration]);

  // Reset index if it's out of bounds after data loads
  useEffect(() => {
    if (currentImageIndex >= heroImages.length && heroImages.length > 0) {
      setCurrentImageIndex(0);
    }
  }, [heroImages.length, currentImageIndex]);

  return (
    <section 
      id="home" 
      className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden" 
      style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4ecfb 100%)'
      }}
    >
      <div className="absolute inset-0 overflow-hidden py-0">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 px-8 md:px-12">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <FadeIn direction="left">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
                Lançamento de Templates Profissionais
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Crie Seu Site Institucional com Nossos Templates
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                Templates profissionais, personalizáveis e com design moderno para elevar o seu negócio. Implantação rápida e suporte especializado.
              </p>
              <div className="flex flex-wrap gap-6">
                <Button size="lg" className="rounded-full btn-hover-effect text-lg bg-gradient-to-r from-primary to-indigo-500 hover:from-indigo-500 hover:to-primary transition-all duration-300 px-8 py-6" asChild>
                  <a href="#templates">Escolher Template</a>
                </Button>
              </div>
            </FadeIn>
          </div>
          
          <div className="flex-1 mt-4 md:mt-0">
            <FadeIn direction="right" delay={200}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-indigo-300/20 to-primary/10 rounded-xl blur-xl"></div>
                
                <div className="relative overflow-hidden rounded-xl border border-white shadow-2xl bg-white min-h-[300px] flex items-center justify-center">
                  {isLoading ? (
                    <div className="flex flex-col items-center gap-3 py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">Carregando templates...</span>
                    </div>
                  ) : isEmpty ? (
                    <div className="flex flex-col items-center gap-3 py-12 text-center px-4">
                      <p className="text-sm text-muted-foreground">
                        Nenhuma imagem disponível no momento
                      </p>
                    </div>
                  ) : (
                    <>
                      {heroImages.map((image, index) => (
                        <div key={image.id} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}>
                          <img 
                            src={image.url} 
                            alt={`${image.title} - ${image.type === 'template' ? 'Template' : 'Site em destaque'}`}
                            className="w-full h-full object-contain"
                            loading={index === 0 ? 'eager' : 'lazy'}
                          />
                          
                          {/* Tooltip with image info */}
                          <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg text-xs backdrop-blur-sm">
                            <span className="font-medium">{image.title}</span>
                            <span className="ml-2 opacity-75">
                              {image.type === 'template' ? '📄 Template' : '⭐ Em destaque'}
                            </span>
                          </div>
                        </div>
                      ))}
                      
                      {/* Image placeholder for sizing */}
                      {heroImages.length > 0 && (
                        <img 
                          src={heroImages[currentImageIndex]?.url} 
                          alt="Sizing placeholder" 
                          className="invisible w-full object-contain max-h-[400px]" 
                        />
                      )}
                      
                      {/* Navigation dots */}
                      {heroImages.length > 1 && (
                        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
                          {heroImages.map((_, index) => (
                            <button 
                              key={index} 
                              onClick={() => setCurrentImageIndex(index)} 
                              className={`transition-all duration-200 rounded-full ${
                                index === currentImageIndex 
                                  ? 'bg-primary w-4 h-2' 
                                  : 'bg-gray-300 hover:bg-gray-400 w-2 h-2'
                              }`}
                              aria-label={`Ver ${heroImages[index]?.title}`}
                              title={`${heroImages[index]?.title} - ${heroImages[index]?.type === 'template' ? 'Template' : 'Site em destaque'}`}
                            />
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
        
        <div className="flex justify-center mt-10">
          <a href="#templates" onClick={scrollToTemplates} className="animate-float flex flex-col items-center text-sm text-muted-foreground hover:text-primary transition-colors">
            <span className="mb-2">Role para ver os templates</span>
            <ChevronDown className="animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
