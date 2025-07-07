
import { LayoutTemplate, Tag } from 'lucide-react';
import React from 'react';
import { TemplateCategory } from '@/components/TemplateCategories';

export interface Template {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  formUrl: string;
  previewUrl: string; // Added this new field
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
    id: '1',
    title: 'Estilo 1',
    description: 'Template completo que transforma contabilidade em um diferencial competitivo para sua empresa.',
    imageUrl: '/imagens/contabilidade-harmonica.png',
    formUrl: 'https://forms.gle/ZfjYVLSiq6yCAbLG8',
    previewUrl: 'https://contabilidade1.montesite.com.br',
    category: 'contabilidade'
  },
  {
    id: '2',
    title: 'Estilo 2',
    description: 'Design sofisticado para serviços contábeis personalizados para o sucesso do seu negócio.',
    imageUrl: '/imagens/contabilidade-template.png',
    formUrl: 'https://forms.gle/2LTx1sApPFp24msV9',
    previewUrl: 'https://contabilidade2.montesite.com.br',
    category: 'contabilidade'
  },
  {
    id: '3',
    title: 'Estilo 3',
    description: 'Layout profissional para soluções contábeis inteligentes para empresas de todos os portes.',
    imageUrl: '/imagens/easy-financial-solutions.png',
    formUrl: 'https://forms.gle/FWVGcuiVP7zsiUUu9',
    previewUrl: 'https://contabilidade3.montesite.com.br',
    category: 'contabilidade'
  },
  {
    id: '4',
    title: 'Estilo 4',
    description: 'Template com foco em simplicidade e precisão para escritórios contábeis.',
    imageUrl: '/imagens/conta-connection-hub.png',
    formUrl: 'https://forms.gle/pa7nVYZPm2HWinoD7',
    previewUrl: 'https://contabilidade4.montesite.com.br',
    category: 'contabilidade'
  },
  {
    id: '5',
    title: 'Estilo 5',
    description: 'Design para empresas de contabilidade digital com soluções simplificadas para negócios.',
    imageUrl: '/imagens/contador-simplicity.png',
    formUrl: 'https://forms.gle/CkZAbnaLdGDG9D3QA',
    previewUrl: 'https://contabilidade5.montesite.com.br',
    category: 'contabilidade'
  },
  {
    id: '6',
    title: 'Estilo 6',
    description: 'Template moderno para escritórios de contabilidade, com design clean e profissional.',
    imageUrl: '/imagens/contabilify-modern-site.png',
    formUrl: 'https://forms.gle/kx8rWGWVXR4ZGCxY8',
    previewUrl: 'https://contabilidade6.montesite.com.br',
    category: 'contabilidade'
  }
];
