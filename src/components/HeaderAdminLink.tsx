
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const HeaderAdminLink: React.FC = () => {
  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      return data.session;
    },
  });

  // Only show admin link if user is authenticated
  if (!session) return null;

  return (
    <Button variant="ghost" size="sm" asChild className="hidden lg:flex">
      <Link to="/admin" className="flex items-center gap-1">
        <Shield className="h-4 w-4" />
        <span>Admin</span>
      </Link>
    </Button>
  );
};

export default HeaderAdminLink;
