import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Sparkles, Users, Award } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

interface HeroSectionProps {
  scrollToShowcase: (e: React.MouseEvent) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToShowcase }) => {
  return (
    <section 
      id="home" 
      className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4ecfb 100%)'
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 px-8 md:px-12">
        <div className="flex flex-col items-center text-center gap-8">
          <FadeIn>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
              <Sparkles className="w-4 h-4" />
              Desenvolvimento Profissional de Sites
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 max-w-4xl mx-auto">
              Transforme Sua Presença Digital com o{' '}
              <span className="text-primary">MonteSite</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Criamos sites profissionais e personalizados que elevam seu negócio ao próximo nível. 
              Design moderno, alta performance e suporte especializado para garantir seu sucesso online.
            </p>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button 
                size="lg" 
                className="rounded-full btn-hover-effect text-lg bg-gradient-to-r from-primary to-indigo-500 hover:from-indigo-500 hover:to-primary transition-all duration-300 px-10 py-7"
                onClick={scrollToShowcase}
              >
                Conheça Nossa Vitrine
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="rounded-full text-lg border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-10 py-7"
                asChild
              >
                <a href="https://lp.montesite.com.br/" target="_blank" rel="noopener noreferrer">
                  Entre em Contato
                </a>
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={400}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-8">
              <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-white shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Qualidade Premium</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Design profissional e código otimizado
                </p>
              </div>

              <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-white shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Atendimento Dedicado</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Suporte personalizado em cada etapa
                </p>
              </div>

              <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white/50 backdrop-blur-sm border border-white shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Resultados Reais</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Portfólio comprovado de sucesso
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
        
        <div className="flex justify-center mt-16">
          <a 
            href="#showcase" 
            onClick={scrollToShowcase}
            className="animate-float flex flex-col items-center text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            <span className="mb-2">Veja nossos projetos</span>
            <ChevronDown className="animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
