
import React from 'react';
import { Button } from '@/components/ui/button';
import FadeIn from '@/components/animations/FadeIn';
import { ExternalLink } from 'lucide-react';

const MonteSitePromoSection: React.FC = () => {
  return <section className="py-16 px-8 md:px-14 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-1">
            <FadeIn direction="left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Crie uma prévia</span> do seu site profissional
              </h2>
              <p className="text-lg text-muted-foreground mb-2">
                MonteSite permite que você visualize uma <span className="font-semibold text-blue-600">prévia temporária</span> do seu site institucional de forma rápida e prática.
              </p>
              <p className="text-lg text-muted-foreground mb-2">
                Basta preencher um formulário simples e você receberá instantaneamente uma <span className="italic">demonstração personalizada</span> com seu conteúdo em um dos nossos modelos premium.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                <span className="bg-yellow-100 px-2 py-1 rounded-md font-medium text-gray-800">⏱️ Importante:</span> A prévia ficará disponível por <span className="font-bold text-blue-600">tempo limitado</span> para sua avaliação.
              </p>
              <Button size="lg" className="rounded-full text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2" asChild>
                <a href="https://montesite.com" target="_blank" rel="noopener noreferrer">
                  Criar Minha Prévia Agora <ExternalLink className="ml-1 h-5 w-5" />
                </a>
              </Button>
            </FadeIn>
          </div>
          
          <div className="flex-1">
            <FadeIn direction="right" delay={200}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-300/20 via-indigo-300/20 to-blue-200/10 rounded-xl blur-xl"></div>
                <div className="relative overflow-hidden rounded-xl border border-white shadow-2xl bg-white">
                  <img 
                    src="/lovable-uploads/75e7f389-1546-40ed-86b4-474532b1a97f.png" 
                    alt="MonteSite Preview" 
                    className="w-full mx-auto object-contain" 
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>;
};

export default MonteSitePromoSection;
