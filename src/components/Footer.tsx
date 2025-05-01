
import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <Link to="/" className="text-2xl font-bold text-primary tracking-tight mb-4 inline-block">
              Monte<span className="text-foreground">Site</span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Soluções simples para sua presença digital através de templates profissionais e personalizáveis.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter size={20} />
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
                <span className="text-muted-foreground">contato@montesite.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-primary" />
                <span className="text-muted-foreground">(11) 9999-9999</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={16} className="text-primary" />
                <span className="text-muted-foreground">São Paulo, SP</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">Assine nossa newsletter para receber novidades</p>
            <div className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Seu email" 
                className="rounded-md px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button size="sm">Assinar</Button>
            </div>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm">
          <p>© 2025 MonteSite. Todos os direitos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-primary transition-colors">Política de Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
