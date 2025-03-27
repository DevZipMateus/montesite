
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Templates', href: '#templates' }
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const section = document.querySelector(href);
    if (section) {
      window.scrollTo({
        top: section.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-8 md:px-14',
        isScrolled ? 'glass py-4 shadow-md' : 'py-6'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#home" className="text-2xl font-bold text-primary tracking-tight">
          Monte<span className="text-foreground">Site</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="text-foreground hover:text-primary transition-colors font-medium relative overflow-hidden group px-2 py-1"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </a>
          ))}
          <Button 
            size="default" 
            variant="default" 
            className="btn-hover-effect rounded-full font-medium px-6 ml-4"
            asChild
          >
            <a href="#templates">Ver Templates</a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "md:hidden absolute top-full left-0 right-0 glass shadow-md overflow-hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen ? "max-h-[300px] py-6" : "max-h-0"
        )}
      >
        <nav className="flex flex-col space-y-6 px-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="text-foreground hover:text-primary transition-colors py-2 border-b border-gray-100 last:border-none"
            >
              {item.label}
            </a>
          ))}
          <Button 
            size="default" 
            variant="default" 
            className="btn-hover-effect rounded-full font-medium w-full mt-2"
            asChild
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <a href="#templates">Ver Templates</a>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
