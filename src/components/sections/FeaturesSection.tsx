
import React from 'react';
import FadeIn from '@/components/animations/FadeIn';

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 px-6 md:px-10 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Por que escolher nossos templates?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Oferecemos soluções completas para sua presença online. Confira os diferenciais dos nossos templates.
          </p>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <FadeIn className="text-center">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 9h18" />
                <path d="M9 21V9" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Design Responsivo</h3>
            <p className="text-muted-foreground">
              Todos os templates se adaptam perfeitamente a qualquer dispositivo - desktop, tablet ou smartphone.
            </p>
          </FadeIn>
          
          <FadeIn className="text-center" delay={100}>
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
                <path d="M12 2H2v10h10V2Z" />
                <path d="M22 12h-4v4h4v-4Z" />
                <path d="M12 8h4v4" />
                <path d="M8 12h4v4" />
                <path d="M22 22H12v-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Personalização Fácil</h3>
            <p className="text-muted-foreground">
              Altere cores, imagens e textos sem precisar de conhecimentos técnicos ou contratação de programadores.
            </p>
          </FadeIn>
          
          <FadeIn className="text-center" delay={200}>
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary">
                <path d="M6 20h4" />
                <path d="M14 20h4" />
                <path d="M12 16v4" />
                <path d="M12 3v4" />
                <path d="M17 7 7 17" />
                <path d="M14.5 9.5 17 7 14.5 4.5" />
                <path d="M9.5 14.5 7 17l2.5 2.5" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Otimizado para SEO</h3>
            <p className="text-muted-foreground">
              Todos os templates são desenvolvidos com as melhores práticas para serem bem posicionados nos buscadores.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
