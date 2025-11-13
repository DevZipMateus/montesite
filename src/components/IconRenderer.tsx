import React from 'react';
import * as LucideIcons from 'lucide-react';
import { LayoutTemplate } from 'lucide-react';

interface IconRendererProps {
  name?: string | null;
  className?: string;
  size?: number;
}

export const normalizeIconName = (value?: string | null): string | undefined => {
  if (!value) return undefined;
  const trimmed = String(value).trim();
  if (!trimmed) return undefined;
  return trimmed.startsWith('lucide:') ? trimmed.split(':')[1] : trimmed;
};

const IconRenderer: React.FC<IconRendererProps> = ({ name, className = 'h-4 w-4', size }) => {
  const iconName = normalizeIconName(name);
  const Icon = iconName ? (LucideIcons as any)[iconName] : undefined;
  
  if (Icon && typeof Icon === 'function') {
    return <Icon className={className} size={size} />;
  }
  
  return <LayoutTemplate className={className} size={size} />;
};

export default IconRenderer;
