
import React from 'react';
import { Facebook, Instagram, Youtube, Linkedin, Music, Mail, Phone, MapPin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only handle anchor navigation on home page
    if (!isHomePage && href.includes('#')) {
      // Navigate to home page with the section
      window.location.href = href;
      return;
    }
    
    if (isHomePage && href.includes('#')) {
      e.preventDefault();
      const targetId = href.split('#')[1];
      const section = document.querySelector(`#${targetId}`);
      
      if (section) {
        window.scrollTo({
          top: section.getBoundingClientRect().top + window.scrollY - 60,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-8 md:px-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Company Info */}
          <div>
            <Link to="/" className="text-2xl font-bold text-primary tracking-tight mb-4 inline-block">
              Monte<span className="text-foreground">Site</span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Soluções simples para sua presença digital através de templates profissionais e personalizáveis.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.youtube.com/eGestorERP" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-gray-400 hover:text-primary transition-colors">
                <Youtube size={20} />
              </a>
              <a href="https://facebook.com/EgestorERP" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/egestorerp" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/egestor" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://open.spotify.com/show/0G3R7gTIgUODsDji6K3kpW" target="_blank" rel="noopener noreferrer" aria-label="Spotify" className="text-gray-400 hover:text-primary transition-colors">
                <Music size={20} />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="/#home" 
                  onClick={(e) => handleAnchorClick(e, "/#home")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="/#templates" 
                  onClick={(e) => handleAnchorClick(e, "/#templates")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Templates
                </a>
              </li>
              <li>
                <Link to="/vitrine" className="text-muted-foreground hover:text-primary transition-colors">
                  Vitrine
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-primary" />
                <span className="text-muted-foreground">atendimento@zipline.com.br</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-primary" />
                <span className="text-muted-foreground">0800 603 3336</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="text-primary mt-1 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Rua do Acampamento nº 380 - Centro<br />
                  Santa Maria - RS - 97050-002<br />
                  CNPJ 04.693.497/0001-21
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm">
          <p>© 2025 MonteSite. Todos os direitos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a 
              href="https://montesite.com.br/termos/Termos%20de%20Uso%20do%20Servi%C3%A7o%20de%20Cria%C3%A7%C3%A3o%20e%20Hospedagem%20de%20Sites.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Termos de Uso
            </a>
            <a 
              href="https://egestor.com.br/politica_de_privacidade.php" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
