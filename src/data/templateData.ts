
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
    title: 'Modelo 1',
    description: 'Template completo que transforma contabilidade em um diferencial competitivo para sua empresa.',
    imageUrl: '/lovable-uploads/a0040ce2-0312-42c4-99a9-fd6ab7696156.png',
    formUrl: 'https://forms.google.com',
    category: 'contabilidade'
  },
  {
    id: '5',
    title: 'Modelo 2',
    description: 'Design sofisticado para serviços contábeis personalizados para o sucesso do seu negócio.',
    imageUrl: '/lovable-uploads/e1b654f1-c43c-4c60-9bf2-2731f71743ba.png',
    formUrl: 'https://forms.google.com',
    category: 'contabilidade'
  },
  {
    id: '4',
    title: 'Modelo 3',
    description: 'Layout profissional para soluções contábeis inteligentes para empresas de todos os portes.',
    imageUrl: '/lovable-uploads/df8ce4c3-be57-41f0-b2d5-e56a52e1af11.png',
    formUrl: 'https://forms.google.com',
    category: 'contabilidade'
  },
  {
    id: '3',
    title: 'Modelo 4',
    description: 'Template com foco em simplicidade e precisão para escritórios contábeis.',
    imageUrl: '/lovable-uploads/8c90c0b5-e286-47b2-9632-910b4da93d5f.png',
    formUrl: 'https://forms.google.com',
    category: 'contabilidade'
  },
  {
    id: '2',
    title: 'Modelo 5',
    description: 'Design para empresas de contabilidade digital com soluções simplificadas para negócios.',
    imageUrl: '/lovable-uploads/cadc2174-8a57-4f42-b005-431d0b953561.png',
    formUrl: 'https://forms.google.com',
    category: 'contabilidade'
  },
  {
    id: '1',
    title: 'Modelo 6',
    description: 'Template moderno para escritórios de contabilidade, com design clean e profissional.',
    imageUrl: '/lovable-uploads/00edb883-d253-4be4-a00c-96dc2057fd11.png',
    formUrl: 'https://forms.google.com',
    category: 'contabilidade'
  }
];
