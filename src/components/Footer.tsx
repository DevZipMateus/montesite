
import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  return (
    <footer className="bg-secondary/50 pt-16 pb-8" id="contato">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-primary tracking-tight">
              Template<span className="text-foreground">Hub</span>
            </h3>
            <p className="text-muted-foreground mb-4 max-w-xs">
              Oferecemos templates profissionais para o seu negócio brilhar online.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-white flex items-center justify-center border border-gray-200 transition-colors hover:bg-primary hover:text-white"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-white flex items-center justify-center border border-gray-200 transition-colors hover:bg-primary hover:text-white"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-white flex items-center justify-center border border-gray-200 transition-colors hover:bg-primary hover:text-white"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-muted-foreground hover:text-primary transition-colors">Home</a>
              </li>
              <li>
                <a href="#templates" className="text-muted-foreground hover:text-primary transition-colors">Templates</a>
              </li>
              <li>
                <a href="#depoimentos" className="text-muted-foreground hover:text-primary transition-colors">Depoimentos</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Sobre nós</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Política de Privacidade</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-muted-foreground">
                <Mail size={16} className="mr-2 text-primary" />
                <span>contato@templatehub.com</span>
              </li>
              <li className="flex items-center text-muted-foreground">
                <Phone size={16} className="mr-2 text-primary" />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-start text-muted-foreground">
                <MapPin size={16} className="mr-2 mt-1 text-primary" />
                <span>Av. Paulista, 1000 - São Paulo, SP</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Newsletter</h4>
            <p className="text-muted-foreground mb-4">
              Inscreva-se para receber novidades e promoções exclusivas.
            </p>
            <div className="flex flex-col gap-2">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button className="rounded-full btn-hover-effect">
                Inscrever-se
              </Button>
            </div>
          </div>
        </div>
        
        <Separator className="mb-8" />
        
        <div className="text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} TemplateHub. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
