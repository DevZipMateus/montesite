
import React from 'react';
import FadeIn from '@/components/animations/FadeIn';
import { Button } from '@/components/ui/button';

const CTASection: React.FC = () => {
  return (
    <section id="contato" className="py-28 px-8 md:px-14 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="glass rounded-3xl p-12 md:p-20 shadow-xl">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Pronto para transformar sua presença online?
              </h2>
              <p className="text-muted-foreground mb-10 text-lg">
                Escolha um de nossos templates profissionais e tenha seu site no ar em poucos minutos. Sem complicações, sem programação.
              </p>
              <Button 
                size="lg" 
                className="rounded-full btn-hover-effect text-lg px-10 py-6"
                asChild
              >
                <a href="#templates">Começar agora</a>
              </Button>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
