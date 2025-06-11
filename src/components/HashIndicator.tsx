
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'lucide-react';
import { useHash } from '@/hooks/useHash';

const HashIndicator: React.FC = () => {
  const { hash, hasHash } = useHash();

  if (!hasHash) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Badge variant="outline" className="flex items-center gap-2 bg-white shadow-lg border-primary/30">
        <Link className="h-3 w-3 text-primary" />
        <span className="text-xs">Parceiro: {hash?.substring(0, 8)}...</span>
      </Badge>
    </div>
  );
};

export default HashIndicator;
