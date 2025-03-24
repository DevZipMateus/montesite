
import { LayoutTemplate, Tag } from 'lucide-react';
import React from 'react';
import { TemplateCategory } from '@/components/TemplateCategories';

export interface Template {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  formUrl: string;
  category: string;
}

// Template categories
export const categories: TemplateCategory[] = [
  {
    id: 'all',
    name: 'Todos',
    icon: React.createElement(LayoutTemplate, { className: "h-4 w-4" })
  },
  {
    id: 'contabilidade',
    name: 'Contabilidade',
    icon: React.createElement(Tag, { className: "h-4 w-4" })
  }
];

// Mock data for templates
export const allTemplates: Template[] = [
  {
    id: '6',
    title: 'Harmônica Contabilidade',
    description: 'Template completo que transforma contabilidade em um diferencial competitivo para sua empresa.',
    imageUrl: '/lovable-uploads/85f8d5b4-c501-4a3d-96ff-33ae881e9978.png',
    formUrl: 'https://forms.google.com',
    category: 'contabilidade'
  },
  {
    id: '5',
    title: 'Modelo 2',
    description: 'Design sofisticado para serviços contábeis personalizados para o sucesso do seu negócio.',
    imageUrl: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
    formUrl: 'https://forms.google.com',
    category: 'contabilidade'
  },
  {
    id: '4',
    title: 'Modelo 3',
    description: 'Layout profissional para soluções contábeis inteligentes para empresas de todos os portes.',
    imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
    formUrl: 'https://forms.google.com',
    category: 'contabilidade'
  },
  {
    id: '3',
    title: 'Modelo 4',
    description: 'Template com foco em simplicidade e precisão para escritórios contábeis.',
    imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    formUrl: 'https://forms.google.com',
    category: 'contabilidade'
  },
  {
    id: '2',
    title: 'Modelo 5',
    description: 'Design para empresas de contabilidade digital com soluções simplificadas para negócios.',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    formUrl: 'https://forms.google.com',
    category: 'contabilidade'
  },
  {
    id: '1',
    title: 'Modelo 6',
    description: 'Template moderno para escritórios de contabilidade, com design clean e profissional.',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475', 
    formUrl: 'https://forms.google.com',
    category: 'contabilidade'
  }
];
