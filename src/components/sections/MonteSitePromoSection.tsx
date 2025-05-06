import React from 'react';
import { Button } from '@/components/ui/button';
import FadeIn from '@/components/animations/FadeIn';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
const MonteSitePromoSection: React.FC = () => {
  return <FadeIn>
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 py-16 px-4 md:py-24">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Descubra nossa Vitrine de sites já Desenvolvidos </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl">
              Explore nossa coleção de sites desenvolvidos para diversos clientes e segmentos.
              Veja exemplos reais de nossos trabalhos e inspire-se para seu próximo projeto digital.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-blue-600 hover:bg-gray-100" size="lg" asChild>
                <Link to="/vitrine">Ver Vitrine Completa</Link>
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10" size="lg" asChild>
                
              </Button>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>;
};
export default MonteSitePromoSection;