
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

interface HeroSectionProps {
  scrollToTemplates: (e: React.MouseEvent) => void;
}

const TEMPLATE_IMAGES = [
  "/imagens/contabilidade-harmonica.png", 
  "/imagens/contabilidade-template.png", 
  "/imagens/easy-financial-solutions.png", 
  "/imagens/conta-connection-hub.png", 
  "/imagens/contador-simplicity.png", 
  "/imagens/contabilify-modern-site.png"
];

const HeroSection: React.FC<HeroSectionProps> = ({
  scrollToTemplates
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % TEMPLATE_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="home" 
      className="pt-40 pb-28 md:pt-48 md:pb-36 relative overflow-hidden" 
      style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4ecfb 100%)'
      }}
    >
      <div className="absolute inset-0 overflow-hidden py-0">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 px-8 md:px-12">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <FadeIn direction="left">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-8">
                Lançamento de Templates Profissionais
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
                Crie Seu Site Institucional com Nossos Templates
              </h1>
              <p className="text-lg text-muted-foreground mb-10 max-w-xl">
                Templates profissionais, personalizáveis e com design moderno para elevar o seu negócio. Implantação rápida e suporte especializado.
              </p>
              <div className="flex flex-wrap gap-6">
                <Button size="lg" className="rounded-full btn-hover-effect text-lg bg-gradient-to-r from-primary to-indigo-500 hover:from-indigo-500 hover:to-primary transition-all duration-300 px-8 py-6" asChild>
                  <a href="#templates">Escolher Template</a>
                </Button>
              </div>
            </FadeIn>
          </div>
          
          <div className="flex-1 mt-12 md:mt-0">
            <FadeIn direction="right" delay={200}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-indigo-300/20 to-primary/10 rounded-xl blur-xl"></div>
                
                <div className="relative overflow-hidden rounded-xl border border-white shadow-2xl bg-white">
                  {TEMPLATE_IMAGES.map((src, index) => (
                    <img 
                      key={index} 
                      src={src} 
                      alt={`Template Preview ${index + 1}`} 
                      className={`w-full mx-auto z-10 transition-opacity duration-1000 absolute inset-0 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`} 
                      style={{
                        objectFit: 'contain'
                      }} 
                    />
                  ))}
                  
                  <img 
                    src={TEMPLATE_IMAGES[currentImageIndex]} 
                    alt="Template Preview" 
                    className="invisible w-full mx-auto" 
                    style={{
                      objectFit: 'contain'
                    }} 
                  />
                  
                  <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
                    {TEMPLATE_IMAGES.map((_, index) => (
                      <button 
                        key={index} 
                        onClick={() => setCurrentImageIndex(index)} 
                        className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? 'bg-primary w-4' : 'bg-gray-300 hover:bg-gray-400'}`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
        
        <div className="flex justify-center mt-20">
          <a href="#templates" onClick={scrollToTemplates} className="animate-float flex flex-col items-center text-sm text-muted-foreground hover:text-primary transition-colors">
            <span className="mb-3">Role para ver os templates</span>
            <ChevronDown className="animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
