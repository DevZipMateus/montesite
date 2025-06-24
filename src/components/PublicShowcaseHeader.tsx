
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchShowcaseCategories } from '@/services/showcaseService';
import TemplateCategories, { TemplateCategory } from '@/components/TemplateCategories';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PublicShowcaseHeaderProps {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const PublicShowcaseHeader: React.FC<PublicShowcaseHeaderProps> = ({
  activeCategory,
  onCategoryChange
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const {
    data: categoriesData = [],
    isLoading: isLoadingCategories
  } = useQuery({
    queryKey: ['showcase-categories'],
    queryFn: fetchShowcaseCategories
  });

  const categories: TemplateCategory[] = [
    {
      id: 'all',
      name: 'Todas'
    },
    ...categoriesData.map(category => ({
      id: category.slug,
      name: category.name,
      icon: category.icon
    }))
  ];

  // Close mobile menu when category changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeCategory]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass shadow-md">
      <div className="max-w-7xl mx-auto">
        {/* Top bar with logo and mobile menu button */}
        <div className="flex items-center justify-between py-4 px-8 md:px-14">
          <div className="text-2xl font-bold text-primary tracking-tight">
            Monte<span className="text-foreground">Site</span>
          </div>
          
          {/* Mobile menu button */}
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
        
        {/* Desktop category menu */}
        <div className="hidden md:block px-8 md:px-14 pb-4">
          {!isLoadingCategories && (
            <TemplateCategories 
              categories={categories} 
              activeCategory={activeCategory} 
              onChange={onCategoryChange} 
            />
          )}
        </div>
        
        {/* Mobile category menu */}
        <div 
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-gray-200/50",
            isMobileMenuOpen ? "max-h-[200px] pb-4" : "max-h-0"
          )}
        >
          <div className="px-8 pt-4">
            {!isLoadingCategories && (
              <TemplateCategories 
                categories={categories} 
                activeCategory={activeCategory} 
                onChange={onCategoryChange} 
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default PublicShowcaseHeader;
