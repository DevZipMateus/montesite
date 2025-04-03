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
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Gere uma prévia do seu site Institucional</h2>
              <p className="text-lg text-muted-foreground mb-6">Crie rapidamente uma prévia do seu site profissional para sua empresa. 
Preencha o formulário e tenha uma prévia de como ficará o site com um dos modelos disponíveis.
            </p>
              <Button size="lg" className="rounded-full text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2" asChild>
                <a href="https://montesite.com" target="_blank" rel="noopener noreferrer">
                  Criar Novo Site <ExternalLink className="ml-1 h-5 w-5" />
                </a>
              </Button>
            </FadeIn>
          </div>
          
          <div className="flex-1">
            <FadeIn direction="right" delay={200}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-300/20 via-indigo-300/20 to-blue-200/10 rounded-xl blur-xl"></div>
                <div className="relative overflow-hidden rounded-xl border border-white shadow-2xl bg-white">
                  <div className="grid grid-cols-1 gap-2">
                    <img src="/lovable-uploads/c0a75ee5-0350-43be-a331-64beab3212c0.png" alt="MonteSite Preview" className="w-full mx-auto object-contain" />
                    <img alt="MonteSite Form" className="w-full mx-auto object-contain" src="/lovable-uploads/7aa1f9a5-0942-4622-9ca7-4fcceec86beb.png" />
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>;
};
export default MonteSitePromoSection;